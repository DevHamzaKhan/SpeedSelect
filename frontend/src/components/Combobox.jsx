
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
import { FormControl } from "./ui/form"
import { cn } from "@/lib/utils"

export function ComboBoxResponsive({ form, field }) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState(
    null
  )

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant="outline"
              className={cn(
                "w-full justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? <>{field.value}</> : <>Select country</>}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} form={form} />
        </PopoverContent>
      </Popover>
    )
}

function StatusList({
  setOpen,
  setSelectedStatus,
  form
}) {

  const options = React.useMemo(() => countryList().getData(), [])
  
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((country) => (
            <CommandItem
              key={country.value}
              value={country.value}
              onSelect={() => {
                form.setValue("country", country.label);
                setOpen(false)
              }}
            >
              {country.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
