import FormFooter from "@/components/FormFooter"
import EducationQuestion from "@/components/jobform/EducationQuestion";
import KeywordQuestion from "@/components/jobform/KeywordQuestion";
import LocationQuestion from "@/components/jobform/LocationQuestion";
import PrevCompaniesQuestion from "@/components/jobform/PrevCompaniesQuestion";
import Question1 from "@/components/jobform/Question1";
import Question2 from "@/components/jobform/Question2";
import Question3 from "@/components/jobform/Question3";
import RemoteQuestion from "@/components/jobform/RemoteQuestion";
import UniversitiesQuestion from "@/components/jobform/UniversitiesQuestion";
import Navbar from "@/components/Navbar"
import { auth, db, storage } from "@/firebase";
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const questions = [Question1, Question2, RemoteQuestion, LocationQuestion, EducationQuestion, UniversitiesQuestion, PrevCompaniesQuestion, KeywordQuestion, Question3];

const PostJob = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const CurrentQuestion = questions[questionIndex];

  const [formData, setFormData] = useState({
    role: "",
    jobType: "",
    remoteStatus: "",
    minimumEducation: "",
    city: null,
    state: null,
    country: null,
    salaryLow: 0,
    salaryHigh: 0,
    education: [],
    workExperience: [],
    keywords: []
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a copy of formData
      let newFormData = { ...formData };
  
      // Remove __isNew__ property from each object in keywords array
      if (newFormData.keywords) {
        newFormData.keywords = newFormData.keywords.map(keyword => {
          const { __isNew__, ...rest } = keyword;
          return rest;
        });
      }
  
      console.log("newFormData", newFormData);
  
      const userJobsCollectionRef = collection(
        db,
        `jobs/${auth.currentUser.uid}/jobs`
      );
  
      const newJobDocRef = await addDoc(userJobsCollectionRef, newFormData);
      console.log("Form data saved successfully with ID: ", newJobDocRef.id);

      // Retrieve all documents from the "Data" collection
      const dataCollectionRef = collection(db, "data");
      const dataSnapshot = await getDocs(dataCollectionRef);
      const resumes = [];
  
      dataSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('data', data);

        const jobLocation = { latitude: Number(formData.city.latitude), longitude: Number(formData.city.longitude) };
        const candidiateLocation = { latitude: Number(data.city.latitude), longitude: Number(data.city.longitude) };
        const distance = haversineDistance(jobLocation, candidiateLocation);

        // Check all conditions
        const industryMatch = data.roles.some(role => role === formData.role);
        const salaryMatch = data.salaryLow <= formData.salaryHigh;
        const locationMatch = distance <= data.radius;
        const universitiesMatch = formData.education.length === 0 || formData.education.some(university => 
          data.universities.some(uni => uni.label === university.label)
        );
        const pastCompaniesMatch = formData.workExperience.length === 0 || formData.workExperience.some(company => 
          data.workExperience.some(work => work.label === company.label)
        );
        const educationLevelMatch = compareEducationLevels(formData.minimumEducation, data.education) <= 0
        const keywordsMatch = formData.keywords.length === 0 || formData.keywords.every(keyword => new RegExp(keyword.label, 'i').test(data.text));

        // Log all comparisons
        console.log(`Resume ID: ${doc.id}`);
        console.log(`Industry Match: ${industryMatch}`);
        console.log(`Salary Match: ${salaryMatch}`);
        console.log(`Location Match: ${locationMatch}`);
        console.log(`Universities Match: ${universitiesMatch}`);
        console.log(`Past Companies Match: ${pastCompaniesMatch}`);
        console.log(`Education Level Match: ${educationLevelMatch}`);
        console.log(`Keywords Match: ${keywordsMatch}`);

        if (industryMatch && salaryMatch && locationMatch && universitiesMatch && pastCompaniesMatch && educationLevelMatch && keywordsMatch) {
          resumes.push(doc.id);
        }
      });
  
      console.log("Matching resumes: ", resumes);
  
      // Update the job document with the matching resumes array
      await updateDoc(newJobDocRef, { resumes: resumes });
  
      console.log("Resumes added successfully.");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <CurrentQuestion formData={formData} setFormData={setFormData} file={file} setFile={setFile}/>
      <FormFooter onNext={handleNext} onBack={handleBack} handleSubmit={handleSubmit} isLast={questionIndex === questions.length - 1}/>
    </div>
  )
}

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

const eduLevels = [
  'Working towards diploma',
  'High School',
  'Certification',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate'
];

function compareEducationLevels(edu1, edu2) {
  const index1 = eduLevels.indexOf(edu1);
  const index2 = eduLevels.indexOf(edu2);

  if (index1 < index2) {
    return -1;
  } else if (index1 > index2) {
    return 1;
  } else {
    return 0;
  }
}

export default PostJob
