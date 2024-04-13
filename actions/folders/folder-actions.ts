"use server";
import { Folder } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from '@/db/prisma';
import { connectDB } from "@/lib/db";
import { Category } from "@/models/category-model";
import { addCategorySchema } from "./schemas";
// return all bookmarks
export const getFolders = async (id:string) => {
    // find the user
    const user = await prisma.user.findUnique({
        where: {
            externalId: id,
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


// add bookmark to db
export const addFolder = async (category: string) => {
    try {
        await connectDB()

        // validate data
        const result = addCategorySchema.safeParse({category});
        if (!result.success) {
            // handle error then return
            console.log("ERROR: ",result.error);
            return result.error;
        }

        const newcategory = new Category({
            category: category,
        });
        await newcategory.save();
        // revalidate path
        revalidatePath('/')
        return JSON.stringify(newcategory);
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        return {message:error.message}
    }
}


