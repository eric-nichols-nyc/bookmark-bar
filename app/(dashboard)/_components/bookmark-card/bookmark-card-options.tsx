"use client"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Pencil, Trash2, View } from "lucide-react"
import React from "react"
import { deleteBookmark } from "@/actions/prisma/folders/folder-actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDetailDrawer } from "@/hooks/store/use-detail-drawer"
import { useShowEditBookmarkForm } from "@/hooks/store/useShowEditBookmarkForm"

type BookmarkActionsProp ={
    _id: string | undefined,
}
export const BookmarkCardDropdown = ({_id}:BookmarkActionsProp) => {
  const { setToggle, setCurrentBookmarkId } = useShowEditBookmarkForm((state) => ({ setToggle: state.setToggle, setCurrentBookmarkId: state.setCurrentBookmarkId}))
  const { open } = useDetailDrawer()


  const handleDeleteBookmark = async (event:Event) => {
    event.preventDefault();
    event.stopPropagation();
    if(!_id) return console.error("No id")
    try {
      const res = await deleteBookmark(_id)
      if (res) {
        alert("Deleted")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditBookmark = () => {
    setCurrentBookmarkId(_id  as string)
    setToggle()
  }

  return (
    <DropdownMenu  data-testid="cardoptions">
      <DropdownMenuTrigger id="cardoptions">
        <div className="relative flex items-center justify-center ml-1 size-8 rounded-full border border-white bg-black">
          <DotsHorizontalIcon color="white" className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <DropdownMenuItem    
          onSelect={open}>
            <View  size={16}/>
            See details
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleEditBookmark}
        >
          <Pencil  size={16} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600"    
          onSelect={(e:Event) => {
            handleDeleteBookmark(e)
          }}>
            <Trash2 size={16}/>
            Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BookmarkCardDropdown
