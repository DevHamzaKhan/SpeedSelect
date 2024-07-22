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
import { Separator } from "@/components/ui/separator"
import { auth, db } from "@/firebase"
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { Trash2 } from "lucide-react"
import { title } from "process"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const HiringDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeJob, setActiveJob] = useState(null);
  const [candidateData, setCandidateData] = useState([]);
  const [activeCandidate, setActiveCandidate] = useState(null);

  const accept = async () => {
    try {
        const userJobsRef = doc(db, "jobs", auth.currentUser.uid, "jobs", activeJob.id);
        await updateDoc(userJobsRef, {
            offers: arrayUnion(activeCandidate.id)
        });

        const candidateRef = doc(db, "data", activeCandidate.id);
        await updateDoc(candidateRef, {
            offers: arrayUnion({ user: auth.currentUser.uid, jobId: activeJob.id })
        });

        console.log("Accepted applicant");
    } catch (err) {
        console.log(err);
    }
  }

  const reject = async () => {
    try {
        const userJobsRef = doc(db, "jobs", auth.currentUser.uid, "jobs", activeJob.id);
        await updateDoc(userJobsRef, {
            resumes: arrayRemove(activeCandidate.id)
        });
        console.log("Successfully removed applicant");
        setActiveCandidate(null)
        loadJobs();
    } catch (err) {
        console.log(err);
    }
  }

  const fetchCandidateData = async (userIds) => {
    try {
      const candidateData = [];

      for (let userId of userIds) {
        console.log(userId);
        const userDocRef = doc(db, "data", userId);  
        const snapshot = await getDoc(userDocRef);
        candidateData.push({ id: snapshot.id, ...snapshot.data() });
      }

      console.log(candidateData);

      setCandidateData(candidateData);
    } catch (err) {
        setError(err.message);
        console.log(err);
    } finally {
        setLoading(false);
    }
  }

  const loadJobs = async () => {
      try {
          const userJobsRef = collection(db, "jobs", auth.currentUser.uid, "jobs");
          const jobsSnapshot = await getDocs(userJobsRef);
          const jobsData = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(jobsData);
          setJobs(jobsData);
          if (jobsData.length > 0) {
            setActiveJob(jobsData[0]);
            fetchCandidateData(jobsData[0].resumes);
          }
      } catch (err) {
          setError(err.message);
          console.log(err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          loadJobs();
        } else {
          setError("User must be authenticated to view jobs.");
        }
      });
    
      // Cleanup subscription on unmount
      return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className={`flex-1 p-5`}>Loading...</div>;
  }

  if (error) {
    return <div className={`flex-1 p-5`}>{error}</div>;
  }

  if (jobs.length === 0) {
      return <div className={`flex-1 p-5`}>No jobs found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="grid h-calc-4 w-full md:grid-cols-[220px_1fr_320px] lg:grid-cols-[280px_1fr_380px]">
        <HiringSidebar jobs={jobs} activeJob={activeJob} setActiveJob={setActiveJob}/>
          { activeCandidate ? (
            <ModalResume 
              candidate={activeCandidate}
              onClose={() => setActiveCandidate(null)}
              candidateData={candidateData}
              activeJob={activeJob}
              reject={reject}
              accept={accept}
            />
          ) : ( 
            <div className="grid grid-cols-3 gap-4 m-4">
              {candidateData && candidateData.map((candidate, index) => (
                <ResumePreview key={`${candidateData[0].roles[0]}-${index}`} candidate={candidate} setActiveCandidate={setActiveCandidate} />
              ))}
            </div>
          )}
        { activeJob && (
          <div className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left border-l">
            <div className="grid w-full max-w-6xl">
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {activeJob.role}
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    {`${activeJob.jobType} | ${activeJob.remoteStatus} | ${activeJob.city.name}, ${activeJob.country.name}`}
                  </p>
                </div>

            <Separator />

            <div className="grid gap-2">
              <h1 className="text-xl">Minimum wage</h1>
              <p className="text-balance text-muted-foreground">
                {`$${activeJob.salaryLow}.00`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Maximum wage</h1>
              <p className="text-balance text-muted-foreground">
                {`$${activeJob.salaryHigh}.00`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Previous companies</h1>
              <p className="text-balance text-muted-foreground">
                {`${activeJob.workExperience.map(obj => obj.label).join(', ')}`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Previous universities</h1>
              <p className="text-balance text-muted-foreground">
                {`${activeJob.education.map(obj => obj.label).join(', ')}`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Keywords</h1>
              <p className="text-balance text-muted-foreground">
                {`${activeJob.keywords.map(obj => obj.label).join(', ')}`}
                </p>
            </div>

            <div className="grid gap-2">
              <h1 className="text-xl">Delete listing</h1>
              <Button variant='destructive' size='icon'>
                <Trash2 />
              </Button>
            </div>


          </div>
        )}
      </div>
    </>
  )
}

export default HiringDashboard