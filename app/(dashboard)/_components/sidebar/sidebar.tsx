"use client"
import { auth } from "@clerk/nextjs/server"
import { Folder } from "@prisma/client"
import React from "react"
import { useGetFolders } from "@/hooks/use-get-folders"
import SidebarItem from "./sidebarItem"


export const Sidebar = () => {
  const {data,error, fetchStatus} = useGetFolders()

  const folders = data?.success;

  const groupedItems = folders?.reduce((acc:any, item:Folder) => {
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
        {folders?.map((fol: Folder) => (
          <SidebarItem key={fol.id} category={fol} />
        ))}
      </div>
    </div>
  )
}
