import { Button } from "./ui/button"

const FormFooter = ({ onNext, onBack, handleSubmit, isLast }) => {
  return (
    <header className="flex h-20 items-center justify-center gap-4 border-t bg-muted/40 px-4 lg:h-[120px] lg:px-6">
      <div className="flex w-full justify-between max-w-4xl">
        <Button variant='ghost' size='lg' onClick={onBack}>
          Back
        </Button>
        { !isLast ? (
          <Button size='lg' onClick={onNext}>
            Next
          </Button>
        ) : (
          <Button size='lg' onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </header>
  )
}

export default FormFooter
