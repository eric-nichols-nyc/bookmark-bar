import { Folder } from "@prisma/client"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getBookmarksByFolderId } from "@/actions/prisma/bookmarks/bookmark-actions"
import { getFolders } from "@/actions/prisma/folders/folder-actions"

import BMSection from "@/app/(dashboard)/_components/bookmark-section/bookmark-section"
import { BookmarkForm } from "@/components/bookmark-form/bookmark-form"
import { EditSheet } from "@/components/bookmark-form/edit-form"
import ScrollToTop from "@/components/scroll-to-top"
import { DetailDrawer } from "../../_components/detail-sheet"

// fetch current card item by id
const BookmarkPage = async (context: { params: { id: string } }) => {
  const id = context.params.id as string
  
  const queryClient = new QueryClient()

  const folders = await queryClient.fetchQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  })

  const bookmarks = await queryClient.fetchQuery({
    queryKey: ["bookmarks", id],
    queryFn: () => getBookmarksByFolderId(id),
  })

  const getFolderId = async (id: string) => {
    const folder = folders?.success?.find((f: Folder) => f.id === id)
    return folder?.name || "No Folder"
  }
  const folderName = await getFolderId(id)

  //const tags = await getTags()

  return (
    <div id="test" className="container flex size-full flex-1 flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookmarkForm id={id} defaultValue={folderName} />
        <div className="container flex h-auto w-full bg-slate-200 p-2 drop-shadow">
          <div className="flex gap-2">
            {folderName} ({bookmarks?.success?.length})
          </div>
        </div>
        <div className="flex w-full py-2">
          <BMSection />
        </div>
        {/* <EditSheet /> */}
        <DetailDrawer id={id} />
      </HydrationBoundary>
      <ScrollToTop />
    </div>
  )
}

export default BookmarkPage
