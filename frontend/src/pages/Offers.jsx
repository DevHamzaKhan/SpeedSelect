import Navbar from '@/components/Navbar'
import OffersSidebar from '@/components/OffersSidebar'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Offers = () => {
  return (
    <>
      <Navbar />
      <div className="grid h-calc-4 w-full md:grid-cols-[220px_1fr_320px] lg:grid-cols-[280px_1fr_380px]">
        <OffersSidebar />
        <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
              <div className="mx-auto grid w-full max-w-6xl">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Your offers
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Based on your profile, offers you receive from hiring managers will show up here.
                </p>
              </div>

              <Separator />
        </main>
      </div>
    </>
  )
}

export default Offers