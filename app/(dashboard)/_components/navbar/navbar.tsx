import React from 'react'
import { Logo } from '@/components/logo/logo'
import { Search } from '../search/search'

export const Navbar = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between h-12 w-full p-2 drop-shadow-md bg-slate-400 z-[1000]">
      <Logo />
      <div className="sm:w-8 md:w-[300px]"><Search /></div>
    </header>
  )
}
