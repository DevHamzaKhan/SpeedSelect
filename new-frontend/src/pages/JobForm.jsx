import React, { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, GeoPoint } from "firebase/firestore";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoClose } from "react-icons/io5";
import L from "leaflet";

// Leaflet marker icon fix for default marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation(new GeoPoint(e.latlng.lat, e.latlng.lng));
    },
  });
  return null;
};

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    industry: [],
    jobType: "",
    salaryLow: "",
    salaryHigh: "",
    minAge: "",
    keyWords: [],
    remoteOption: "",
    location: new GeoPoint(51.505, -0.09), // Default to London coordinates
    educationLevel: [],
    universities: [],
    pastCompanies: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e, name) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log(options, e.target.selectedOptions);
    setFormData({ ...formData, [name]: options });
  };

  const haversineDistance = (geoPoint1, geoPoint2) => {
    const toRad = (angle) => (angle * Math.PI) / 180;
    const lat1 = geoPoint1.latitude;
    const lon1 = geoPoint1.longitude;
    const lat2 = geoPoint2.latitude;
    const lon2 = geoPoint2.longitude;
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert salaryLow, salaryHigh, and minAge to numbers
      const salaryLow = parseFloat(formData.salaryLow);
      const salaryHigh = parseFloat(formData.salaryHigh);
      const minAge = parseInt(formData.minAge);
  
      const userJobsCollectionRef = collection(
        db,
        `Jobs/${auth.currentUser.uid}/jobs`
      );
      const newJobDocRef = await addDoc(userJobsCollectionRef, { ...formData, salaryLow, salaryHigh, minAge });
      console.log("Form data saved successfully with ID: ", newJobDocRef.id);
  
      // Retrieve all documents from the "Data" collection
      const dataCollectionRef = collection(db, "Data");
      const dataSnapshot = await getDocs(dataCollectionRef);
      const resumes = [];
      const radius = 500; // Set your desired radius in kilometers
  
      dataSnapshot.forEach((doc) => {
        const data = doc.data();
        const dataLocation = data.location; // Assuming location is stored as GeoPoint
  
        // Check if dataLocation is a GeoPoint
        if (dataLocation instanceof GeoPoint) {
          const distance = haversineDistance(formData.location, dataLocation);
  
          // Check all conditions
          const industryMatch = formData.industry.some(industry => data.industry.includes(industry));
          const salaryMatch = data.salaryLow <= formData.salaryHigh && data.salaryHigh >= formData.salaryLow;
          const ageMatch = data.age >= formData.minAge;
          const locationMatch = distance <= radius;
          const universitiesMatch = formData.universities.length === 0 || formData.universities.some(university => data.universities.includes(university));
          const pastCompaniesMatch = formData.pastCompanies.length === 0 || formData.pastCompanies.some(company => data.pastCompanies.includes(company));
          const educationLevelMatch = formData.educationLevel.some(level => data.educationLevel.includes(level));
          const keywordsMatch = formData.keyWords.length === 0 || formData.keyWords.every(keyword => new RegExp(keyword, 'i').test(data.text));
  
          // Log all comparisons
          console.log(`Resume ID: ${doc.id}`);
          console.log(`Industry Match: ${industryMatch}`);
          console.log(`Salary Match: ${salaryMatch}`);
          console.log(`Age Match: ${ageMatch}`);
          console.log(`Location Match: ${locationMatch}`);
          console.log(`Universities Match: ${universitiesMatch}`);
          console.log(`Past Companies Match: ${pastCompaniesMatch}`);
          console.log(`Education Level Match: ${educationLevelMatch}`);
          console.log(`Keywords Match: ${keywordsMatch}`);
  
          if (industryMatch && salaryMatch && ageMatch && locationMatch && universitiesMatch && pastCompaniesMatch && educationLevelMatch && keywordsMatch) {
            resumes.push(doc.id);
          }
        } else {
          console.warn(`Invalid location data for document ID: ${doc.id}`, dataLocation);
        }
      });
  
      console.log("Matching resumes: ", resumes);
  
      // Update the job document with the matching resumes array
      await updateDoc(newJobDocRef, { Resumes: resumes });
  
      console.log("Resumes added successfully.");
  
      // Reset the form
      setFormData({
        title: "",
        industry: [],
        jobType: "",
        salaryLow: "",
        salaryHigh: "",
        minAge: "",
        keyWords: [],
        remoteOption: "",
        location: new GeoPoint(51.505, -0.09), // Reset to default coordinates
        educationLevel: [],
        universities: [],
        pastCompanies: []
      });
    } catch (error) {
      console.error("Error saving form data: ", error);
    }
  };
  
  

  return (
    <div className={`flex-1 flex items-center justify-center p-5`}>
        <div className={`w-full lg:w-5/6 xl:w-4/6 2xl:w-3/6 rounded-xl bg-base-300 flex items-center justify-center`}>
        <div className={`w-10/12 h-5/6`}>
      <h1 className={`mt-5 mb-5 text-4xl font-bold text-center`}>Job Form</h1>
      <form onSubmit={handleSubmit} className={`mb-5`}>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className="w-5/6 mx-auto mb-1">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={`input input-bordered focus:outline-primary w-5/6 mx-auto`} />
        </div><div className={`flex justify-center items-center flex-col mb-4`}>
            <label className={`w-5/6 mx-auto mb-1`}>Industry:</label>
        <select multiple id="industry" name="industry" value={formData.industry} onChange={(e) => handleMultiSelectChange(e, "industry")} className="select mb-2 focus:outline-primary select-bordered w-5/6">
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
            <label className={`w-5/6 mx-auto mb-1`}>Job Type:</label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className={`select select-bordered w-5/6 focus:outline-primary mx-auto`}
          >
            <option value="Intern">Intern</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Temporary">Temporary</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        <div className={`mb-4 w-5/6 mx-auto flex justify-between`}>
            <div className={`flex justify-center flex-col w-[49%]`}>
            <label className={`w-full mx-auto mb-1`}>Salary Low:</label>
            <input
                type="number"
                id="salaryLow"
                name="salaryLow"
                value={formData.salaryLow}
                min={0}
                onChange={handleChange}
                className={`input input-bordered w-full focus:outline-primary mx-auto`}
            />
            </div>
            <div className={`flex justify-center flex-col w-[49%]`}>
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
          <label className={`w-5/6 mx-auto mb-1`}>Min Age:</label>
          <input
            type="number"
            id="minAge"
            name="minAge"
            value={formData.minAge}
            onChange={handleChange}
            className={`input input-bordered focus:outline-primary w-5/6 mx-auto`}
          />
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Key Words:</label>
          <input
            type="text"
            id="keyWords"
            name="keyWords"
            value={formData.keyWords.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, keyWords: e.target.value.split(",") })
            }
            className={`input input-bordered focus:outline-primary w-5/6 mx-auto`}
          />
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Remote Option:</label>
          <select
            id="remoteOption"
            name="remoteOption"
            value={formData.remoteOption}
            onChange={handleChange}
            className={`select select-bordered focus:outline-primary w-5/6 mx-auto`}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Location:</label>
          <div className={`rounded-xl overflow-hidden shadow-xl w-5/6 mx-auto`}>
          <MapContainer
            center={[formData.location.latitude, formData.location.longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            className={`rounded-xl shadow-xl`}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[formData.location.latitude, formData.location.longitude]}></Marker>
            <LocationPicker setLocation={(loc) => setFormData((prev) => ({ ...prev, location: loc }))} />
          </MapContainer>
          </div>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Education Level:</label>
          <select
            multiple
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={(e) => handleMultiSelectChange(e, "educationLevel")}
            className={`select select-bordered focus:outline-primary mx-auto w-5/6 mb-2`}
          >
            <option value="High School">High School</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
          </select>
          <div className={`w-5/6 mx-auto flex flex-wrap gap-2`}>
            {formData.educationLevel.map((choice, index) => {
                return (
                    <div key={index} className={`flex items-center bg-info text-info-content w-fit px-2 rounded-full`}>
                        {choice}
                    </div>
                )
            })}
        </div>
        </div>
        <div className={`mb-4 flex justify-center flex-col`}>
          <label className={`w-5/6 mx-auto mb-1`}>Universities: (Each Uni Seperated by a Comma)</label>
          <input
            type="text"
            id="universities"
            name="universities"
            value={formData.universities.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, universities: e.target.value.split(",") })
            }
            className={`input input-bordered focus:outline-primary mx-auto w-5/6`}
            placeholder="e.g. waterloo,stanford,etc."
          />
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
        <div className={`flex justify-center`}>
            <button type="submit" className={` mx-auto btn btn-accent text-lg font-semibold text-accent-content`}>Submit</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default JobForm;