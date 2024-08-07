import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"

const minWages = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // replace with your values

const Question2 = ({ formData, setFormData }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">4/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What salary are you looking for?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          Your salary expectations help potential employers determine if they can provide a compensation package that meets your needs.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start">
        <div className="flex flex-col gap-12">
          <div className="grid gap-2">
            <h1 className="text-2xl">Minimum wage</h1>
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-balance text-muted-foreground">
              Enter the lowest salary you would consider for this position
              </p>
              <div className="flex flex-row gap-2 justify-end items-center">
                <Select 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, salaryLow: value }))}
                  defaultValue={formData.salaryLow}
                >
                  <SelectTrigger
                    id="minWage"
                    aria-label="Select minimum wage"
                    className="w-60"
                  >
                    <SelectValue placeholder="Select minimum wage" />
                  </SelectTrigger>
                  <SelectContent>
                    {minWages.map(wage => <SelectItem key={wage} value={wage}>{wage}</SelectItem>)}
                  </SelectContent>
                </Select>
                <p className="text-balance text-muted-foreground">/hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Question2
