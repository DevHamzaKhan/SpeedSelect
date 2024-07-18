import FormFooter from "@/components/FormFooter"
import Navbar from "@/components/Navbar"
import EducationQuestion from "@/components/userform/EducationQuestion";
import Question1 from "@/components/userform/Question1";
import Question2 from "@/components/userform/Question2";
import Question3 from "@/components/userform/Question3";
import Question4 from "@/components/userform/Question4";
import Question5 from "@/components/userform/Question5";
import Question6 from "@/components/userform/Question6";
import RemoteQuestion from "@/components/userform/RemoteQuestion";
import WorkTypeQuestion from "@/components/userform/WorkTypeQuestion";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const questions = [Question1, WorkTypeQuestion, RemoteQuestion, Question2, EducationQuestion, Question4, Question5, Question6];

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
    city: null,
    state: null,
    country: null,
    salaryLow: 0,
    education: [],
    workExperience: [],
    jobType: [],
    remoteStatus: [],
    fileMetaData: {},
    resumeUrl: null
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserData = async () => {
          try {
            if (user) {
              // Get the document reference for the current user from Firestore
              const userDocRef = doc(db, "data", user.uid);
    
              // Fetch user data from Firestore
              const userSnapshot = await getDoc(userDocRef);
    
              if (userSnapshot.exists()) {
                // Extract required user information from the snapshot
                const userData = userSnapshot.data();
                console.log(userData);
                setFormData(prevState => ({
                  ...prevState,
                  roles: userData?.roles ?? prevState.roles,
                  city: userData?.city ?? prevState.city,
                  state: userData?.state ?? prevState.state,
                  country: userData?.country ?? prevState.country,
                  salaryLow: userData?.salaryLow ?? prevState.salaryLow,
                  education: userData?.education ?? prevState.education,
                  workExperience: userData?.workExperience ?? prevState.workExperience,
                  jobType: userData?.jobType ?? prevState.jobType,
                  remoteStatus: userData?.remoteStatus ?? prevState.remoteStatus,
                  fileMetaData: userData?.fileMetaData ?? prevState.fileMetaData,
                  resumeUrl: userData?.resumeUrl ?? prevState.resumeUrl,
                }));            
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUserData();    
      }
    });

    // Clean up function
    return () => unsubscribe();
  }, []);

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
      
      await setDoc(userDocRef, { ...formData, resumeUrl: pdfUrl || formData.resumeUrl });
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
