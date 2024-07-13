import { Separator } from "../ui/separator"
import Select from 'react-select'

const options = [
  { value: 'Apple', label: 'Apple' },
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'NVIDIA', label: 'NVIDIA' },
  { value: 'Alphabet (Google)', label: 'Alphabet (Google)' },
  { value: 'Amazon', label: 'Amazon' },
  { value: 'Saudi Aramco', label: 'Saudi Aramco' },
  { value: 'Meta Platforms (Facebook)', label: 'Meta Platforms (Facebook)' },
  { value: 'TSMC', label: 'TSMC' },
  { value: 'Berkshire Hathaway', label: 'Berkshire Hathaway' },
  { value: 'Eli Lilly', label: 'Eli Lilly' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Broadcom', label: 'Broadcom' },
  { value: 'Novo Nordisk', label: 'Novo Nordisk' },
  { value: 'JPMorgan Chase', label: 'JPMorgan Chase' },
  { value: 'Walmart', label: 'Walmart' },
  { value: 'Visa', label: 'Visa' },
  { value: 'Exxon Mobil', label: 'Exxon Mobil' },
  { value: 'Tencent', label: 'Tencent' },
  { value: 'UnitedHealth', label: 'UnitedHealth' },
  { value: 'ASML', label: 'ASML' },
  { value: 'Mastercard', label: 'Mastercard' },
  { value: 'Samsung', label: 'Samsung' },
  { value: 'Oracle', label: 'Oracle' },
  { value: 'LVMH', label: 'LVMH' },
  { value: 'Procter & Gamble', label: 'Procter & Gamble' },
  { value: 'Costco', label: 'Costco' },
  { value: 'Johnson & Johnson', label: 'Johnson & Johnson' },
  { value: 'Home Depot', label: 'Home Depot' },
  { value: 'Bank of America', label: 'Bank of America' },
  { value: 'Merck', label: 'Merck' },
  { value: 'AbbVie', label: 'AbbVie' },
  { value: 'AMD', label: 'AMD' },
  { value: 'Chevron', label: 'Chevron' },
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Netflix', label: 'Netflix' },
  { value: 'Nestlé', label: 'Nestlé' },
  { value: 'ICBC', label: 'ICBC' },
  { value: 'Coca-Cola', label: 'Coca-Cola' },
  { value: 'Reliance Industries', label: 'Reliance Industries' },
  { value: 'Kweichow Moutai', label: 'Kweichow Moutai' },
  { value: 'PetroChina', label: 'PetroChina' },
  { value: 'Hermès', label: 'Hermès' },
  { value: 'Adobe', label: 'Adobe' },
  { value: 'Salesforce', label: 'Salesforce' },
  { value: 'International Holding Company', label: 'International Holding Company' },
  { value: 'AstraZeneca', label: 'AstraZeneca' },
  { value: 'L\'Oréal', label: 'L\'Oréal' },
  { value: 'SAP', label: 'SAP' },
  { value: 'Roche', label: 'Roche' },
  { value: 'Shell', label: 'Shell' },
  { value: 'Pepsico', label: 'Pepsico' },
  { value: 'Novartis', label: 'Novartis' },
  { value: 'QUALCOMM', label: 'QUALCOMM' },
  { value: 'Agricultural Bank of China', label: 'Agricultural Bank of China' },
  { value: 'China Mobile', label: 'China Mobile' },
  { value: 'Linde', label: 'Linde' },
  { value: 'T-Mobile US', label: 'T-Mobile US' },
  { value: 'Thermo Fisher Scientific', label: 'Thermo Fisher Scientific' }
];


const PrevCompaniesQuestion = ({ formData, setFormData }) => {
  const handleChange = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      workExperience: selectedOption
    }));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">1/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Filter candidates by previous companies</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">Don&apos;t worry, you can change these choices later on.</p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <Select
          isMulti
          options={options}
          className="w-[600px]"
          value={formData.workExperience}
          onChange={handleChange}
        />
      </div>
    </main>
  )
}

export default PrevCompaniesQuestion;

