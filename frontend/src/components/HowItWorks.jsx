import { CircleUserRound } from "lucide-react"
import BentoGrid from "./BentoGrid"


const HowItWorks = () => {
  return (
    <section className="bg-green-100 dark:bg-gray-900 py-8">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="flex flex-row gap-14 mb-4">
            <div className="ml-4 flex flex-col items-center w-10 lg:w-12">
              <div className="w-[3px] h-80 rounded-md bg-gradient-to-b from-green-100 via-green-200 to-green-200" />
            </div>
            <div className="max-w-screen-md">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Tired of scrolling through job listings? 
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                With SpeedSelect, finding your next job is as easy as 1-2-3!
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-14">
            <div className="ml-4 flex flex-col items-center">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-200 lg:h-12 lg:w-12 dark:bg-primary-900">
                <CircleUserRound className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"/>
              </div>
              <div className="w-[3px] h-40 rounded-md bg-gradient-to-b from-green-200 via-green-200 to-green-100" />
            </div>
            <div className="max-w-screen-md text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white"><span className="font-extrabold">1. </span>Create Your Profile</h2>
                <p className="mb-4 font-light">
                  Create an account and fill out our quick job form. It takes just 1 minute to complete and gives us the information we need to match you with the best opportunities.
                </p>
            </div>
          </div>
          <div className="relative">
            <img
              alt="Product screenshot"
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              width={2432}
              height={1442}
              className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0"
            />
            <img
              alt="Product screenshot"
              src="https://tailwindui.com/img/component-images/mobile-app-screenshot.png"
              className="absolute -bottom-20 right-16 h-[600px] w-[500px] rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0"
            />
          </div>
          <div className="mb-4 ml-4 flex flex-col items-center w-10 lg:w-12">
            <div className="w-[3px] h-40 rounded-md bg-gradient-to-b from-green-200 via-green-200 to-green-200" />
          </div>
          <div className="flex flex-row gap-14">
            <div className="ml-4 flex flex-col items-center">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-200 lg:h-12 lg:w-12 dark:bg-primary-900">
                <CircleUserRound className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"/>
              </div>
              <div className="w-[3px] h-40 rounded-md bg-gradient-to-b from-green-200 via-green-200 to-green-100" />
            </div>
            <div className="max-w-screen-md text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white"><span className="font-extrabold">2. </span>Receive Tailored Job Matches</h2>
                <p className="mb-4 font-light">
                  Once your profile is complete, our system will instantly match you with job opportunities that fit your skills and preferences. See immediate results and explore your options.
                </p>
            </div>
          </div>
          <BentoGrid />
          <div className="mb-4 ml-4 flex flex-col items-center w-10 lg:w-12">
            <div className="w-[3px] h-[6rem] rounded-md bg-gradient-to-b from-green-200 via-green-200 to-green-200" />
          </div>
          <div className="flex flex-row gap-14">
            <div className="ml-4 flex flex-col items-center">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-200 lg:h-12 lg:w-12 dark:bg-primary-900">
                <CircleUserRound className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"/>
              </div>
              <div className="w-[3px] h-40 rounded-md bg-gradient-to-b from-green-200 via-green-200 to-green-100" />
            </div>
            <div className="max-w-screen-md text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white"><span className="font-extrabold">3. </span>Continuous Job Notifications</h2>
                <p className="mb-4 font-light">
                  As new jobs are added, you&apos;ll receive notifications for roles that match your profile. Stay ahead of the curve and never miss out on the perfect opportunity.
                </p>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0"
          />
      </div>
    </section>
  )
}

export default HowItWorks