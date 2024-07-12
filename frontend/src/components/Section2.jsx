import { CircleCheckBig, Laugh, Sparkles } from "lucide-react"

const features = [
  {
    name: 'Speed.',
    description:
      'Our fast and efficient process means you spend less time searching and more time applying.',
    icon: CircleCheckBig,
  },
  {
    name: 'Ease of Use.',
    description: 'With intuitive navigation and a simple interface, finding your dream job has never been easier.',
    icon: Laugh,
  },
  {
    name: 'Accuracy.',
    description: 'Our advanced algorithms ensure that the jobs you see are tailored to your skills and preferences.',
    icon: Sparkles,
  },
]

const Section2 = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="relative">
            <img
              alt="Product screenshot"
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              width={2432}
              height={1442}
              className="absolute right-8 w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
          <div className="lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">Efficiency Meets Simplicity</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose SpeedSelect?</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                SpeedSelect is a revolution in the job market that prioritizes your time and needs. It’s designed to be the easiest and most efficient way to find your next job.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-primary" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section2