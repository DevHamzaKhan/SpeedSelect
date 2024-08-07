import { Blend, Building, Frown, Laugh, Smile, Wifi } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const RemoteQuestion = ({ formData, setFormData }) => {

  const options = [
    { name: 'Remote', icon: <Wifi /> },
    { name: 'Hybrid', icon: <Blend /> },
    { name: 'In-person', icon: <Building /> },
  ];

  const handleClick = (option) => {
    setFormData(prev => {
      const remoteStatuses = prev.remoteStatus.includes(option.name) 
        ? prev.remoteStatus.filter(remoteStatus => remoteStatus !== option.name)
        : [...prev.remoteStatus, option.name];
      return {...prev, remoteStatus: remoteStatuses};
    });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-left">
      <div className="mx-auto grid w-full max-w-6xl">
        <p className="text-base font-semibold leading-7 text-primary">3/10</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Where are you willing to work?</h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          You won&apos;t be matched with opportunities that don&apos;t align with your preferences.  
        </p>
      </div>

      <Separator />

      <div className="mx-auto grid w-full max-w-2xl items-start grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button 
            key={index} 
            className={`w-80 h-20 ${formData.remoteStatus.includes(option.name) ? 'border-2 border-b-4 border-primary text-primary' : ''}`} 
            variant="outline"
            onClick={() => handleClick(option)}
          >
            <div className="flex flex-row gap-4 items-center w-full">
              {option.icon}
              <p>{option.name}</p>
            </div>
          </Button>
        ))}
      </div>
    </main>
  )
}

export default RemoteQuestion
