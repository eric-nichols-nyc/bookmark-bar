"use client"

import { useEffect, useState } from "react"
import { getBookmarksByCategory } from "@/actions/bookmarks/bookmark-actions"
import { BookmarkData, Category } from "@/types"
import { BookmarkCard } from "../bookmark-card/bookmark-card"

type SectionProps = {
  category: Category
}

export const Section = ({category}:SectionProps) => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    console.log('items = ', items)
    async function fetchItems() {
      const data = await getBookmarksByCategory(category.category)
     setItems(data)
    }

    if(open && items.length === 0) fetchItems()

  },[open, items, category.category])

  return (
    <div className="">
      <div onClick={() => setOpen(!open)}  className="p-2 border cursor-pointer bg-slate-100 font-bold">{category.category}</div>
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
