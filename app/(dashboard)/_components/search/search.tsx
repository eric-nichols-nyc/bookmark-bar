import { getBookmarks } from "@/actions/prisma/folders/folder-actions"
import { SearchResults } from "./SearchResults"

export const Search = async() => {
  const bookmarks = await getBookmarks()
  return (
    <>
      <SearchResults bookmarks={bookmarks}/>
    </>
  )
}
