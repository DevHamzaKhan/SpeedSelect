
import { useState } from "react";
import { Document, Page } from "react-pdf";

/**
 * Modal component for displaying a PDF document with navigation controls.
 *
 * @param {Object} props - The component props.
 * @param {string} props.pdfUrl - The URL of the PDF document to display.
 * @param {Function} props.onClose - The function to call when the modal is closed.
 * @returns {JSX.Element} The rendered modal component.
 */
function ModalResume({ pdfUrl, onClose, resumeUrls }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [resumeNumber, setResumeNumber] = useState(resumeUrls.indexOf(pdfUrl));

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const changeResume = offset => {
        setResumeNumber(prevResume => prevResume + offset);
    }

    const previousResume = () => {
        if (resumeNumber > 0) {
            changeResume(-1)
        }
    }

    const nextResume = () => {
        if (resumeNumber < resumeUrls.length - 1){
            changeResume(1)
        }
    }

    const changePage = offset => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    const previousPage = () => {
        changePage(-1);
    };

    const nextPage = () => {
        changePage(1);
    };

    return (
        <div className={`p-10 rounded-xl bg-base-300 w-fit mx-auto`}>
            <div className="flex justify-center items-center flex-col">
                <p className={`w-full flex items-center mb-4`}><span className={`ml-auto text-2xl font-semibold`}>Resume Viewing</span><span className="ml-auto text-3xl font-bold cursor-pointer" onClick={onClose}>
                    &times;
                </span></p>
                
                <div className={`flex justify-center items-center flex-col`}>
                    <div className={`gap-4 flex items-center mb-2`}>
                        <button className={`btn bg-neutral text-neutral-content cursor-pointer`} onClick={previousResume} disabled={resumeNumber <= 0}>
                            Previous
                        </button>
                        <span className={`font-bold`}> Resume {resumeNumber + 1} of {resumeUrls.length}</span>
                        <button className={`btn bg-neutral text-neutral-content cursor-pointer`} onClick={nextResume} disabled={resumeNumber >= resumeUrls.length - 1}>
                            Next
                        </button>
                    </div>
                    <div className={`w-fit rounded-xl shadow-xl overflow-hidden`}>
                    <Document
                        file={resumeUrls[resumeNumber]}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={error =>
                            console.error(`Error loading document: ${error}`)
                        }>
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                    </div>
                </div>
                <div className={`gap-4 flex items-center mt-2`}>
                        <button className={`btn bg-neutral text-neutral-content cursor-pointer`} onClick={previousResume} disabled={resumeNumber <= 0}>
                            Previous
                        </button>
                        <span className={`font-bold`}> Resume {resumeNumber + 1} of {resumeUrls.length}</span>
                        <button className={`btn bg-neutral text-neutral-content cursor-pointer`} onClick={nextResume} disabled={resumeNumber >= resumeUrls.length - 1}>
                            Next
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default ModalResume;