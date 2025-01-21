import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { X } from 'lucide-react'
import { useEffect } from "react"

type variantTypes = 'default' | 'destructive' | null | undefined 

interface CustomAlertProps {
  title: string,
  description: string,
  variant?: variantTypes,
  setErrorOrSuccess: (arg: boolean) => void
}

function CustomAlert( { title, description, setErrorOrSuccess, variant = 'default'}: CustomAlertProps) {

  useEffect(() => {
    setTimeout(() => {
      setErrorOrSuccess(false)
    }, 3000)
  }, [])
  return (
    <Alert variant={variant} className="absolute bottom-4 right-4 md:w-[25%] w-[50%]">
        <div className='flex flex-row justify-between'>
           <AlertTitle>{title}</AlertTitle>
           <X className='hover:cursor-pointer' onClick={() => {
            setErrorOrSuccess(false)
           }} />
           </div>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
  )
}

export default CustomAlert