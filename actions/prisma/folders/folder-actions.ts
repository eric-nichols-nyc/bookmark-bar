"use server";
import { auth } from "@clerk/nextjs";
import { v2 as cloudinary } from "cloudinary";
import { fetch } from "fetch-opengraph";
import { revalidatePath } from "next/cache";
import { prisma } from '@/db/prisma';
import { addBookmarkSchema, FolderSchema } from "./schemas";
import { Folder, Url } from "@prisma/client";


export const handleFetchOpengraph = async (url: string) => {
    try {
      const data = await fetch(url);
      return data;
    } catch (error: any) {
      console.error(`OOPS!!! Error: ${error.message}`);
      return { message: 'There was a error fetching the data' }
    }
  };

  // upload to Cloudinary
export const uploadToCloud = async (url: string) => {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API,
      secure: true,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
      const loader = await cloudinary.uploader.upload(url, {
        quality_analysis: true,
        colors: true,
        quality: "auto",
        fetch_format: "auto",
      });
      return loader.url;
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  };

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
                index: 'asc',
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
        orderBy: {
            index: 'asc',
        },
      });
  
      return bookmarks;
    } catch (e) {
      console.log("error with bookmarks action", e)
    }
  
  }


type FolderProps = {
    name: string;
    index: number;
}
// add a new folder
export const addFolder = async (data: FolderProps) => {
    const {name, index} = data
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
    const valid = FolderSchema.safeParse(data);
    // reture message if not valid
    if (!valid.success) {
        throw new Error('Validation failed')
    }
    try {
        const newFolder = await prisma.folder.create({
            data: {
                userId: currentUserId,
                name: name,
                index: index
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
type UpdateFolderProps = {
    name?: string;
    index?: number;
}
// update folder name
export const updateFolder = async (id: string, data: UpdateFolderProps) => {
    try {
        const updatedFolder = await prisma.folder.update({
            where: {
                id: id,
            },
            data: {
                ...data
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
                index: 'asc',
            },
        });
        return JSON.parse(JSON.stringify(bookmarks)) ;

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


type UrlProps = {
    url: string;
    title: string;
    description: string;
    imageUrl?: string;
    folderId: string;
    icon?: string;
    tags?: string[];
    notes?: string;
    index: number;
}

// add a new bookmark
export const addBookmark = async (bookmark: UrlProps) => {
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
                notes: bookmark.notes,
                tags: bookmark.tags,
                index: bookmark.index,
            },
        });
        revalidatePath('/')
        return JSON.parse(JSON.stringify(newBookmark)) ;
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
export const updateBookmark = async (id: string, data: Url) => {
    try {
        const updatedBookmark = await prisma.url.update({
            where: {
                id: id,
            },
            data: {
                ...data
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

