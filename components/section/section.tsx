"use client"

import { FolderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { getBookmarksByCategory } from "@/actions/mongoose/bookmarks/mongoose-actions"
import { BookmarkData, Category } from "@/types"
import { BookmarkCard } from "../../app/(dashboard)/_components/bookmark-card/bookmark-card"

type SectionProps = {
  category: Category
}

export const Section = ({category}:SectionProps) => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchItems() {
      const data = await getBookmarksByCategory(category.name)
     setItems(data)
    }

    if(open && items.length === 0) fetchItems()

  },[open, items, category.name])

  return (
    <div className="">
      <div onClick={() => setOpen(!open)}  className="flex gap-2 p-2 border cursor-pointer bg-slate-100 font-bold"><FolderIcon /><span>{category.name}</span></div>
      {open && (
        <div className="pb-2">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-4">
            {items.map((singleItem:BookmarkData) => (
             <BookmarkCard key={singleItem.title} {...singleItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
