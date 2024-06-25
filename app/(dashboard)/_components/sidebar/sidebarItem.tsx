"use client"
import { Folder } from '@prisma/client'
import { ChevronRight, FolderIcon } from 'lucide-react'
import Link from 'next/link'
import React, { lazy, Suspense } from 'react'
import {useFlyoutStore} from "@/hooks/store/useFlyoutStore";
import { Button } from '../../../../components/ui/button'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

type SidebarType = {
  category: Folder
}

const BookMarkList = lazy(() => import("@/app/(dashboard)/_components/bookmark-list/bookmark-list"))

const SidebarItem = ({ category }: SidebarType) => {
  const params = useParams()
  const isOpen = useFlyoutStore((state) => state.isOpen)
  const [open, setOpen] = React.useState(false)
  const selected = params.id === category.id

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
      <Link className="border flex justify-between" id={category.id} href={`/bookmarks/${category.id}`}
      >
        <Button 
        variant="outline" 
        className={cn("relative w-full h-8 p-0 rounded-none flex justify-between gap-2",
          {
            "bg-slate-100": selected
          }
        )}
        disabled={selected}
        >
          <div className='flex gap-2 pl-2'>
            {/* <FolderIcon size={24} /> */}
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
          </div>
        }
      </Link>
    </div>

  )
}

export default SidebarItem