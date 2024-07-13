import { useState } from "react";
import { Separator } from "../ui/separator"
import Select from 'react-select'

const options = [
  { value: 'Massachusetts Institute of Technology (MIT)', label: 'Massachusetts Institute of Technology (MIT)' },
  { value: 'University of Cambridge', label: 'University of Cambridge' },
  { value: 'University of Oxford', label: 'University of Oxford' },
  { value: 'Harvard University', label: 'Harvard University' },
  { value: 'Stanford University', label: 'Stanford University' },
  { value: 'Imperial College London', label: 'Imperial College London' },
  { value: 'ETH Zurich - Swiss Federal Institute of Technology', label: 'ETH Zurich - Swiss Federal Institute of Technology' },
  { value: 'National University of Singapore (NUS)', label: 'National University of Singapore (NUS)' },
  { value: 'University College London (UCL)', label: 'University College London (UCL)' },
  { value: 'University of California, Berkeley (UCB)', label: 'University of California, Berkeley (UCB)' },
  { value: 'University of Chicago', label: 'University of Chicago' },
  { value: 'University of Pennsylvania', label: 'University of Pennsylvania' },
  { value: 'Cornell University', label: 'Cornell University' },
  { value: 'The University of Melbourne', label: 'The University of Melbourne' },
  { value: 'California Institute of Technology (Caltech)', label: 'California Institute of Technology (Caltech)' },
  { value: 'Yale University', label: 'Yale University' },
  { value: 'Peking University', label: 'Peking University' },
  { value: 'Princeton University', label: 'Princeton University' },
  { value: 'University of New South Wales (UNSW Sydney)', label: 'University of New South Wales (UNSW Sydney)' },
  { value: 'The University of Sydney', label: 'The University of Sydney' },
  { value: 'University of Toronto', label: 'University of Toronto' },
  { value: 'The University of Edinburgh', label: 'The University of Edinburgh' },
  { value: 'Columbia University', label: 'Columbia University' },
  { value: 'Université PSL', label: 'Université PSL' },
  { value: 'Tsinghua University', label: 'Tsinghua University' },
  { value: 'Nanyang Technological University, Singapore (NTU)', label: 'Nanyang Technological University, Singapore (NTU)' },
  { value: 'The University of Hong Kong', label: 'The University of Hong Kong' },
  { value: 'Johns Hopkins University', label: 'Johns Hopkins University' },
  { value: 'The University of Tokyo', label: 'The University of Tokyo' },
  { value: 'University of California, Los Angeles (UCLA)', label: 'University of California, Los Angeles (UCLA)' },
  { value: 'McGill University', label: 'McGill University' },
  { value: 'The University of Manchester', label: 'The University of Manchester' },
  { value: 'University of Michigan-Ann Arbor', label: 'University of Michigan-Ann Arbor' },
  { value: 'Australian National University', label: 'Australian National University' },
  { value: 'University of British Columbia', label: 'University of British Columbia' },
  { value: 'École Polytechnique Fédérale de Lausanne (EPFL)', label: 'École Polytechnique Fédérale de Lausanne (EPFL)' },
  { value: 'Technical University of Munich', label: 'Technical University of Munich' },
  { value: 'Institut Polytechnique de Paris', label: 'Institut Polytechnique de Paris' },
  { value: 'New York University (NYU)', label: 'New York University (NYU)' },
  { value: 'King\'s College London', label: 'King\'s College London' },
  { value: 'Seoul National University', label: 'Seoul National University' },
  { value: 'Monash University', label: 'Monash University' },
  { value: 'The University of Queensland', label: 'The University of Queensland' },
  { value: 'Zhejiang University', label: 'Zhejiang University' },
  { value: 'London School of Economics and Political Science (LSE)', label: 'London School of Economics and Political Science (LSE)' },
  { value: 'Kyoto University', label: 'Kyoto University' },
  { value: 'Delft University of Technology', label: 'Delft University of Technology' },
  { value: 'Northwestern University', label: 'Northwestern University' },
  { value: 'The Chinese University of Hong Kong (CUHK)', label: 'The Chinese University of Hong Kong (CUHK)' },
  { value: 'Fudan University', label: 'Fudan University' },
  { value: 'Shanghai Jiao Tong University', label: 'Shanghai Jiao Tong University' },
  { value: 'Carnegie Mellon University', label: 'Carnegie Mellon University' },
  { value: 'University of Amsterdam', label: 'University of Amsterdam' },
  { value: 'Ludwig-Maximilians-Universität München', label: 'Ludwig-Maximilians-Universität München' },
  { value: 'University of Bristol', label: 'University of Bristol' },
  { value: 'KAIST - Korea Advanced Institute of Science & Technology', label: 'KAIST - Korea Advanced Institute of Science & Technology' },
  { value: 'Duke University', label: 'Duke University' },
  { value: 'University of Texas at Austin', label: 'University of Texas at Austin' },
  { value: 'Sorbonne University', label: 'Sorbonne University' },
  { value: 'The Hong Kong University of Science and Technology', label: 'The Hong Kong University of Science and Technology' },
  { value: 'KU Leuven', label: 'KU Leuven' },
  { value: 'University of California, San Diego (UCSD)', label: 'University of California, San Diego (UCSD)' },
  { value: 'University of Washington', label: 'University of Washington' },
  { value: 'University of Illinois at Urbana-Champaign', label: 'University of Illinois at Urbana-Champaign' },
  { value: 'The Hong Kong Polytechnic University', label: 'The Hong Kong Polytechnic University' },
  { value: 'Universiti Malaya (UM)', label: 'Universiti Malaya (UM)' },
  { value: 'The University of Warwick', label: 'The University of Warwick' },
  { value: 'University of Auckland', label: 'University of Auckland' },
  { value: 'National Taiwan University (NTU)', label: 'National Taiwan University (NTU)' },
  { value: 'City University of Hong Kong', label: 'City University of Hong Kong' },
  { value: 'Université Paris-Saclay', label: 'Université Paris-Saclay' },
  { value: 'The University of Western Australia', label: 'The University of Western Australia' },
  { value: 'Brown University', label: 'Brown University' },
  { value: 'KTH Royal Institute of Technology', label: 'KTH Royal Institute of Technology' },
  { value: 'University of Leeds', label: 'University of Leeds' },
  { value: 'University of Glasgow', label: 'University of Glasgow' },
  { value: 'Yonsei University', label: 'Yonsei University' },
  { value: 'Durham University', label: 'Durham University' },
  { value: 'Korea University', label: 'Korea University' },
  { value: 'Osaka University', label: 'Osaka University' },
  { value: 'Trinity College Dublin, The University of Dublin', label: 'Trinity College Dublin, The University of Dublin' },
  { value: 'University of Southampton', label: 'University of Southampton' },
  { value: 'Pennsylvania State University', label: 'Pennsylvania State University' },
  { value: 'University of Birmingham', label: 'University of Birmingham' },
  { value: 'Lund University', label: 'Lund University' },
  { value: 'Universidade de São Paulo', label: 'Universidade de São Paulo' },
  { value: 'Lomonosov Moscow State University', label: 'Lomonosov Moscow State University' },
  { value: 'Universität Heidelberg', label: 'Universität Heidelberg' },
  { value: 'The University of Adelaide', label: 'The University of Adelaide' },
  { value: 'University of Technology Sydney', label: 'University of Technology Sydney' },
  { value: 'Tokyo Institute of Technology (Tokyo Tech)', label: 'Tokyo Institute of Technology (Tokyo Tech)' },
  { value: 'University of Zurich', label: 'University of Zurich' },
  { value: 'Boston University', label: 'Boston University' },
  { value: 'Universidad Nacional Autónoma de México (UNAM)', label: 'Universidad Nacional Autónoma de México (UNAM)' },
  { value: 'Universidad de Buenos Aires (UBA)', label: 'Universidad de Buenos Aires (UBA)' },
]

const UniversitiesQuestion = ({ formData, setFormData }) => {
  const handleChange = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      education: selectedOption
    }));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">1/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Filter candidates by university</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">Don&apos;t worry, you can change these choices later on.</p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <Select
          isMulti
          name="education"
          options={options}
          className="w-[600px]"
          value={formData.education}
          onChange={handleChange}
        />
      </div>
    </main>
  )
}

export default UniversitiesQuestion
