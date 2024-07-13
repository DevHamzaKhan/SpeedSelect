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
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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
    roles: [],
    jobType: "",
    remoteStatus: "",
    minimumEducation: "",
    city: "",
    country: "",
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

export default PostJob
