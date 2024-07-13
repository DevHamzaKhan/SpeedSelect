import FormFooter from "@/components/FormFooter"
import Navbar from "@/components/Navbar"
import EducationQuestion from "@/components/userform/EducationQuestion";
import Question1 from "@/components/userform/Question1";
import Question2 from "@/components/userform/Question2";
import Question3 from "@/components/userform/Question3";
import Question4 from "@/components/userform/Question4";
import Question5 from "@/components/userform/Question5";
import Question6 from "@/components/userform/Question6";
import { auth, db, storage } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const questions = [Question1, Question2, EducationQuestion, Question4, Question5, Question6];

const FindJob = () => {
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
    city: "",
    country: "",
    salaryLow: 0,
    salaryHigh: 0,
    education: [],
    workExperience: [],
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);

      const userDocRef = doc(db, "data", auth.currentUser.uid);

      let pdfUrl = "";
      if (file) {
        const pdfRef = ref(storage, `resumes/${auth.currentUser.uid}.pdf`);
        await uploadBytes(pdfRef, file);
        pdfUrl = await getDownloadURL(pdfRef);
      }
      
      await setDoc(userDocRef, { ...formData, resumeUrl: pdfUrl });
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

export default FindJob
