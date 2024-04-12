"use client"

import { SearchIcon } from "lucide-react"
import React from "react"
import { Input } from "../ui/input"

export const Search = () => {
  return (
    <div className="relative flex items-end">
      <Input placeholder="search..."/>
      <SearchIcon size={24} className="absolute right-3 top-2"/>
    </div>
  )
}
