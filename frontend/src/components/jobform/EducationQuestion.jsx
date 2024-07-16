import { useState } from 'react';
import { Laugh, Smile, Meh, Frown, Ellipsis, BookMarked, GraduationCap, School, BookCopy, LibraryBig, ShieldCheck } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const EducationQuestion = ({ formData, setFormData }) => {
  const [activeButton, setActiveButton] = useState(null);

  const options = [
    { name: 'Working towards diploma', icon: <Ellipsis /> },
    { name: 'High School', icon: <GraduationCap /> },
    { name: 'Associate Degree', icon: <School /> },
    { name: 'Bachelor\'s Degree', icon: <LibraryBig /> },
    { name: 'Master\'s Degree', icon: <BookCopy /> },
    { name: 'Doctorate', icon: <School /> },
    { name: 'Certification', icon: <ShieldCheck /> },
  ];

  const handleClick = (option) => {
    setFormData(prev => ({...prev, minimumEducation: option.name}));
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">5/9</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's the minimum-required education level?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          This helps filter candidates based on their educational qualifications, ensuring they meet the requirements of the role.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-2xl items-start grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button 
            key={index} 
            className={`w-80 h-20 ${formData.minimumEducation === option.name ? 'border-2 border-b-4 border-primary text-primary' : ''}`} 
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

export default EducationQuestion
