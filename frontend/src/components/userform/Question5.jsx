import { Separator } from "../ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ComboBoxResponsive } from "../Combobox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { CountrySelect } from "./CountrySelect"

const Question5 = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">7/8</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Where are you located?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          Your location can affect job opportunities, especially for roles that require physical presence.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start">
        <div className="flex flex-col gap-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input type="city" id="city" placeholder="City" value={formData.city} onChange={handleInputChange}/>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="country">Country</Label>
            <CountrySelect formData={formData} setFormData={setFormData} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Question5