import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import React from "react"
import { deleteBookmark } from "@/actions/bookmarks/bookmark-actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useShowEditBookmarkForm } from "@/store/useShowEditBookmarkForm"
import { Button } from "../button/button"

type BookmarkActionsProp ={
    _id: string | undefined,
}
export const BookmarkCardDropdown = ({_id}:BookmarkActionsProp) => {
  const { setToggle } = useShowEditBookmarkForm((state) => ({ setToggle: state.setToggle }))


  const handleDeleteBookmark = async (id: string | undefined) => {
    if(!id) return console.error("No id")
    try {
      const res = await deleteBookmark(id)
      if (res.success) {
        alert("Deleted")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary" className="relative ml-1 size-9 rounded-full border border-white bg-black">
          <DotsHorizontalIcon color="white" className="absolute top-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() => {
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
