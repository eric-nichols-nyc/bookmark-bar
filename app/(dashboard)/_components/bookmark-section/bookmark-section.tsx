"use client"
import { useParams } from 'next/navigation'
import { DraggableGrid } from "@/components/drag-drop-grid/draggable-grid"
import { useGetBookmarks } from "@/hooks/use-get-bookmarks"

const BMSection = () => {
  const params = useParams();
  console.log(params.id)
  const id = params.id
  const {data:bookmarks, error: urls_error, fetchStatus:urls_status } = useGetBookmarks(id as string)
  if (bookmarks?.success?.length === 0 || bookmarks?.error) {
    return (
      <div>
        <h1>No Bookmarks Found</h1>
      </div>
    )
  }
  return (
    <DraggableGrid />
  )
}

export default BMSection
