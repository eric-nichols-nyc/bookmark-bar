"use client"
import { Folder } from "@prisma/client"
import Link from "next/link"
import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type HomeCardProps = {
  folder: Folder
}

export const HomeCard = ({ folder }: HomeCardProps) => {
  const [open, setOpen] = React.useState(false)

  const alert = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
  }

  const handleDeleteFolder = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(false)
    console.log(`Delete" ${folder.id}`)
    try {
      // const res = await deleteFolder(id)
      // if (res) {
      //   alert("Deleted")
      // }
    } catch (error) {
      console.error(error)
    }
  }

  // return a alert dialog markup
  const dialog = (
    <AlertDialog open={open}>
    <AlertDialogTrigger onClick={(e) => alert(e)}>Delete</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your saved urls
         from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteFolder}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
  
  return (
    <Link href={`/bookmark/${folder.id}`} className="rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{folder.name}</h1>
        <div className="z-10">
          {dialog}
        </div>
      </div>
    </Link>
  )
}
