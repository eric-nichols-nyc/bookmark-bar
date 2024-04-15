"use server";
import { auth } from "@clerk/nextjs";
import { Url } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from '@/db/prisma';

// ======================== FOLDER ACTIONS ========================
// return all bookmarks
export const getFolders = async () => {
    const { userId } = auth();
    // find the user
    const user = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });
    try {
        const bookmarks = await prisma.folder.findMany({
            where: {
                userId: user?.id,
            },
        });
        return bookmarks;

    } catch (error: any) {
        console.error(`Error getting folders from server: ${error.message}`)
        throw new Error(error.message)
    }
}



export const getBookmarksByFolderId = async (id: string) => {

    try {
      const bookmarks = await prisma.url.findMany({
        where: {
          folderId: id,
        },
      });
  
      return bookmarks;
    } catch (e) {
      console.log("error with bookmarks action", e)
    }
  
  }


  // add a url to a folder with prisma
export const addUrlToFolder = async (bookmark:Url) => {
    const {folderId, url, title, description, imageUrl} = bookmark;

    const { userId } = auth();
    if (!userId) {
        throw new Error("userId not found")
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });

    if (!currentUser) {
        throw new Error("User not found")
    }

    const currentUserId = currentUser?.id;
    try {
        const newUrl = await prisma.url.create({
            data: {
                userId: currentUserId,
                folderId: folderId,
                url: url,
                title: title,
                description: description,
                imageUrl: imageUrl,
            },
        });
        revalidatePath('/')
        return newUrl;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}



// add a new folder
export const addFolder = async (name: string) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("userId not found")
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });

    if (!currentUser) {
        throw new Error("User not found")
    }

    const currentUserId = currentUser?.id;
    try {
        const newFolder = await prisma.folder.create({
            data: {
                userId: currentUserId,
                name: name,
            },
        });
        revalidatePath('/')
        return newFolder;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}

 

// delete a folder by id
export const deleteFolder = async (id: string) => {
    try {
        const deletedFolder = await prisma.folder.delete({
            where: {
                id: id,
            },
        });
        revalidatePath('/')
        return deletedFolder;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}

// update folder name
export const updateFolder = async (id: string, name: string) => {
    try {
        const updatedFolder = await prisma.folder.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });
        revalidatePath('/')
        return updatedFolder;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}

//======================== URL ACTIONS ========================

// delete a bookmark by id
export const deleteBookmark = async (id: string) => {
    try {
        const deletedBookmark = await prisma.url.delete({
            where: {
                id: id,
            },
        });
        revalidatePath('/')
        return deletedBookmark;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}  


// =========================== TAG ACTIONS ===========================

// get tags by user id
export const getTags = async () => {
    const { userId } = auth();
    // find the user
    const user = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });
    try {
        const tags = await prisma.tag.findMany({
            where: {
                userId: user?.id,
            },
        });
        return tags;

    } catch (error: any) {
        console.error(`Error getting tags from server: ${error.message}`)
        throw new Error(error.message)
    }
}

// delete a tag by id
export const deleteTag = async (id: string) => {
    try {
        const deletedTag = await prisma.tag.delete({
            where: {
                id: id,
            },
        });
        revalidatePath('/')
        return deletedTag;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}

// update a tag by id
export const updateTag = async (id: string, name: string) => {
    try {
        const updatedTag = await prisma.tag.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });
        revalidatePath('/')
        return updatedTag;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}

