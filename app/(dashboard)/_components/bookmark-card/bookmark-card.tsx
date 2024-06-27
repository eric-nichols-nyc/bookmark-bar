"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { ExternalLink, FileIcon, GripHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useDetailDrawer } from "@/hooks/store/use-detail-drawer"
import BookmarkCardDropdown from "./bookmark-card-options"

type BookmarkCardType = {
  id: string
  index: number
  url: string
  title?: string | null
  icon?: string | null
  imageUrl?: string | null
  tags?: string[]
  isDragging?: boolean
}

export const BookmarkCard = ({ id, index, url, title, icon, imageUrl, tags }: BookmarkCardType) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  // const { open } = useDetailDrawer()
  return (
    <div style={style} ref={setNodeRef} className="relative flex">
      <Card className="relative flex flex-1 flex-col overflow-hidden bg-slate-200 px-2 drop-shadow-md">
        <Button variant="ghost" size="sm" {...attributes} {...listeners}>
          <GripHorizontal size={16} />
        </Button>
        <CardHeader className="flex flex-row items-center justify-between p-1">
          {icon ? <Image src={icon} alt="icon" width={20} height={20} /> : <FileIcon />}
          <div className="flex justify-end">
            <Link className="cursor-pointer hover:underline" href={url} rel="noreferrer" target="_blank">
              <Button variant="ghost" size="sm">
                <span className="text-md font-bold">Read post</span><ExternalLink />
              </Button>
            </Link>
          </div>
          <BookmarkCardDropdown _id={id} />
        </CardHeader>
        <CardContent
          // onClick={open}
          className="relative flex h-auto w-full flex-1 flex-col justify-between overflow-hidden p-1"
        >
          <p className="text-xs">{index}</p>
          <h1 className="mb-2 text-lg font-bold leading-snug">{title}</h1>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={imageUrl || "/images/placeholder.webp"}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
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
