
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import countryList from 'react-select-country-list'

export function CountrySelect({ formData, setFormData }) {
  const [open, setOpen] = React.useState(false)
  const setSelectedStatus = (e) => {
    setFormData({ ...formData, country: e });
  };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {formData.country ? <>{formData.country}</> : <>Select country</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}) {

  const options = React.useMemo(() => countryList().getData(), [])
  
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((status) => (
            <CommandItem
              key={status.value}
              value={status.label}
              onSelect={(value) => {
                setSelectedStatus(value)
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
