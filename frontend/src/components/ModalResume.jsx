import { ArrowLeft, ArrowRight, Check, CircleX, Download, EllipsisVertical, MessageSquarePlus, Minus, Package2, Plus, Search, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  '../../node_modules/pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

function ModalResume({ pdfUrl, onClose, resumeUrls }) {
    const [numPages, setNumPages] = useState(null);
    const [resumeNumber, setResumeNumber] = useState(resumeUrls.indexOf(pdfUrl));

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
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

    const reject = () => {
        console.log("reject");
    }
    
    const accept = () => {
        console.log("accept");
    }

    const [pageWidth, setPageWidth] = useState(800);

    const minimize = () => setPageWidth(pageWidth === 400 ? 400 : pageWidth - 200);
    const maximize = () => setPageWidth(pageWidth === 1200 ? 1200 : pageWidth + 200);

    return (
        <div className={`w-full mx-auto bg-stone-100 relative`}>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Button variant="outline" size="icon" onClick={onClose}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <p
                        className="text-foreground transition-colors hover:text-foreground whitespace-nowrap"
                    >
                        Applicant name
                    </p>
                </nav>
                <p
                    className="text-foreground transition-colors hover:text-foreground whitespace-nowrap absolute left-1/2 transform -translate-x-1/2"
                >
                    Resume {resumeNumber + 1} of {resumeUrls.length}
                </p>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial flex flex-row gap-2">
                    </div>
                </div>
            </header>
            
            <ScrollArea className='h-calc-8'>
                <div className={`flex justify-center items-center flex-col`}>
                    <Document
                        file={resumeUrls[resumeNumber]}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={error =>
                            console.error(`Error loading document: ${error}`)
                        }
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <div key={`page_${index + 1}`} className="my-4">
                                <Page
                                    pageNumber={index + 1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    width={pageWidth}
                                />
                            </div>
                        ))}
                    </Document>
                </div>
            </ScrollArea>

            <Button variant="outline" size="icon" onClick={previousResume} className="absolute left-10 top-1/2 transform -translate-y-1/2">
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextResume} className="absolute right-10 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="h-4 w-4" />
            </Button>

            <header className="absolute bottom-0 w-full flex h-20 items-center justify-center lg:h-[120px] lg:px-6">
                <div className="rounded-full flex items-center justify-between bg-muted/90 border p-4 h-10 lg:h-[60px] lg:px-6">
                    <div className="flex gap-4 mr-4">
                        <Button size='icon' variant="outline" className="rounded-lg" onClick={reject}>
                            <X size={26} color="red"/>
                        </Button>
                        <Button size='icon' className="rounded-full" onClick={accept}>
                           <Check size={26}/> 
                        </Button>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex gap-4 items-center ml-2">
                        <Button size='icon' variant="ghost" className="hover:bg-stone-200" onClick={minimize}>
                            <Minus />
                        </Button>
                        <ZoomIn color="gray"/>
                        <Button size='icon' variant="ghost" className="hover:bg-stone-200" onClick={maximize}>
                            <Plus /> 
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default ModalResume;
