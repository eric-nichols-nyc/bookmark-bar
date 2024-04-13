import { Folder } from "@prisma/client"
import Link from "next/link"
import React from "react"

type HomeCardProps = {
  folder: Folder
}

export const HomeCard = ({ folder }: HomeCardProps) => {
  return (
    <Link href={`/bookmark/${folder.id}`} className="rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{folder.name}</h1>
        <div>
          <button className="text-red-500">Delete</button>
        </div>
      </div>
    </Link>
  )
}
