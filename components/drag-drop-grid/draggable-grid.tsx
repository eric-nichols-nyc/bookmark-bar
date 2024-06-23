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
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import { getBookmarksByFolderId, updateBookmark } from "@/actions/prisma/folders/folder-actions"
import { BookmarkCard } from "@/app/(dashboard)/_components/bookmark-card/bookmark-card"
import { useAddingBookmark } from "@/hooks/store/use-adding-bookmark"
import { useGetBookmarks } from "@/hooks/use-get-bookmarks"
import { calculatePosition } from "@/utils/position"
import { Skeleton } from "../ui/skeleton"

const BMSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-between space-x-4 py-2">
      <div className="w-full space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="mt-2 h-[170px] w-full rounded-sm" />
      </div>
    </div>
  )
}

type Bookmarks = {
  success: Url[]
}

async function fetchBookmarks(id: string): Promise<Bookmarks | undefined> {
  const bookmarks = await getBookmarksByFolderId(id)
  if (!bookmarks) return undefined
  return { success: bookmarks }
}

export const DraggableGrid = () => {
  const params = useParams()
  const queryClient = useQueryClient()

  const id = params.id
  const { data:bookmarks, error: urls_error, fetchStatus: urls_status } = useGetBookmarks(id as string)
  console.log(`DraggableGrid: ${bookmarks}`)
  const { isLoading } = useAddingBookmark((state) => ({ isLoading: state.isLoading }))

  // const [items, setItems] = useState<Url[]>(bookmarks)
  const [activeItem, setActiveItem] = useState<Url | undefined>()
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const bookmarkOptions = queryOptions({
    queryKey: ["bookmarks", id],
    queryFn: () => fetchBookmarks(id as string),
  })
  // useMutaion to udpate the bookmarks
  const updateBookmarkOrderMutation = useMutation({
    mutationFn: (bookmark: Url) => updateBookmark(bookmark.id, bookmark),
    // When mutate is called:
    onMutate: async (bookmark: Url) => {
      // Cancel any outgoing refetch
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(bookmarkOptions)

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(bookmarkOptions.queryKey)
      console.log("onMutate", previousTodos)
      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData(bookmarkOptions.queryKey, {
          ...previousTodos,
          success: previousTodos.success.map((item) => {
            if (item.id === bookmark.id) {
              return bookmark
            }
            return item
          }),
        })
      }

      return { previousTodos }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      console.log("onError", err)
      // if (context?.previousTodos) {
      //   queryClient.setQueryData<Todos>(['todos'], context.previousTodos)
      // }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(bookmarks?.success?.find((item) => item.id === event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id && activeItem) {
      if (!bookmarks?.success) return
      const bm = bookmarks?.success
      const newPosition = calculatePosition(over?.data.current?.sortable.index, bm, activeItem)
      console.log("new position", newPosition)
      //updateBookmark(activeItem.id, { ...activeItem, index: newPosition })
      updateBookmarkOrderMutation.mutate({ ...activeItem, index: newPosition })
    }

    setActiveItem(undefined)
  }

  const handleDragCancel = () => {
    setActiveItem(undefined)
  }

  if (urls_error) return <div>{urls_error.message}</div>
  if(!bookmarks) return <div>Loading...</div>

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={bookmarks?.success?.sort((a, b) => a.index - b.index)}>
        <div className="w-full justify-center space-y-8 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
          {!!isLoading && <BMSkeleton />}

          {bookmarks?.success?.map((bookmark: Url) => <BookmarkCard key={bookmark.id} {...bookmark} />)}
        </div>
      </SortableContext>
    </DndContext>
  )
}
