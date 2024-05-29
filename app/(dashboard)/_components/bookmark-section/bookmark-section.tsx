"use client"
import { Url } from "@prisma/client"
import { Skeleton } from "@/components/ui/skeleton"
import { useAddingBookmark } from "@/hooks/store/use-adding-bookmark"
import { BookmarkCard } from "../bookmark-card/bookmark-card"

type BMSectionType = {
  bookmarks: Url[] | undefined
}

const BMSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-between space-x-4 py-2">
      <div className="w-[300px] space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="w-[300px] h-[170px] mt-2 rounded-sm" />
      </div>
    </div>
  )
}
const BMSection = ({ bookmarks }: BMSectionType) => {
  const { isLoading } = useAddingBookmark((state) => ({ isLoading: state.isLoading }))

  if (bookmarks?.length === 0 || !bookmarks) {
    return (
      <div>
        <h1>No Bookmarks Found</h1>
      </div>
    )
  }
  return (
    <div className="w-full justify-center space-y-8 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
      {!!isLoading && <BMSkeleton />}
      {bookmarks?.map((bookmark: Url) => <BookmarkCard key={bookmark.id} {...bookmark} />)}
    </div>
  )
}

export default BMSection
