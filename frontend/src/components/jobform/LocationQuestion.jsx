import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react"
import Select from 'react-select'

const LocationQuestion = ({ formData, setFormData }) => {
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(formData.country?.isoCode));
  }, [formData.country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(formData.country?.isoCode, formData.state?.isoCode));
  }, [formData.state]);

  useEffect(() => {
    stateData && setFormData({...formData, state: stateData[0]});
  }, [stateData]);

  useEffect(() => {
    cityData && setFormData({...formData, city: cityData[0]});
  }, [cityData]);

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">4/9</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What city and country are you in?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          Providing the specific location can help candidates assess commuting or relocation needs.
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-6xl items-start">
        <div className="flex flex-col gap-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="country">Country</Label>
            <Select
              options={countryData}
              className="w-full"
              value={formData.country}
              onChange={(selectedOption) => {
                setFormData({...formData, country: selectedOption});
              }}
              getOptionLabel={(item) => item.name}
              getOptionValue={(item) => item.isoCode}
            />
          </div>
          {formData.state && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="state">State</Label>
              <Select
                options={stateData}
                className="w-full"
                value={formData.state}
                onChange={(selectedOption) => {
                  setFormData({...formData, state: selectedOption});
                }}
                getOptionLabel={(item) => item.name}
                getOptionValue={(item) => item.isoCode}
              />
            </div>
          )}
          {formData.city && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="city">City</Label>
              <Select
                options={cityData}
                className="w-full"
                value={formData.city}
                onChange={(selectedOption) => {
                  setFormData({...formData, city: selectedOption});
                }}
                getOptionLabel={(item) => item.name}
                getOptionValue={(item) => item.name}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default LocationQuestion