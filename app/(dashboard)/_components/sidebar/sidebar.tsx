import { auth } from "@clerk/nextjs"
import { Folder } from "@prisma/client"
import React from "react"
import { getFolders } from "@/actions/prisma/folders/folder-actions"
import { SortableList } from "@/components/drag-drop-list/sortable-list"
import SidebarItem from "./sidebarItem"

const Items = [
  { id: '1', index: 65536, content: 'Item 1' },
  { id: '2', index: 131072, content: 'Item 2' },
  { id: '3', index: 196608, content: 'Item 3' },
  { id: '4', index: 262144, content: 'Item 4' },
  { id: '5', index: 327680, content: 'Item 5' },
]
export const Sidebar = async () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("userId not found")
  }
  const folders = await getFolders()
  console.log(folders)
  return (
    <div className="w-[260px]">
      {/* <div>
        {folders.map((cat: Folder) => (
          <SidebarItem key={cat.id} category={cat} />
        ))}
      </div> */}
      <SortableList items={folders} />
    </div>
  )
}
