import { Checkbox } from "../ui/checkbox"
import { useState } from "react"
import { Separator } from "../ui/separator"

const roles = {
  "Transportation": ["Logistics Manager", "Fleet Manager", "Transport Planner"],
  "Pharmaceutical": ["Pharmaceutical Sales Representative", "Medical Science Liaison", "Clinical Research Associate"],
  "Telecommunications": ["Network Engineer", "Telecoms Consultant", "Systems Developer"],
  "Manufacturing": ["Production Manager", "Quality Assurance Manager", "Plant Manager"],
  "Mining": ["Mining Engineer", "Geologist", "Metallurgist"],
  "Customer Service": ["Community Management & Tagging", "Customer Service & Tech Support"],
  "Media and News": ["News Reporter", "Broadcast Journalist", "Public Relations Specialist"],
  "Agriculture": ["Farm Manager", "Agricultural Consultant", "Food Scientist"],
  "Computer and Technology": ["Software Developer", "Data Analyst", "IT Consultant"],
  "Education": ["Teacher", "School Administrator", "Curriculum Developer"],
  "Finance and Economics": ["Financial Analyst", "Economist", "Investment Banker"],
  "Health Care": ["Nurse", "Physician", "Healthcare Administrator"]
}

const categories = [
  "Transportation",
  "Pharmaceutical",
  "Telecommunications",
  "Manufacturing",
  "Mining",
  "Customer Service",
  "Media and News",
  "Agriculture",
  "Computer and Technology",
  "Education",
  "Finance and Economics",
  "Health Care"
]

const Question1 = ({ formData, setFormData }) => {
  const [selectedCategory, setSelectedCategory] = useState("Customer Service")

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">1/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What kind of work do you do?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">Don&apos;t worry, you can change these choices later on.</p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          {categories.map((category, index) => (
            <p 
              key={index} 
              onClick={() => handleCategoryClick(category)} 
              className={`cursor-pointer ${selectedCategory === category ? "font-semibold text-primary" : ""}`}
            >
              {category}
            </p>
          ))}
        </nav>

        <div className="grid gap-6">
          {selectedCategory && roles[selectedCategory].map((role, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox 
                id={role}
                checked={formData.roles?.includes(role)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData(prev => ({...prev, roles: [...prev.roles, role]}));
                  } else {
                    setFormData(prev => ({...prev, roles: prev.roles.filter(value => value !== role)}));
                  }
                }}
              />
              <label htmlFor={role} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {role}
              </label>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Question1
