import { auth } from "@clerk/nextjs"
import { Folder } from "@prisma/client"
import React from "react"
import { getFolders } from "@/actions/prisma/folders/folder-actions"
import SidebarItem from "./sidebarItem"
import AuthDropdown from "../auth-dropdown"
export const Sidebar = async () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("userId not found")
  }
  const folders = await getFolders()
  return (
    <div className="w-[260px] z-index[10]">
      <div className="w-full">
       <AuthDropdown />
      </div>
      <div>
        {folders.map((cat: Folder) => (
          <SidebarItem key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  )
}