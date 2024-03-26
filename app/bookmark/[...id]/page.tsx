import { getBookmarksByCategory } from "@/actions/bookmarks/bookmark-actions"
import { EditDrawer } from "@/components/bookmark-form/edit-form"
import BMSection from "@/components/bookmark-section/bookmark-section"

const fetchBookmarks = async (id: string) => {
  try {
    const bookmarks = await getBookmarksByCategory(id)
    return bookmarks
  } catch (e) {
    console.log("error with bookmarks")
  }
}


    // fetch current card item by id
const BookmarkPage = async (context: { params: { id: string } }) => {
  const id = context.params.id[0]
  const content = await fetchBookmarks(id)
  const { bookmarks, category } = content

  return (
    <>
      <div>
        <div className="container border">
          <div>{category}</div>
        </div>
        <BMSection bookmarks={bookmarks} />
        <EditDrawer />
      </div>
    </>
  )
}

export default BookmarkPage
