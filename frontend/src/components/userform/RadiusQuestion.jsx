import React from 'react'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'

const RadiusQuestion = ({ formData, setFormData }) => {
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: Number(e.target.value) });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">9/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How far are you willing to travel?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          You will only be matched with positions that are within your radius of travel.
        </p>
      </div>

      <Separator />
      <div className="mx-auto grid w-full max-w-6xl items-start">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <div className="flex flex-row gap-2 justify-end items-center">
            <Input
              id="radius"
              type="number"
              defaultValue={formData.radius}
              onChange={handleChange}
            />
            <p className="text-balance text-muted-foreground">km</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RadiusQuestion