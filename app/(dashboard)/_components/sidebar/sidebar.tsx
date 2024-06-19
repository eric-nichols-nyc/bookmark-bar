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
  const groupedItems = folders.reduce((acc:any, item:Folder) => {
    const firstLetter = item.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});
  // console.log(groupedItems)
  return (
    <div className="w-[260px]">
      <div>
        {folders.map((fol: Folder) => (
          <SidebarItem key={fol.id} category={fol} />
        ))}
      </div>
    </div>
  )
}
