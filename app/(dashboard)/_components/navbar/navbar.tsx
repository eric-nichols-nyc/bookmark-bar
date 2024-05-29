import React from 'react'
import { UserNav } from '@/app/(intro)/_components/user-nav'
import { Logo } from '@/components/logo/logo'
import { Search } from '../search/search'
import { AddFolderItem } from '../sidebar/add-folder-item'

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between h-12 w-full p-2 drop-shadow-md bg-slate-400 z-10 max-h-full">
      <div className="flex">
        <div className="flex gap-2">
         <Logo />
        </div>
        <AddFolderItem  />
      </div>
      <div className="sm:w-8 md:w-[300px] flex gap-2"><Search /><UserNav /></div>
    </header>
  )
}
