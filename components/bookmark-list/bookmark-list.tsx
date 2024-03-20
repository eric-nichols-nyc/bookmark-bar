import React from 'react'
import { Section } from '@/components/section/section'
import { Category } from '@/types'


type BookmarksProp =  {
  categories: Category[]
}

export const BookmarkList = ({categories}:BookmarksProp) => {
  return (
    <div>
       {
        categories.map((cat:Category) => <Section key={cat._id} category={cat}/>)
       }
    </div>
  )
}
