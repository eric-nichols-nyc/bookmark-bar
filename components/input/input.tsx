import React, { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full rounded-md border border-gray-300 p-2 transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"
