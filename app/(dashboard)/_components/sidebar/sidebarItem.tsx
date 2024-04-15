"use client"
import { Folder } from '@prisma/client'
import { ChevronRight, FolderIcon } from 'lucide-react'
import Link from 'next/link'
import React, { lazy, Suspense } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../../../../components/ui/button'

type SidebarType = {
  category: Folder
}

const BookMarkList = lazy(() => import("@/app/(dashboard)/_components/bookmark-list/bookmark-list"))

const SidebarItem = ({ category }: SidebarType) => {
  const [open, setOpen] = React.useState(false)

  const handleMouseOver = () => {
    setOpen(true)
  }

  const handleMouseOut = () => {
    setOpen(false)
  }

  return (
    <Link className="flex justify-between" id={category.id} href={`/bookmark/${category.id}/${category.name}`}>
      <Button variant="outline" className="w-full h-8 rounded-none flex justify-start gap-2"><FolderIcon size={16} />{category.name}</Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        ><ChevronRight /></PopoverTrigger>
        <PopoverContent side='right'>
          {
            open && <Suspense fallback={<div>Loading...</div>}>
              <BookMarkList id={category.id} />
            </Suspense>
          }

        </PopoverContent>
      </Popover>
    </Link>
  )
}

export default SidebarItem