"use client"

import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import type { Active, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Folder } from "@prisma/client"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import { updateFolder } from "@/actions/prisma/folders/folder-actions"
import { calculatePosition } from "@/utils/position"
import { SortableListItem } from "./sortable-list-item"

type ListProps = {
  items: Folder[]
}

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between bg-gray-200 px-1 py-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-400 rounded"></div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-200 px-1 py-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-400 rounded"></div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-200 px-1 py-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export const SortableList = ({ items }: ListProps) => {
  const [active, setActive] = useState<Active | null>(null)
  const [activeItem, setActiveItem] = useState<Folder | undefined>()
  const [orderedItems, setOrderedItems] = useState<Folder[]>(items)

  useEffect(() => {
    setOrderedItems(items)
  }, [items])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: { active: Active }) => {
    console.log("drag started")

    setActiveItem(items.find((item) => item.id === event.active.id))
  }

  const handleUpateToDB = async (item: Folder) => {
    try {
      const bm = await updateFolder(item.id, { index: item.index })
      console.log("bookmark updated", bm)
      console.log(bm)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const copy = [...orderedItems]
      const newIndex = over?.data.current?.sortable.index
      if (!activeItem) return
      // get new index of the item
      const moved = copy.find((item: Folder) => item.id === activeItem.id)
      if (!moved) return

      const newPos = calculatePosition(newIndex, orderedItems, moved!)
      moved.index = newPos
      // update the index of the moved item
      handleUpateToDB(moved)
    }
  }

  const handleDragCancel = () => {
    console.log("drag cancelled")
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={orderedItems.sort((a, b) => a.index - b.index)} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-1">
          {orderedItems.map((item) => (
            <SortableListItem key={item.id} id={item.id}>
              <Link href={`/bookmarks/${item.id}`}>{item.name}</Link>
            </SortableListItem>
          ))}
        </ul>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeItem && (
          <SortableListItem key={activeItem.id} id={activeItem.id}>
            {activeItem.name}
          </SortableListItem>
        )}
      </DragOverlay>
    </DndContext>
  )
}
