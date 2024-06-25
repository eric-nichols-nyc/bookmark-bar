"use client"
import { Folder } from "@prisma/client"
import React, { useEffect, useState } from "react"
import { HomeCard } from "../_components/home-card"

type GroupedFoldersProps = {
  folders: Folder[] | undefined
}

const GroupedFolders = ({ folders }: GroupedFoldersProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if(!folders) return
      setFilteredFolders(folders.filter((folder: Folder) => folder.name.toLowerCase().includes(search.toLowerCase())))
    }, 500)
    return () => clearTimeout(timer)
  }, [search])


  const groupedFolders = filteredFolders.reduce((acc: any, item: Folder) => {
    const firstLetter = item.name[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(item)
    return acc
  }, {})

  const handleOnSearch = (s: string) => {
    console.log(s)
    setSearch(s)
  }

  return (
    <div>
      <nav className="sticky top-0 z-50 overflow-x-auto bg-gray-800 py-2">
        <ul className="flex justify-around">
          {Object.keys(groupedFolders).map((letter) => (
            <li key={letter}>
              <a href={`#${letter}`} className="rounded p-2 text-white hover:bg-gray-700">
                {letter}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {Object.keys(groupedFolders).map((letter) => (
        <div key={letter}>
          <div id={letter} className="w-full bg-slate-400 p-2 font-bold text-white">
            {letter}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 my-3">
            {groupedFolders[letter].map((folder: Folder) => (
              <HomeCard key={folder.id} folder={folder} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GroupedFolders
