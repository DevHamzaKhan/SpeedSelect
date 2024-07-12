import { CircleCheckBig, Laugh, Sparkles } from "lucide-react"

const features = [
  {
    name: 'Quick Job Postings',
    description:
      'Fill out our job form in minutes and reach a vast pool of candidates.',
    icon: CircleCheckBig,
  },
  {
    name: 'Targeted Candidate Matching',
    description:
      'Our technology ensures your job listings are seen by the most relevant job seekers.',
    icon: Laugh,
  },
  {
    name: 'Efficient Hiring',
    description:
      'Start the hiring process quickly with immediate candidate responses.',
    icon: Laugh,
  },
  {
    name: 'Quality Candidates',
    description:
      'Access a diverse pool of qualified professionals ready to contribute to your team.',
    icon: Sparkles,
  },
]

export default function HiringSection() {
  return (
    <div className="bg-green-100 py-24 sm:py-32 mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">For Hiring Managers</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Post Jobs Quickly, Find Talent Fast
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Are you a hiring manager looking to fill positions quickly? JobMatch simplifies the process with:
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
