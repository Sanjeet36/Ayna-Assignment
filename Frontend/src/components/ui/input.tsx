"use client"

import * as React from "react"
import { Eye, EyeOff } from 'lucide-react'

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const [ isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);

    return (
      <div className="flex flex-row items-center rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "> 
        <input
        // type={type}
        type={isPasswordVisible ? "text" : type}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}      
      />
      { type == "password" ? 
      (isPasswordVisible ? <Eye className="mr-2" onClick={() => setIsPasswordVisible(!isPasswordVisible)}/> : <EyeOff className="mr-2" onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>) : 
      <></>
      }
  
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
