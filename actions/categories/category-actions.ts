"use server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/category-model";
import { addCategorySchema } from "./schemas";

// return all bookmarks
export const getCategories = async () => {
    try {
        const conn =  await connectDB()
        const bookmarks = await Category.find();
        return JSON.parse(JSON.stringify(bookmarks));
    } catch (error: any) {
        console.error(`Error poop: ${error.message}`)
        throw new Error(error.message)
    }
}


// add bookmark to db
export const addCategory = async (category: string) => {
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


