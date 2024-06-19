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
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"

import { Url } from "@prisma/client"
import React, { useCallback, useState } from "react"
import { BookmarkCard } from "@/app/(dashboard)/_components/bookmark-card/bookmark-card"
import { useAddingBookmark } from "@/hooks/store/use-adding-bookmark"
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

  const [items, setItems] = useState(bookmarks)
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [activeItem, setActiveItem] = useState<Url | undefined>()
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id)
    setActiveItem(items.find((item) => item.id === event.active.id))
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = active.data.current?.sortable.index
        const newIndex = over?.data.current?.sortable.index
        const movedFrom = items[oldIndex]
        const movedTo = items[newIndex]
        movedFrom.index = newIndex
        movedTo.index = oldIndex
        return arrayMove(items, items.indexOf(newIndex), items.indexOf(oldIndex))
      })
    }

    setActiveId(null)
  }, []);
  
  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])
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
