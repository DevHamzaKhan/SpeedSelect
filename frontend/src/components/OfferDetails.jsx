import React, { useEffect, useRef } from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Calendar } from 'lucide-react'

const OfferDetails = ({ activeOffer, setActiveOffer }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActiveOffer(null);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left border-l">
            <div className="grid w-full max-w-6xl">
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {activeOffer.role}
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    {`${activeOffer.jobType} | ${activeOffer.remoteStatus} | ${activeOffer.city.name}, ${activeOffer.country.name}`}
                  </p>
                </div>

            <Separator />

            <div className="grid gap-2">
              <h1 className="text-xl">Minimum wage</h1>
              <p className="text-balance text-muted-foreground">
                {`$${activeOffer.salaryLow}.00`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Maximum wage</h1>
              <p className="text-balance text-muted-foreground">
                {`$${activeOffer.salaryHigh}.00`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Required companies</h1>
              <p className="text-balance text-muted-foreground">
                {`${activeOffer.workExperience.map(obj => obj.label).join(', ')}`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Required universities</h1>
              <p className="text-balance text-muted-foreground">
                {`${activeOffer.education.map(obj => obj.label).join(', ')}`}
                </p>
            </div>
            
            <div className="grid gap-2">
              <h1 className="text-xl">Required keywords</h1>
              <p className="text-balance text-muted-foreground">
                {`${activeOffer.keywords.map(obj => obj.label).join(', ')}`}
                </p>
            </div>

            <div className="grid gap-2">
              <h1 className="text-xl">Contact</h1>
              <p className="text-balance text-muted-foreground">
                {`${activeOffer.firstName} ${activeOffer.lastName} - ${activeOffer.email}`}
              </p>
            </div>

            <Button className='w-60'><Calendar className="mr-2 h-4 w-4" /> Schedule interview</Button>
          </div>
  )
}

export default OfferDetails