import { Book, BookCopy, Ellipsis, GraduationCap, LibraryBig, School, ShieldCheck } from "lucide-react";
import { Separator } from "../ui/separator"
import AddEducation from "./AddEducation"
import EducationCard from "./EducationCard"
import { Button } from "../ui/button";

const EducationQuestion = ({ formData, setFormData }) => {
  const options = [
    { name: 'Working towards diploma', icon: <Ellipsis /> },
    { name: 'High School', icon: <GraduationCap /> },
    { name: 'Associate Degree', icon: <Book /> },
    { name: 'Bachelor\'s Degree', icon: <LibraryBig /> },
    { name: 'Master\'s Degree', icon: <BookCopy /> },
    { name: 'Doctorate', icon: <School /> },
    { name: 'Certification', icon: <ShieldCheck /> },
  ];

  const handleClick = (option) => {
    setFormData(prev => ({...prev, education: option.name}));
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">5/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's your education level?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          Your educational background can be a factor in qualifying for certain positions.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-2xl items-start grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button
            key={index} 
            className={`w-80 h-20 ${formData.education === option.name ? 'border-2 border-b-4 border-primary text-primary' : ''}`} 
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