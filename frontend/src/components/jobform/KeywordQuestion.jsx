import { Separator } from "../ui/separator"
import CreatableSelect from 'react-select/creatable';

const options = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'Sales Representative', label: 'Sales Representative' },
  { value: 'Graphic Designer', label: 'Graphic Designer' },
  { value: 'Web Developer', label: 'Web Developer' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Business Analyst', label: 'Business Analyst' },
  { value: 'Human Resources Manager', label: 'Human Resources Manager' },
  { value: 'Customer Service Representative', label: 'Customer Service Representative' },
  { value: 'Accountant', label: 'Accountant' },
  { value: 'Financial Analyst', label: 'Financial Analyst' },
  { value: 'Mechanical Engineer', label: 'Mechanical Engineer' },
  { value: 'Administrative Assistant', label: 'Administrative Assistant' },
  { value: 'Operations Manager', label: 'Operations Manager' },
  { value: 'Network Administrator', label: 'Network Administrator' },
  { value: 'Database Administrator', label: 'Database Administrator' },
  { value: 'Physical Therapist', label: 'Physical Therapist' },
  { value: 'Occupational Therapist', label: 'Occupational Therapist' },
  { value: 'Dentist', label: 'Dentist' },
  { value: 'Nurse Practitioner', label: 'Nurse Practitioner' },
  { value: 'Pharmacist', label: 'Pharmacist' },
  { value: 'Psychologist', label: 'Psychologist' },
  { value: 'Veterinarian', label: 'Veterinarian' },
  { value: 'Civil Engineer', label: 'Civil Engineer' },
  { value: 'Electrician', label: 'Electrician' },
  { value: 'Real Estate Agent', label: 'Real Estate Agent' },
  { value: 'Social Worker', label: 'Social Worker' },
  { value: 'Teacher', label: 'Teacher' },
  { value: 'Chef', label: 'Chef' },
  { value: 'Pilot', label: 'Pilot' },
  { value: 'Architect', label: 'Architect' },
  { value: 'Attorney', label: 'Attorney' },
  { value: 'Surgeon', label: 'Surgeon' },
  { value: 'Physician', label: 'Physician' },
  { value: 'Police Officer', label: 'Police Officer' },
  { value: 'Firefighter', label: 'Firefighter' },
  { value: 'Plumber', label: 'Plumber' },
  { value: 'Carpenter', label: 'Carpenter' }
];

const KeywordQuestion = ({ formData, setFormData }) => {
  const handleChange = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      keywords: selectedOption
    }));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">8/9</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Filter by keywords</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
        Keywords can help you narrow down candidates based on specific skills, experiences, or qualifications that are important for the role.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <CreatableSelect
          isMulti
          options={options}
          className="w-[600px]"
          value={formData.keywords}
          onChange={handleChange}
        />
      </div>
    </main>
  )
}

export default KeywordQuestion;

