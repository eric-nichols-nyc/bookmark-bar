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
    <div onClick={()=> setToggle(true)}key={title} className="flex flex-col cursor-pointer drop-shadow-md border">
      <div className="relative flex h-[120px] w-full mb-4">
      <Image
            src={image || "/images/placeholder.webp"}
            alt="Photo by Drew Beamer"
            fill
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
      </div>
      <h3 className="mb-2 text-sm font-bold ">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}
