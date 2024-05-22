"use client"

import { Url } from "@prisma/client"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { FileIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useDetailDrawer } from "@/hooks/store/use-detail-drawer"
import BookmarkCardDropdown from "./bookmark-card-options"

export const BookmarkCard = ({ id, url, title, description, icon, imageUrl, tags }: Url) => {
  const { open } = useDetailDrawer()
  return (
    <div className="flex relative">
      <Card
        className="relative flex flex-1 cursor-pointer flex-col overflow-hidden drop-shadow-md px-2"
      >
        <CardHeader className="flex flex-row items-center justify-between p-1">
          {icon ? <Image src={icon} alt="icon" width={20} height={20} /> : <FileIcon />}
            <Link className="w-full cursor-pointer hover:underline" href={url} rel="noreferrer" target="_blank">
              <Button variant="ghost" className="w-full">
                View Post
              </Button>
            </Link>
          <BookmarkCardDropdown _id={id} />
        </CardHeader>
        <CardContent         
          onClick={open}
          className="relative mb-4 flex flex-1 h-auto w-full flex-col overflow-hidden p-1 justify-between">
          <h1 className="text-lg font-bold leading-snug mb-2">{title}</h1>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={imageUrl || "/images/placeholder.webp"}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
          {/* <p className="text-sm">{description}</p> */}
        </CardContent>
        {tags && tags.length > 0 && (
          <CardFooter className="p1">
            <div className="flex flex-wrap gap-2 p-2">{tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

