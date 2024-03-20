"use client"

import { useState } from "react"
import { LP_GRID_ITEMS } from "@/lp-items"
import { BookmarkCard } from "../bookmark-card/bookmark-card"

export const Section = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      <div onClick={() => setOpen(!open)}  className="h-7 border cursor-pointer bg-slate-100">Title</div>
      {open && (
        <div>
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
            <BookmarkCard key={singleItem.title} {...singleItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
