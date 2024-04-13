import Image from "next/image"
import { getBookmarksByCategory, getBookmarksByFolderId } from "@/actions/bookmarks/bookmark-actions"
import { getFolders } from "@/actions/folders/folder-actions"
import { EditDrawer } from "@/components/bookmark-form/edit-form"
import BMSection from "@/app/(dashboard)/_components/bookmark-section/bookmark-section"
const fetchBookmarks = async (id: string) => {
  try {
    const bookmarks = await getBookmarksByFolderId(id)
    return bookmarks
  } catch (e) {
    console.log("error with bookmarks", e)
  }
}

// fetch current card item by id
const BookmarkPage = async (context: { params: { id: string } }) => {
  const id = context.params.id[0]
  const urls = await fetchBookmarks(id)
  console.log(urls)

  return (
    <div className="w-full flex flex-col border">
      <div className="w-full flex container h-auto border border-blue-400 bg-slate-200 p-2 drop-shadow">
        <div className="flex gap-2">
          <Image src="/images/folder.svg" alt="logo" width={25} height={25}/>
         Folder Name ({urls?.length})
        </div>
      </div>
      <div className="flex w-full border py-2">
        <BMSection bookmarks={urls} />
      </div>
      {/* <EditDrawer /> */}
    </div>
  )
}

export default BookmarkPage
