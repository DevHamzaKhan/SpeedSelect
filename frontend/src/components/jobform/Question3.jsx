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

const minWages = [10, 15, 20, 25, 30]; // replace with your values
const maxWages = [35, 40, 45, 50, 55]; // replace with your values

const Question3 = ({ formData, setFormData }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">3/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What&apos;s your budget?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">Use this example to show a simple heading, paragraph, and a couple of CTA</p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start">
        <div className="flex flex-col gap-12">
          <div className="grid gap-2">
            <h1 className="text-2xl">Minimum wage</h1>
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
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
          <div className="grid gap-2">
            <h1 className="text-2xl">Maximum wage</h1>
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
              <div className="flex flex-row gap-2 justify-end items-center">
                <Select
                  onValueChange={(value) => setFormData(prev => ({ ...prev, salaryHigh: value }))}
                  defaultValue={formData.salaryHigh}
                >
                  <SelectTrigger
                    id="maxWage"
                    aria-label="Select maximum wage"
                    className="w-60"
                  >
                    <SelectValue placeholder="Select maximum wage" />
                  </SelectTrigger>
                  <SelectContent>
                    {maxWages.map(wage => <SelectItem key={wage} value={wage}>{wage}</SelectItem>)}
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

export default Question3
