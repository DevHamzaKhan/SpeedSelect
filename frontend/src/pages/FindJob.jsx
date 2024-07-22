import FormFooter from "@/components/FormFooter"
import Navbar from "@/components/Navbar"
import EducationQuestion from "@/components/userform/EducationQuestion";
import PrevCompaniesQuestion from "@/components/userform/PrevCompaniesQuestion";
import Question1 from "@/components/userform/Question1";
import Question2 from "@/components/userform/Question2";
import Question3 from "@/components/userform/Question3";
import Question4 from "@/components/userform/Question4";
import Question5 from "@/components/userform/Question5";
import Question6 from "@/components/userform/Question6";
import RadiusQuestion from "@/components/userform/RadiusQuestion";
import RemoteQuestion from "@/components/userform/RemoteQuestion";
import UniversitiesQuestion from "@/components/userform/UniversitiesQuestion";
import WorkTypeQuestion from "@/components/userform/WorkTypeQuestion";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const questions = [Question1, WorkTypeQuestion, RemoteQuestion, Question2, EducationQuestion, UniversitiesQuestion, PrevCompaniesQuestion, Question5, RadiusQuestion, Question6];

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
    radius: 50,
    salaryLow: 0,
    education: null,
    universities: [],
    workExperience: [],
    jobType: [],
    remoteStatus: [],
    fileMetaData: {},
    resumeUrl: null
  });
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

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
                  radius: userData?.radius ?? prevState.radius,
                  salaryLow: userData?.salaryLow ?? prevState.salaryLow,
                  education: userData?.education ?? prevState.education,
                  universities: userData?.universities ?? prevState.universities,
                  workExperience: userData?.workExperience ?? prevState.workExperience,
                  jobType: userData?.jobType ?? prevState.jobType,
                  remoteStatus: userData?.remoteStatus ?? prevState.remoteStatus,
                  fileMetaData: userData?.fileMetaData ?? prevState.fileMetaData,
                  resumeUrl: userData?.resumeUrl ?? prevState.resumeUrl,
                }));
                setText(userData.text || "");    
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
      
      await setDoc(userDocRef, { ...formData, resumeUrl: pdfUrl || formData.resumeUrl, text });

      console.log("User data and PDF saved successfully!");

      await crossReferenceWithJobPostings({ ...formData, resumeUrl: pdfUrl, text });
    } catch (error) {
      console.error("Error saving user data and PDF: ", error);
    }
  };

  const crossReferenceWithJobPostings = async (userData) => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const userIds = [];

      usersSnapshot.forEach((doc) => {
        userIds.push(doc.id);
      });

      for ( let user of userIds ) {
        const jobsRef = collection(db, "jobs", user, "jobs");
        const jobsSnapshot = await getDocs(jobsRef);
        const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        for ( let job of jobs ) {
          console.log('job', job);
          if (isMatchingJob(job, userData)) {
            const jobDocRef = doc(db, "jobs", user, "jobs", job.id);
            await updateDoc(jobDocRef, {
              resumes: arrayUnion(auth.currentUser.uid)
            });
          }
        }
      }
    } catch (error) {
      console.error("Error cross-referencing with user job postings: ", error);
    }
  };
    
  const isMatchingJob = (formData, data) => {
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

    return industryMatch && salaryMatch && locationMatch && universitiesMatch && pastCompaniesMatch && educationLevelMatch && keywordsMatch;
  };

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <CurrentQuestion formData={formData} setFormData={setFormData} file={file} setFile={setFile} setText={setText}/>
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

export default FindJob
