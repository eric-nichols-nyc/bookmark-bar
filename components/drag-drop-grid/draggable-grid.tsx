"use client"
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"

import { Url } from "@prisma/client"
import React, { useState } from "react"
import { updateBookmark } from "@/actions/prisma/folders/folder-actions"
import { BookmarkCard } from "@/app/(dashboard)/_components/bookmark-card/bookmark-card"
import { useAddingBookmark } from "@/hooks/store/use-adding-bookmark"
import { calculatePosition } from "@/utils/position"
import { Skeleton } from "../ui/skeleton"
const BMSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-between space-x-4 py-2">
      <div className="w-full space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="w-full h-[170px] mt-2 rounded-sm" />
      </div>
    </div>
  )
}

type DraggableGridProps = {
  bookmarks: Url[]
}

export const DraggableGrid = ({ bookmarks }: DraggableGridProps) => {
  const { isLoading } = useAddingBookmark((state) => ({ isLoading: state.isLoading }))

  // const [items, setItems] = useState<Url[]>(bookmarks)
  const [activeItem, setActiveItem] = useState<Url | undefined>()
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(bookmarks.find((item) => item.id === event.active.id))
  }

  const handleDragEnd =(event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id && activeItem) {
      const newPosition = calculatePosition(over?.data.current?.sortable.index, bookmarks, activeItem)
      console.log("new position", newPosition)  
      updateBookmark(activeItem.id, { ...activeItem, index: newPosition })
    }

    setActiveItem(undefined)
  };
  
  const handleDragCancel = () => {
    setActiveItem(undefined)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={bookmarks.sort((a, b) => a.index - b.index)} strategy={horizontalListSortingStrategy}>
        <div
        className="w-full justify-center space-y-8 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
          {!!isLoading && <BMSkeleton />}

          {bookmarks?.map((bookmark: Url) => <BookmarkCard key={bookmark.id} {...bookmark} />)}
        </div>
      </SortableContext>
    </DndContext>
  )
}
