import HiringSidebar from "@/components/HiringSidebar"
import ModalResume from "@/components/ModalResume"
import Navbar from "@/components/Navbar"
import ResumePreview from "@/components/ResumePreview"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { auth, db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"
import { title } from "process"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const HiringDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeJob, setActiveJob] = useState(null);
  const [activeResume, setActiveResume] = useState(null);

  useEffect(() => {
      const loadJobs = async () => {
          try {
              const userJobsRef = collection(db, "jobs", auth.currentUser.uid, "jobs");
              const jobsSnapshot = await getDocs(userJobsRef);
              const jobsData = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setJobs(jobsData);
              if (jobsData.length > 0) setActiveJob(jobsData[0]);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      if (auth.currentUser) {
          loadJobs();
      } else {
          setError("User must be authenticated to view jobs.");
          setLoading(false);
      }
  }, []);

  if (error) {
    return <div className={`flex-1 p-5`}>{error}</div>;
  }

  if (loading) {
    return <div className={`flex-1 p-5`}>Loading...</div>;
  }

  if (jobs.length === 0) {
      return <div className={`flex-1 p-5`}>No jobs found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="grid h-calc-4 w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <HiringSidebar jobs={jobs} activeJob={activeJob} setActiveJob={setActiveJob}/>
          { activeResume ? (
            <ModalResume 
              pdfUrl={activeResume}
              onClose={() => setActiveResume(null)}
              resumeUrls={activeJob.resumes}
            />
          ) : ( 
            <div className="grid grid-cols-4 gap-4 m-4">
              {activeJob && activeJob.resumes.map((resume, index) => (
                <ResumePreview key={`${activeJob.roles[0]}-${index}`} resume={resume} setActiveResume={setActiveResume} />
              ))}
            </div>
          )}
      </div>
    </>
  )
}

export default HiringDashboard