import Image from "next/image"
import { getBookmarksByFolderId, getFolders, getTags } from "@/actions/prisma/folders/folder-actions"
import BMSection from "@/app/(dashboard)/_components/bookmark-section/bookmark-section"
import { BookmarkForm } from "@/components/bookmark-form/bookmark-form"
import { EditDrawer } from "@/components/bookmark-form/edit-form"
import ScrollToTop from "@/components/scroll-to-top"

const fetchBookmarks = async (id: string) => {
  console.log('id = ', id)
  try {
    const bookmarks = await getBookmarksByFolderId(id)
    console.log('bookmarks = ', bookmarks)
    return bookmarks
  } catch (e) {
    console.log("error with bookmarks", e)
  }
}

// get the current folder from the url param
const getFolderId = async(id:string) => {
  const folders = await getFolders()
  const folder = folders.find(folder => folder.id === id)
  return folder?.name || "No Folder"
}

// fetch current card item by id
const BookmarkPage = async (context: { params: { id: string } }) => {
  const id = context.params.id
  const urls = await fetchBookmarks(id)
  const folders = await getFolders()
  const folderName = await getFolderId(id)
  const tags = await getTags()
  
  return (
    <div id="test" className="container size-full flex flex-1 flex-col border bg-red-500">
        <BookmarkForm id={id} folders={folders} bookmarktags={tags} defaultValue={folderName}/>
      <div className="w-full flex container h-auto border border-blue-400 bg-slate-200 p-2 drop-shadow">
        <div className="flex gap-2">
          <Image src="/images/folder.svg" alt="logo" width={25} height={25}/>
         {folderName} ({urls?.length})
        </div>
      </div>
      <div className="flex w-full border py-2">
        <BMSection bookmarks={urls} />
      </div>
      <EditDrawer />
      <ScrollToTop />
    </div>
  )
}

export default BookmarkPage
