import { useQuery } from '@tanstack/react-query'
import {getFolders} from '../actions/prisma/folders/folder-actions'
export const useGetFolders = () => {
    return useQuery({
        queryFn: async () => getFolders(),
        queryKey: ["folders"],
      })
}

