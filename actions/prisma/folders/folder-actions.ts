"use server";
import { auth } from "@clerk/nextjs";
import { Url } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from '@/db/prisma';
import { addBookmarkSchema } from "./schemas";

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
            orderBy: {
                createdAt: 'desc',
            },
        });
        return bookmarks;

    } catch (error: any) {
        console.error(`Error getting folders from server: ${error.message}`)
        throw new Error(error.message)
    }
}



export const getBookmarksByFolderId = async (id: string) => {
    console.log('id = ', id)

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
// get all bookmarks by user id
export const getBookmarks = async () => {
    const { userId } = auth();
    // find the user
    const user = await prisma.user.findUnique({
        where: {
            externalId: userId as string,
        },
    });
    try {
        const bookmarks = await prisma.url.findMany({
            where: {
                userId: user?.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return bookmarks;

    } catch (error: any) {
        console.error(`Error getting bookmarks from server: ${error.message}`)
        throw new Error(error.message)
    }
}
// get a url by id
export const getBookmark = async (id: string) => {
    try {
        const url = await prisma.url.findUnique({
            where: {
                id: id,
            },
        });
        return url;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}

// add a new bookmark
export const addBookmark = async (bookmark: any) => {
    // add validation schema here
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

    // validate data with zod schema
    const valid = addBookmarkSchema.safeParse(bookmark);
    if (!valid.success) {
        throw new Error('Validation failed')
    }
    try {
        const newBookmark = await prisma.url.create({
            data: {
                userId: currentUserId,
                folderId: bookmark.folderId,
                url: bookmark.url,
                title: bookmark.title,
                description: bookmark.description,
                imageUrl: bookmark.imageUrl,
                icon: bookmark.icon,
            },
        });
        console.log('new bookmark = ', newBookmark)
        revalidatePath('/')
        return newBookmark;
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}

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

// update a bookmark by id
export const updateBookmark = async (id: string, data: any) => {
    try {
        const updatedBookmark = await prisma.url.update({
            where: {
                id: id,
            },
            data: {
                url: data.url,
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                folderId: data.folderId,
            },
        });
        revalidatePath('/')
        return updatedBookmark;
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

