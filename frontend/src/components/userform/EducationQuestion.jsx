import { Separator } from "../ui/separator"
import AddEducation from "./AddEducation"
import EducationCard from "./EducationCard"

const EducationQuestion = ({ formData, setFormData }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">5/8</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's your education level?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          Your educational background can be a factor in qualifying for certain positions.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 items-start md:grid-cols-[280px_1fr] lg:grid-cols-[350px_1fr]">
        { formData.education && formData.education.map((education, index) => (
          <EducationCard key={index} education={education} setFormData={setFormData} />
        ))}
        <AddEducation setFormData={setFormData} />
      </div>
    </main>
  )
}

export default EducationQuestion