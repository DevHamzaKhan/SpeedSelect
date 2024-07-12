import { CircleCheckBig, Laugh, Sparkles } from "lucide-react"

const features = [
  {
    name: 'Quick and Easy Profile Setup.',
    description:
      'Fill out our job form in just 1 minute and get matched with the right opportunities instantly.',
    icon: CircleCheckBig,
  },
  {
    name: 'Real-Time Job Offers.',
    description: 'See which jobs you qualify for as soon as you complete your profile.',
    icon: Laugh,
  },
  {
    name: 'Stay Updated with New Opportunities.',
    description: 'Stay informed about new job postings tailored to your skills and preferences.',
    icon: Sparkles,
  },
]

const Section1 = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">Instant Matching, Immediate Results</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Find Your Perfect Job Fast!</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                At SpeedSelect, we know your time is valuable. Our platform is designed to get you hired quickly and efficiently.
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

export default Section1