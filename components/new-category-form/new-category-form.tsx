"use client"
import { PlusIcon, SendHorizontal, X } from "lucide-react"
import { useState } from "react"
import React from "react"
import { addCategory } from "@/actions/categories/category-actions"
import { AspectRatio } from "../ui/aspect-ratio"

export const NewCategoryForm = () => {
  const [isEditing, setIsEditing] = useState(false)

  const handleClose = (e:any) => {
    e.stopPropagation()
    setIsEditing(false)
  }

  const handleAddFolderSubmit = async (formData:FormData) => {
    const name = formData.get('name') as string
    if(name.length < 1) return alert('Name is required')

    try {
     const result =  await addCategory(name)
     console.log('result', result)
     setIsEditing(false)

    } catch (e:any) {
      console.error(e)
    }
  }
  return (
    <AspectRatio ratio={1 / 0.5} className="cursor-pointer bg-muted p-2" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <form action={handleAddFolderSubmit}>
          <div>
            <input data-testid="newfolder" id="folder-name" name="name" type="text" className="w-full" placeholder="Folder name"/>
          </div>
          <hr className="my-2" />
          <div className="flex justify-end">
              <X onClick={(e) => handleClose(e) }/>
            <button type="submit" >
              <SendHorizontal />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center font-semibold">
          <PlusIcon className="size-5 text-primary" /> <span>new folder</span>
        </div>
      )}
    </AspectRatio>
  )
}
