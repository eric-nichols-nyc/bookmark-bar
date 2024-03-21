import Image from "next/image"
import React from "react"
import { useToggleForm } from "@/store/useToggleForm"
import { BookmarkData } from "@/types"

export const BookmarkCard = ({ url, title, description, image, tags }: BookmarkData) => {
  const { setToggle } = useToggleForm((state) => ({ setToggle: state.setToggle }))

  return (
    <div onClick={() => setToggle(true)} key={title} className="flex cursor-pointer flex-col border drop-shadow-md">
      <div className="relative mb-4 flex h-[120px] w-full">
        <Image
          src={image || "/images/placeholder.webp"}
          alt="Photo by Drew Beamer"
          fill
          objectFit="contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="mb-2 text-sm font-bold ">
        <a href={url} rel="noreferrer" target="_blank">
          {title}
        </a>
      </h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="flex flex-wrap gap-1 p-2">
        {tags?.map((tag) => (
          <span key={tag} className="rounded-md bg-gray-100 p-1 text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
