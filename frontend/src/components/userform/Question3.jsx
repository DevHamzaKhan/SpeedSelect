import { Laugh } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const Question3 = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">3/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's your education level?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">Use this example to show a simple heading, paragraph, and a couple of CTA</p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-2xl items-start grid-cols-2 gap-4">
        <Button className="w-80 h-20" variant="outline">
          <div className="flex flex-row gap-4 items-center w-full">
            <Laugh />
            <p>Working towards diploma</p>
          </div>
        </Button>
        <Button className="w-80 h-20" variant="outline">
          <div className="flex flex-row gap-4 items-center w-full">
            <Laugh />
            <p>High School</p>
          </div>
        </Button>
        <Button className="w-80 h-20" variant="outline">
          <div className="flex flex-row gap-4 items-center w-full">
            <Laugh />
            <p>Associate Degree</p>
          </div>
        </Button>
        <Button className="w-80 h-20" variant="outline">
          <div className="flex flex-row gap-4 items-center w-full">
            <Laugh />
            <p>Bachelor&apos;s Degree</p>
          </div>
        </Button>
        <Button className="w-80 h-20" variant="outline">
          <div className="flex flex-row gap-4 items-center w-full">
            <Laugh />
            <p>Master&apos;s Degree</p>
          </div>
        </Button>
        <Button className="w-80 h-20" variant="outline">
          <div className="flex flex-row gap-4 items-center w-full">
            <Laugh />
            <p>Doctorate</p>
          </div>
        </Button>
        <Button className="w-80 h-20" variant="outline">
          <div className="flex flex-row gap-4 items-center w-full">
            <Laugh />
            <p>Certification</p>
          </div>
        </Button>
      </div>
    </main>
  )
}

export default Question3
