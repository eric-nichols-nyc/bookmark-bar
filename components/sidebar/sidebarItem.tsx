import Link from 'next/link'
import React from 'react'
import { Category } from '@/types'
import { Button } from '../ui/button'

type SidebarType = {
    category: Category
}

const SidebarItem = ({category}:SidebarType) => {
  return (
    <Link id={category._id} href={`/bookmark/${category._id}/${category.category}`}>
     <Button className="w-full h-8 rounded-none">{category.category}</Button>
    </Link>
  )
}

export default SidebarItem