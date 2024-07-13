import { useState } from 'react';
import { Laugh, Smile, Meh, Frown } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const Question2 = ({ formData, setFormData }) => {

  const options = [
    { name: 'Intern', icon: <Laugh /> },
    { name: 'Full-time', icon: <Smile /> },
    { name: 'Part-time', icon: <Meh /> },
    { name: 'Temporary', icon: <Frown /> },
    { name: 'Contract', icon: <Laugh /> },
    { name: 'Freelance', icon: <Laugh /> },
  ];

  const handleClick = (option) => {
    setFormData(prev => ({...prev, jobType: option.name}));
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">2/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What type of worker do you need?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">Use this example to show a simple heading, paragraph, and a couple of CTA</p>
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

export default Question2
