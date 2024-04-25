"use client"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import React from "react"
import { deleteBookmark } from "@/actions/prisma/folders/folder-actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useShowEditBookmarkForm } from "@/store/useShowEditBookmarkForm"

type BookmarkActionsProp ={
    _id: string | undefined,
}
export const BookmarkCardDropdown = ({_id}:BookmarkActionsProp) => {
  const { setToggle, setCurrentBookmarkId } = useShowEditBookmarkForm((state) => ({ setToggle: state.setToggle, setCurrentBookmarkId: state.setCurrentBookmarkId}))


  const handleDeleteBookmark = async (id: string | undefined) => {
    if(!id) return console.error("No id")
    try {
      const res = await deleteBookmark(id)
      if (res) {
        alert("Deleted")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DropdownMenu  data-testid="cardoptions">
      <DropdownMenuTrigger id="cardoptions">
        <div className="relative flex items-center justify-center ml-1 size-9 rounded-full border border-white bg-black">
          <DotsHorizontalIcon color="white" className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() => {
            setCurrentBookmarkId(_id  as string)
            setToggle(true)
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600"    
          onSelect={() => {
            handleDeleteBookmark(_id)
          }}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BookmarkCardDropdown
