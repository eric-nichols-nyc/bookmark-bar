import { useQuery } from '@tanstack/react-query'
import { getBookmarksByFolderId } from '../actions/prisma/bookmarks/bookmark-actions'
export const useGetBookmarks = (id:string) => {
    return useQuery({
        queryFn: async () => getBookmarksByFolderId(id),
        queryKey: ["bookmarks", id],
      })
}

