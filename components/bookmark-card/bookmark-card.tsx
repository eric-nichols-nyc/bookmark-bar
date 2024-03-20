import React from "react"
import { useToggleForm } from "@/store/useToggleForm"

type BookmarkCardProps = {
  title: string
  description: string
  icon: React.ReactNode
}

export const BookmarkCard = ({ title, description, icon }: BookmarkCardProps) => {
const {setToggle} = useToggleForm((state) => ({setToggle: state.setToggle} ));

  return (
    <div onClick={()=> setToggle(true)}key={title} className="flex flex-col items-center justify-center text-center cursor-pointer">
      <div className="mb-4 flex size-10 items-center justify-center rounded-full p-1.5 text-blue-700 bg-primary-900 lg:size-12">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold ">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
