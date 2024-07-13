import { Separator } from "../ui/separator"
import AddExperience from "./AddExperience"
import ExperienceCard from "./ExperienceCard"

const Question4 = ({ formData, setFormData }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">4/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Where have you worked?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">Use this example to show a simple heading, paragraph, and a couple of CTA</p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 items-start md:grid-cols-[280px_1fr] lg:grid-cols-[350px_1fr]">
        { formData.workExperience && formData.workExperience.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} setFormData={setFormData} />
        ))}
        <AddExperience setFormData={setFormData} />
      </div>
    </main>
  )
}

export default Question4