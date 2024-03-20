import Image from "next/image"
import React from "react"
import { useToggleForm } from "@/store/useToggleForm"
import { BookmarkData } from "@/types"

type BookmarkCardProps = {
  title: string
  description: string
  icon: React.ReactNode,
  image:string,
  url:string
}

export const BookmarkCard = ({ url, title, description, image, tags }: BookmarkData) => {
const {setToggle} = useToggleForm((state) => ({setToggle: state.setToggle} ));

  return (
    <div onClick={()=> setToggle(true)}key={title} className="flex flex-col items-center justify-center text-center cursor-pointer drop-shadow-md border p-2">
      <div className="mb-4 flex size-10 items-center justify-center rounded-full p-1.5 text-blue-700 bg-primary-900 lg:size-12">
      <Image
            src={image || "/images/placeholder.webp"}
            alt="Photo by Drew Beamer"
            fill
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
      </div>
      <h3 className="mb-2 text-xl font-bold ">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
