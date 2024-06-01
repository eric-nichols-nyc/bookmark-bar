import { auth } from "@clerk/nextjs/server";
import { Folder } from "@prisma/client";
import { Tag } from "@prisma/client";
import React from 'react'
import { getFolders } from "@/actions/prisma/folders/folder-actions";
import { BookmarkForm } from '@/components/bookmark-form/bookmark-form'
import { prisma } from '@/db/prisma';
import { HomeCard } from "../_components/home-card";
import { AddFolderItem } from "../_components/sidebar/add-folder-item";
//add 

const BookMarksPage = async() => {
  const tags = [] as Tag[]

  const { userId } = auth();
 
  if (userId) {
    console.log('user id bookmarks = ', userId)
    // Query DB for user specific information or display assets only to signed in users 
  }

    // therow error if user is not found
    if (!userId) {
      throw new Error("userId not found");
    }

  // get user from prisma
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId!,
    },
  });

  // therow error if user is not found
  if (!user) {
    // throw new Error("User not found");
    return <div>User not found in database</div>;
  }
 
  // Get the Backend API User object when you need access to the user's information
  const folders = await getFolders();
  
  //return a div if there are no bookmarks
 

  return (
    <div className="size-full flex flex-col container justify-center">
      <div className="w-full mx-auto overflow-y-scroll">
        <BookmarkForm folders={folders} bookmarktags={tags}/>
        <h2>Your Folders</h2>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        <AddFolderItem />

        {
          folders.length ? folders.map((folder:Folder) => (
            <HomeCard key={folder.id} folder={folder}/>   
          )) : <div className="w-full text-center">No folders found</div>
        }
      </div>
      </div>
    </div>
  )
}

export default BookMarksPage