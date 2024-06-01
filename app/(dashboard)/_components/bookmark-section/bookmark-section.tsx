"use client"
import { Url } from "@prisma/client"
import { DraggableGrid } from "@/components/drag-drop-grid/draggable-grid"

type BMSectionType = {
  bookmarks: Url[] | undefined
}


const BMSection = ({ bookmarks }: BMSectionType) => {
  if (bookmarks?.length === 0 || !bookmarks) {
    return (
      <div>
        <h1>No Bookmarks Found</h1>
      </div>
    )
  }
  return (
    <DraggableGrid bookmarks={bookmarks} />
  )
}

export default BMSection
