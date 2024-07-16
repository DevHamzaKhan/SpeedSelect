import { useState } from 'react';
import { Laugh, Smile, Meh, Frown, GraduationCap, Clock, BriefcaseBusiness, BookDashed, Receipt, Laptop } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const WorkTypeQuestion = ({ formData, setFormData }) => {

  const options = [
    { name: 'Intern', icon: <GraduationCap /> },
    { name: 'Full-time', icon: <BriefcaseBusiness /> },
    { name: 'Part-time', icon: <Clock /> },
    { name: 'Temporary', icon: <BookDashed /> },
    { name: 'Contract', icon: <Receipt /> },
    { name: 'Freelance', icon: <Laptop /> },
  ];

  const handleClick = (option) => {
    setFormData(prev => ({...prev, jobType: option.name}));
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">2/8</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What type of worker are you?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          Selecting the right option here allows us to match you with opportunities that match your circumstances.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-2xl items-start grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button 
            key={index} 
            className={`w-80 h-20 ${formData.jobType === option.name ? 'border-2 border-b-4 border-primary text-primary' : ''}`} 
            variant="outline"
            onClick={() => handleClick(option)}
          >
            <div className="flex flex-row gap-4 items-center w-full">
              {option.icon}
              <p>{option.name}</p>
            </div>
          </Button>
        ))}
      </div>
    </main>
  )
}

export default WorkTypeQuestion
