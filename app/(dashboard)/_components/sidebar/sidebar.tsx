import { auth } from "@clerk/nextjs/server"
import { Folder } from "@prisma/client"
import React from "react"
import { getFolders } from "@/actions/prisma/folders/folder-actions"
import SidebarItem from "./sidebarItem"


export const Sidebar = async () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("userId not found")
  }
  const folders = await getFolders()
  console.log(folders)
  return (
    <div className="w-[260px]">
      <div>
        {folders.map((cat: Folder) => (
          <SidebarItem key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  )
}
