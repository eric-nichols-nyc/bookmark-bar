import { getBookmarksByCategory } from "@/actions/bookmarks/bookmark-actions"
import BMSection from "@/components/bookmark-section/bookmark-section"

const fetchBookmarks = async (id: string) => {
  try {
    const bookmarks = await getBookmarksByCategory(id)
    return bookmarks
  } catch (e) {
    console.log("error with bookmarks")
  }
}
const BookmarkPage = async (context: { params: { id: string } }) => {
  const id = context.params.id[0]
  const content = await fetchBookmarks(id)
  const { bookmarks, category } = content

  return (
    <>
      <div>
        <h1>{category}</h1>
        <BMSection bookmarks={bookmarks} />
      </div>
    </>
  )
}

export default BookmarkPage
