import { Url } from "@prisma/client"
import { BookmarkCard } from "../bookmark-card/bookmark-card"

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
        <div className="w-full justify-center space-y-8 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
        {bookmarks?.map((bookmark: Url) => (
          <BookmarkCard key={bookmark.id} {...bookmark} />
        ))}
        </div>
  )
}

export default BMSection
