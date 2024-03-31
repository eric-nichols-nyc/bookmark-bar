import { Folder } from "lucide-react"
import Image from "next/image"
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
    <div>
      <div className="container h-auto border bg-slate-200 p-2 drop-shadow">
        <div className="flex gap-2">
          <Image src="/images/folder.svg" alt="logo" width={25} height={25}/>
          {category} ({bookmarks.length})
        </div>
      </div>
      <div className="py-2">
        <BMSection bookmarks={bookmarks} />
      </div>
      <EditDrawer />
    </div>
  )
}

export default BookmarkPage
