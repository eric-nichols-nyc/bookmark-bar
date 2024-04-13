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
    <>

      <div>
        Bookmark Section
        {/* <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-4">
        {bookmarks?.map((bookmark: BookmarkData) => (
          <BookmarkCard key={bookmark._id} {...bookmark} />
        ))}
        </div> */}
      </div>
    </>
  )
}

export default BMSection
