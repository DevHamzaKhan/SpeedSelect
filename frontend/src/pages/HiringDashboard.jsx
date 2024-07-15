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
import { title } from "process"
import { useState } from "react"
import { Link } from "react-router-dom"

const jobs = [
  {
    title: 'Job 1',
    resumes: [
"https://firebasestorage.googleapis.com/v0/b/speedselect-531aa.appspot.com/o/resumes%2FA2yM1RgZPvYzT61gHRsG1TkNirP2.pdf?alt=media&token=91ac90e8-e62e-43b2-babf-d8eb2404f9f4",
"https://firebasestorage.googleapis.com/v0/b/speedselect-531aa.appspot.com/o/resumes%2FResume-Aya-Yoshinaga-17112023%20-%20Aya.pdf?alt=media&token=b8402473-88fa-4601-b7b2-4a2c044b81be",
"https://firebasestorage.googleapis.com/v0/b/speedselect-531aa.appspot.com/o/resumes%2FCourse%20outline%20-%20python%20Beginner.pdf?alt=media&token=a21275b6-4bd5-4349-8a66-8727e09688b9"
    ]
  },
  {
    title: 'Job 2',
    resumes: [
      "https://firebasestorage.googleapis.com/v0/b/speedselect-531aa.appspot.com/o/resumes%2FAPznzaaCrVm0Q_g7a7qUbolBA-8SSphInHeXlNyIQRbX0WYVTfvHxucTI4GOp77VrQy5sGmPA0ISx4Rz22Pj3ZkNKLclXh6FjSqHSHP53pL3_zFmCDQTvcssjV_pcVaBV3gsw2qZ3YijDI67SPCO1Yh2BDHcXn1CnM92k-_J5mM6UG4-MDnzgE0eblO7Taj5z6Q50CTdT454MNsCbz3x7M.pdf?alt=media&token=73c2b28c-4755-455d-bbb0-dac8fe501dd1",
    ]
  },
]

const HiringDashboard = () => {
  const [activeJob, setActiveJob] = useState(jobs[0]);
  const [activeResume, setActiveResume] = useState(null);

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
                <ResumePreview key={`${activeJob.title}-${index}`} resume={resume} setActiveResume={setActiveResume} />
              ))}
            </div>
          )}
      </div>
    </>
  )
}

export default HiringDashboard