import { auth } from "@clerk/nextjs/server"
import { Tag } from "@prisma/client"
import React from "react"
import { getFolders } from "@/actions/prisma/folders/folder-actions"
import { BookmarkForm } from "@/components/bookmark-form/bookmark-form"
import { prisma } from "@/db/prisma"
import GroupedFolders from "./_components/groouped-folders"

const BookMarksPage = async () => {
  const tags = [] as Tag[]

  const { userId } = auth()

  // therow error if user is not found
  if (!userId) {
    throw new Error("userId not found")
  }

  // get user from prisma
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId!,
    },
  })

  // therow error if user is not found
  if (!user) {
    // throw new Error("User not found");
    return <div>User not found in database</div>
  }

  // Get the Backend API User object when you need access to the user's information
  const folders = await getFolders()

  return (
    <div className="container flex size-full flex-col justify-center">
      <div className="mx-auto w-full overflow-y-scroll">
        <BookmarkForm folders={folders} bookmarktags={tags} />
        <GroupedFolders folders={folders} />
      </div>
    </div>
  )
}

export default BookMarksPage
