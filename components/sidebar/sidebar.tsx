import React from 'react'
import { getCategories } from '@/actions/categories/category-actions'
import { Category } from '@/types';
import SidebarItem from './sidebarItem'
export const Sidebar = async() => {
    const categories = await getCategories();
  return (
    <div className="w-[260px]">
        {
            categories.map((cat:Category) => <SidebarItem key={cat._id} category={cat}/>)
        }
    </div>
  )
}

