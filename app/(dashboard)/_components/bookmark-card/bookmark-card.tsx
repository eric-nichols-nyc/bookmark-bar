"use client"

import { Url } from "@prisma/client"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { BookOpen } from "lucide-react"
import Image from "next/image"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import BookmarkCardDropdown from "./bookmark-card-options"

export const BookmarkCard = ({ id, url, title, icon, imageUrl, tags }: Url) => {
  return (
    <Card className="relative flex flex-1 flex-col overflow-hidden border drop-shadow-md">
      <CardHeader className="flex flex-row items-center justify-between p-1">
        {icon ? <Image src={icon} alt="icon" width={20} height={20} /> : <BookOpen />}
        <BookmarkCardDropdown _id={id} />
      </CardHeader>
      <CardContent className="relative mb-4 flex h-auto w-full overflow-hidden p-1">
        <a className="w-full cursor-pointer hover:underline" href={url} rel="noreferrer" target="_blank">
          <h1 className="text-lg font-bold">{title}</h1>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={imageUrl || "/images/placeholder.webp"}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </a>
      </CardContent>
      <CardFooter className="p1">
        <div className="flex flex-wrap gap-2 p-2">{tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
      </CardFooter>
    </Card>
  )
}
