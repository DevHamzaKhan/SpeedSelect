import { useState } from 'react';
import { Separator } from "../ui/separator"
import { FileText, X } from 'lucide-react';
import { Button } from '../ui/button';
import pdfToText from 'react-pdftotext';

function bytesToMB(bytes) {
  let megabytes = bytes / 1024 / 1024;
  return megabytes.toFixed(2);
}

const Question6 = ({ formData, setFormData, file, setFile, setText }) => {

  const handleFileChange = (e) => {
    const newFile = e.target.files[0]

    setFile(newFile);
    console.log(newFile);

    setFormData(prev => ({
      ...prev,
      fileMetaData: {
        name: newFile.name,
        size: newFile.size,
        lastModified: newFile.lastModified,
        lastModifiedDate: newFile.lastModifiedDate
      }
    }));

    pdfToText(newFile)
      .then(text => setText(text))
      .catch(error => console.error("Failed to extract text from PDF", error));
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">10/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upload your resume</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          We&apos;ll extract keywords from your resume to match you with suitable employers.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start">
        { !file || !formData.fileMetaData ? (
          <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 5MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
              </label>
          </div>
        ) : (
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <FileText />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {formData.fileMetaData.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {`${bytesToMB(formData.fileMetaData.size)} MB`}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => {
              setFile(null);
              setFormData(prev =>
              ({
                ...prev,
                resumeUrl: null,
                fileMetaData: null
              }));
            }}>
              <X />
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Question6
