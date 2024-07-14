import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import convertPdfToImages from "../utils/PDFConverter";
import ModalResume from "../components/ModalResume";

/**
 * Fetches resumes for a given job document from Firestore.
 * @param {string} jobId - The ID of the job document.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of resume objects.
 * @throws {Error} If there is an error fetching or converting the resumes.
 */
const fetchResumes = async (jobId) => {
    const jobDocRef = doc(db, "Jobs", auth.currentUser.uid, "jobs", jobId);
    const jobDocSnapshot = await getDoc(jobDocRef);
    const jobData = jobDocSnapshot.data();

    if (!jobData || !jobData.Resumes) {
        throw new Error("No resumes found for this job.");
    }

    const resumes = jobData.Resumes;
    const newResumes = [];

    try {
        for (const resumeFolder of resumes) {
            const folderRef = ref(storage, `Resumes/${resumeFolder}.pdf`);

                const fileUrl = await getDownloadURL(folderRef);
                const imageUrls = await convertPdfToImages(fileUrl);

                if (imageUrls.length > 0) {
                    newResumes.push({
                        pdfUrl: fileUrl,
                        pdfName: resumeFolder,
                        imageUrls: imageUrls,
                        jobName: jobData.title,
                    });
                }
        }
    } catch (err) {
        console.error("Error fetching resumes:", err);
        throw new Error("Failed to load resumes.");
    }

    return newResumes;
};

/**
 * Renders a list of jobs with their preview images and allows recruiters to view the full resume in a modal.
 *
 * @component
 * @example
 * return (
 *   <Jobs />
 * )
 */
const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJobResumes, setSelectedJobResumes] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const userJobsRef = collection(db, "Jobs", auth.currentUser.uid, "jobs");
                const jobsSnapshot = await getDocs(userJobsRef);
                const jobsData = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setJobs(jobsData);
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

    const handleViewResumes = async (jobId) => {
        console.log("JOBID:", jobId);
        try {
            setLoading(true);
            const resumes = await fetchResumes(jobId);
            console.log("RESUMES:", resumes);
            setSelectedJobResumes(resumes);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (error) {
        return <div className={`flex-1 p-5`}>{error}</div>;
    }

    if (jobs.length === 0) {
        return <div className={`flex-1 p-5`}>No jobs found.</div>;
    }

    return (
        <div className={`flex-1 p-5`}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1 className={`text-4xl font-bold text-center mb-1`}>Jobs</h1>
                    <p className={`text-2xl font-normal text-neutral-600 text-center mb-10`}>View the Jobs you have posted (Click on a Job in the Table)</p>
                    {pdfUrl ? (
                        <ModalResume
                            pdfUrl={pdfUrl}
                            onClose={() => setPdfUrl(null)}
                            resumeUrls={selectedJobResumes.map(resume => resume.pdfUrl)}
                        />
                    ) : (
                        <div>
                            <div>
                                <table className={`table table-sm`}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className={``}>Title</th>
                                            <th>Job Type</th>
                                            <th>Remote Option</th>
                                            <th>Salary Low</th>
                                            <th>Salary High</th>
                                            <th>Education Level</th>
                                            <th>Resumes</th>
                                            <th>Location</th>
                                            <th>Past Companies</th>
                                            <th>Minimum Age</th>
                                            <th>Universities</th>
                                            <th>Industry</th>
                                            <th>Key Words</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.map((job, index) => (
                                            <tr key={job.id} className={`hover cursor-pointer`} onClick={() => handleViewResumes(job.id)}>
                                                <td>{index + 1}</td>
                                                <td>{job.title}</td>
                                                <td>{job.jobType}</td>
                                                <td>{job.remoteOption}</td>
                                                <td>{job.salaryLow}</td>
                                                <td>{job.salaryHigh}</td>
                                                <td>{job.educationLevel.join(', ')}</td>
                                                <td>{job.Resumes.join(', ')}</td>
                                                <td>{job.location.latitude}, {job.location.longitude}</td>
                                                <td>{job.pastCompanies.join(', ')}</td>
                                                <td>{job.minAge}</td>
                                                <td>{job.universities.join(', ')}</td>
                                                <td>{job.industry.join(', ')}</td>
                                                <td>{job.keyWords.join(', ')}</td>
                                            </tr>
                                            // <button key={job.id} onClick={() => handleViewResumes(job.id)}>
                                            //     {job.title}
                                            // </button>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {selectedJobResumes.length > 0 && (
                                <div>
                                    <h2 className={`text-3xl font-semibold text-center mb-3 mt-5`}>Resumes Matching Job: <span className={`font-bold`}>{selectedJobResumes[0].jobName}</span></h2>
                                    <div className={`gap-5 flex flex-wrap`}>
                                        {selectedJobResumes.map((resume, index) => {
                                            return (
                                                <div onClick={() => setPdfUrl(resume.pdfUrl)} key={index} className={`rounded-lg w-fit h-fit overflow-hidden p-5 bg-base-300 shadow-lg hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer`}>
                                                    <img src={resume.imageUrls[0]} alt="Preview of Resume" className={`w-full h-96 rounded-lg mb-1`}/>
                                                    <p className={`text-md font-semibold`}>{resume.pdfName}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/* <ul style={{ display: "flex", flexWrap: "wrap" }}>
                                        {selectedJobResumes.map((resume, index) => (
                                            <li key={resume.pdfUrl} style={{ marginRight: "30px" }}>
                                                <h3>{resume.pdfName}</h3>
                                                <img
                                                    src={resume.imageUrls[0]}
                                                    onClick={() => setPdfUrl(resume.pdfUrl)}
                                                    style={{
                                                        width: "300px",
                                                        height: "auto",
                                                        transition: "transform 0.5s",
                                                        cursor: "pointer",
                                                    }}
                                                    alt={`Preview of ${resume.pdfName}`}
                                                    onMouseEnter={e => {
                                                        e.target.style.transform = "scale(1.05)";
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.target.style.transform = "scale(1)";
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul> */}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Jobs;
