import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, arrayUnion, GeoPoint } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import pdfToText from 'react-pdftotext';
import L from "leaflet";

// Leaflet marker icon fix for default marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const calculateDistance = (loc1, loc2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (loc2[0] - loc1[0]) * (Math.PI / 180);
  const dLng = (loc2[1] - loc1[1]) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1[0] * (Math.PI / 180)) *
      Math.cos(loc2[0] * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const UserForm = () => {
  const [formData, setFormData] = useState({
    industry: [],
    location: [51.505, -0.09], // Default to London coordinates
    radius: "",
    salaryLow: "",
    salaryHigh: "",
    universities: [],
    pastCompanies: [],
    educationLevel: "",
    age: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [isInRange, setIsInRange] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "Data", auth.currentUser.uid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setFormData({
            ...userData,
            location: [userData.location.latitude, userData.location.longitude],
            universities: userData.universities || [],
            pastCompanies: userData.pastCompanies || [],
          });
          setText(userData.text || "");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "age" || name === "radius" || name === "salaryLow" || name === "salaryHigh" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleMultiSelectChange = (e, name) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [name]: options });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);

    const file = e.target.files[0];
    pdfToText(file)
      .then(text => setText(text))
      .catch(error => console.error("Failed to extract text from PDF", error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const geoPoint = new GeoPoint(formData.location[0], formData.location[1]);

      const userDocRef = doc(db, "Data", auth.currentUser.uid);

      let pdfUrl = "";
      if (pdfFile) {
        const pdfRef = ref(storage, `Resumes/${auth.currentUser.uid}.pdf`);
        await uploadBytes(pdfRef, pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }

      await setDoc(userDocRef, { ...formData, location: geoPoint, resumeUrl: pdfUrl, text });

      console.log("User data and PDF saved successfully!");

      await crossReferenceWithJobPostings({ ...formData, location: geoPoint, resumeUrl: pdfUrl, text });

      setFormData({
        industry: [],
        location: [51.505, -0.09], // Reset to default coordinates
        radius: "",
        salaryLow: "",
        salaryHigh: "",
        universities: [],
        pastCompanies: [],
        educationLevel: "",
        age: "",
      });
      setPdfFile(null);
    } catch (error) {
      console.error("Error saving user data and PDF: ", error);
    }
  };

  const crossReferenceWithJobPostings = async (userData) => {
    try {
      const jobPostsRef = collection(db, "JobPostings");
      const jobPostsSnapshot = await getDocs(jobPostsRef);
      const jobPosts = jobPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      for (const job of jobPosts) {
        if (isMatchingJob(job, userData)) {
          const jobDocRef = doc(db, "JobPostings", job.id);
          await updateDoc(jobDocRef, {
            Resumes: arrayUnion(auth.currentUser.uid)
          });
        }
      }
    } catch (error) {
      console.error("Error cross-referencing with job postings: ", error);
    }
  };

  const isMatchingJob = (data, formData) => {
    const dataLocation = data.location;
    if (dataLocation instanceof GeoPoint) {
      const distance = calculateDistance([formData.location[0], formData.location[1]], [dataLocation.latitude, dataLocation.longitude]);
      console.log(distance)
  
      // Check all conditions
      const industryMatch = formData.industry.some(industry => data.industry.includes(industry));
      const salaryMatch = data.salaryLow <= formData.salaryLow && data.salaryHigh >= formData.salaryHigh;
      const ageMatch = data.minAge >= formData.age;
      const locationMatch = distance <= formData.radius;
      const universitiesMatch = formData.universities.length === 0 || formData.universities.some(university => data.universities.includes(university));
      const pastCompaniesMatch = formData.pastCompanies.length === 0 || formData.pastCompanies.some(company => data.pastCompanies.includes(company));
      const educationLevelMatch = formData.educationLevel === data.educationLevel;
      const keywordsMatch = formData.text === "" || formData.keyWords.length === 0 || formData.keyWords.every(keyword => new RegExp(keyword, 'i').test(data.text));
  
      // Log all comparisons
      console.log(`Job Posting ID: ${data.id}`);
      console.log(`Industry Match: ${industryMatch}`);
      console.log(`Salary Match: ${salaryMatch}`);
      console.log(`Age Match: ${ageMatch}`);
      console.log(`Location Match: ${locationMatch}`);
      console.log(`Universities Match: ${universitiesMatch}`);
      console.log(`Past Companies Match: ${pastCompaniesMatch}`);
      console.log(`Education Level Match: ${educationLevelMatch}`);
      console.log(`Keywords Match: ${keywordsMatch}`);
  
      return industryMatch && salaryMatch && ageMatch && locationMatch && universitiesMatch && pastCompaniesMatch && educationLevelMatch && keywordsMatch;
    } else {
      console.warn(`Invalid location data for job posting ID: ${data.id}`, dataLocation);
      return false;
    }
  };
  

  return (
    <div className={`flex-1 flex justify-center items-center min-h-screen p-5`}>
        <div className={`w-full lg:w-5/6 xl:w-4/6 2xl:w-3/6 rounded-xl bg-base-300`}>
      <h1 className={`mb-5 text-4xl font-bold text-center`}>User Form</h1>
      <form onSubmit={handleSubmit}>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Industry:</label>
          <select
            multiple
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={(e) => handleMultiSelectChange(e, "industry")}
            className={`select select-bordered focus:outline-primary w-5/6 mb-2 mx-auto`}
          >
            <option value="Transportation">Transportation</option>
            <option value="Pharmaceutical">Pharmaceutical</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Mining">Mining</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Media and News">Media and News</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Computer and Technology">Computer and Technology</option>
            <option value="Education">Education</option>
            <option value="Finance and Economics">Finance and Economics</option>
            <option value="Health Care">Health Care</option>
          </select>
          <div className={`w-5/6 mx-auto flex flex-wrap gap-2`}>
            {formData.industry.map((choice, index) => {
                return (
                    <div key={index} className={`flex items-center bg-info text-info-content w-fit px-2 rounded-full`}>
                        {choice}
                    </div>
                )
            })}
        </div>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Radius (km):</label>
          <input
            type="number"
            id="radius"
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            className={`input input-bordered focus:outline-primary w-5/6 mx-auto`}
          />
        </div>
        <div className={`flex justify-between mb-4 w-5/6 mx-auto`}>
            <div className={`flex justify-center w-[49%] flex-col`}>
                <label className={`w-full mx-auto mb-1`}>Salary Low:</label>
                <input
                    type="number"
                    id="salaryLow"
                    name="salaryLow"
                    value={formData.salaryLow}
                    onChange={handleChange}
                    className={`input input-bordered focus:outline-primary w-full mx-auto`}
                />
            </div>
            <div className={`flex justify-center w-[49%] flex-col`}>
                <label className={`w-full mx-auto mb-1`}>Salary High:</label>
                <input
                    type="number"
                    id="salaryHigh"
                    name="salaryHigh"
                    value={formData.salaryHigh}
                    onChange={handleChange}
                    className={`input input-bordered focus:outline-primary w-full mx-auto`}
                />
            </div>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Universities:</label>
          <select
            multiple
            id="universities"
            name="universities"
            value={formData.universities}
            onChange={(e) => handleMultiSelectChange(e, "universities")}
            className={`select select-bordered focus:outline-primary w-5/6 mb-2 mx-auto`}
          >
            <option value="toronto">Toronto</option>
            <option value="waterloo">Waterloo</option>
          </select>
          <div className={`w-5/6 mx-auto flex flex-wrap gap-2`}>
            {formData.universities.map((choice, index) => {
                return (
                    <div key={index} className={`flex items-center bg-info text-info-content w-fit px-2 rounded-full`}>
                        {choice}
                    </div>
                )
            })}
        </div>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Past Companies: (Each Company Seperated by a Comma)</label>
          <input
            type="text"
            id="pastCompanies"
            name="pastCompanies"
            value={formData.pastCompanies.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, pastCompanies: e.target.value.split(",") })
            }
            className={`input input-bordered focus:outline-primary mx-auto w-5/6`}
            placeholder="e.g. intel,ibm,etc."
          />
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Highest Education Level:</label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className={`select select-bordered focus:outline-primary w-5/6 mx-auto`}
          >
            <option value="Working towards diploma">Working towards diploma</option>
            <option value="High School Diploma">High School</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Certification">Certification</option>
          </select>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`input input-bordered focus:outline-primary mx-auto w-5/6`}
          />
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Location:</label>
          <div className={`rounded-xl overflow-hidden shadow-xl w-5/6 mx-auto`}>
          <MapContainer
            center={formData.location}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={formData.location}></Marker>
            <LocationPicker setLocation={(loc) => setFormData((prev) => ({ ...prev, location: loc }))} />
          </MapContainer>
          </div>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Upload Resume (PDF):</label>
          <div className={`w-5/6 mx-auto`}>
          <input type="file" id="pdfFile" accept="application/pdf" onChange={handleFileChange} className="file-input file-input-bordered w-fit" />
          </div>
        </div>
        <div className={`flex justify-center`}>
            <button type="submit" className={` mx-auto btn btn-accent text-lg font-semibold text-accent-content`}>Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default UserForm;
