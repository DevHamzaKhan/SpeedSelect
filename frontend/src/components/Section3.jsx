import { CircleCheckBig, Laugh, Sparkles } from "lucide-react"

const features = [
  {
    name: 'Complete Your Job Profile in 1 Minute.',
    description:
      'Fill out our quick and easy form, and instantly see which jobs you qualify for.',
    icon: CircleCheckBig,
  },
  {
    name: 'Receive Instant Job Matches.',
    description: 'Get immediate job offers tailored to your skills and preferences.',
    icon: Laugh,
  },
  {
    name: 'Stay Updated with New Opportunities.',
    description: 'As new jobs are posted, you\'ll be the first to know, ensuring you never miss out on the perfect opportunity.',
    icon: Sparkles,
  },
]

const Section3 = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better way to find jobs</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Tired of endlessly scrolling through job listings? With SpeedSelect, finding the right job is as easy as 1-2-3!
              </p>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}

export default Section3