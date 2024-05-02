"use client"
import { Folder } from '@prisma/client'
import { ChevronRight, FolderIcon } from 'lucide-react'
import Link from 'next/link'
import React, { lazy, Suspense, useEffect } from 'react'
import {useFlyoutStore} from "@/store/useCloseFlyout";
import { Button } from '../../../../components/ui/button'

type SidebarType = {
  category: Folder
}

const BookMarkList = lazy(() => import("@/app/(dashboard)/_components/bookmark-list/bookmark-list"))

const SidebarItem = ({ category }: SidebarType) => {
  const isOpen = useFlyoutStore((state) => state.isOpen)
  const [open, setOpen] = React.useState(false)

  // useEffect(() => {
  //   if (isOpen) {
  //     setOpen(false)
  //   }
  // } , [isOpen])

  const handleMouseOver = () => {
    setOpen(true)
  }

  const handleSubMenuOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleMouseOut = () => {
    setOpen(false)
  }

  return (
    <div className="relative"
      onMouseLeave={handleMouseOut}
    >
      <Link className="border flex justify-between" id={category.id} href={`/bookmark/${category.id}`}
      >
        <Button variant="outline" className="relative w-full h-8 p-0 rounded-none flex justify-between gap-2">
          <div className='flex gap-2'>
            <FolderIcon size={24} />
            {category.name}
          </div>
          <span
            onMouseOver={handleMouseOver}
            className="flex items-center">
            <ChevronRight size={24} />
          </span>
        </Button>
        {
          open &&
          <div
            onMouseOver={(e) => handleSubMenuOver(e)}
            className="flex w-full border absolute top-0 right-[-255px] bg-slate-100 z-index[10]">
            <Suspense fallback={<div>Loading...</div>}>
              <BookMarkList id={category.id} />
            </Suspense>
          </div>
        }
      </Link>
    </div>

  )
}

export default SidebarItem