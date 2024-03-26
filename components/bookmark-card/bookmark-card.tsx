"use client"

import Image from "next/image"
import React from "react"
import { BookmarkData } from "@/types"
import BookmarkCardDropdown from "./bookmark-card-options"
import { Badge } from "../badge/badge"

export const BookmarkCard = ({ _id, url, title, description, image, tags }: BookmarkData) => {
  return (
    <div key={title} className="relative flex flex-col overflow-hidden border drop-shadow-md">
      <div className="relative mb-4 flex h-[120px] w-full">
        <a className="cursor-pointer hover:underline" href={url} rel="noreferrer" target="_blank">
          <Image
            src={image || "/images/placeholder.webp"}
            alt="Photo by Drew Beamer"
            fill
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </a>
      </div>
      <div className="px-3">
        <h3 className="mb-2 text-sm font-bold ">
          <a className="cursor-pointer hover:underline" href={url} rel="noreferrer" target="_blank">
            {title}
          </a>
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex flex-wrap gap-2 p-2">{tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
      </div>
      <div className="absolute right-2 top-2">
        <BookmarkCardDropdown _id={_id} />
      </div>
    </div>
  )
}
