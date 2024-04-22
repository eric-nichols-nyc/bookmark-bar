"use server";
import { v2 as cloudinary } from "cloudinary";
import { fetch } from "fetch-opengraph";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/category-model";
import { Tag } from "@/models/tag-model";
import { BookmarkData } from "@/types";
import { addBookmarkSchema } from "./schemas";
import { Bookmark } from "../../../models/bookmark-model";


const isConnect = async () => {
  try {
    await connectDB()
    return { success: "You are connected to the server" }
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    return { message: error.message }
  }
}

// // return all bookmarks
export const getBookmarks = async () => {
  console.log("getBookmarks was called")
  try {
    await connectDB()
    const bookmarks = await Bookmark.find();

    return JSON.parse(JSON.stringify(bookmarks));
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    return { message: error.message }
  }
}

// get bookmarks by user id
export const getBookmarksByFolderId = async (id: string) => {
  console.log("id ", id)

}

export const getBookmarkTags = async () => {
  try {
    await connectDB()
    const tags = await Tag.find();

    return JSON.parse(JSON.stringify(tags));
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
}


export const updateBookmarks = async () => {
  try {
    await connectDB()
    const bookmarks = await Bookmark.updateMany({ $set: { tags: ["react"] } });

    return JSON.parse(JSON.stringify(bookmarks));
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
}

export const getBookmarksByCategory = async (id: string) => {
  try {
    await connectDB();
    const category = await Category.findById(id);
    const bookmarks = await Bookmark.find({
      category: category.category,
    }).sort({ createdAt: -1 });

    //     // return JSON.parse(JSON.stringify(bookmarks));
    return JSON.parse(JSON.stringify({ bookmarks, category: category.category }));
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
}

export const handleFetchOpengraph = async (url: string) => {
  try {
    const data = await fetch(url);
    return data;
  } catch (error: any) {
    console.error(`OOPS!!! Error: ${error.message}`);
    return { message: 'There was a error fetching the data' }
  }
};


// // add bookmark to db
export const addBookmark = async (data: BookmarkData) => {
  try {
    await connectDB()

    // validate data
    const result = addBookmarkSchema.safeParse(data);
    if (!result.success) {
      // handle error then return
      console.log("ERROR: ", result.error);
      return result.error;
    }

    const bookmark = new Bookmark({
      url: data.url,
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.category,
      tags: data.tags,
    });
    await bookmark.save();
    // revalidate path
    revalidatePath('/')
    return JSON.stringify(bookmark);
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
}

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

// // delete bookmark by id
export const deleteBookmark = async (id: string) => {
  try {
    await connectDB()
    await Bookmark.findByIdAndDelete(id);
    // revalidate path
    revalidatePath('/')
    return { success: 'Bookmark was deleted' }
  }
  catch (error: any) {
    console.error(`Error: ${error.message}`);
    return error.message;
  }
}


// update bookmark by replacing the model with the current data params
export const updateBookmark = async (id: string, data: BookmarkData) => {
  console.log('updateBookmark data', data)  
  try {
    const test = await connectDB() as any
    if(test.message){
      console.error(`Error: ${test.message}`)
      return {error: "You are not connected to the server"};
    } 
  }catch(error: any){
    console.error(`dasaffdaf: ${error.message}`)
    return {error: "You are not connected to the server"};
  }

  try {
    const bookmark = await Bookmark.findById(id);
    bookmark.url = data.url;
    bookmark.title = data.title;
    bookmark.description = data.description;
    bookmark.image = data.image;
    bookmark.category = data.category;
    bookmark.tags = data.tags;
    await bookmark.save();
    // revalidate path
    revalidatePath('/')
    return JSON.stringify(bookmark);
  }
  catch (error: any) {
    console.error(`Error: ${error.message}`);
    return error.message;
  }
}

// return a single bookmark by id
export const getBookmark = async (id: string) => {
  try {
    await connectDB()
    const bookmark = await Bookmark.findById(id);
    return JSON.parse(JSON.stringify(bookmark));
  }
  catch (error: any) {
    console.error(`Error: ${error.message}`);
    return error.message;
  }
}

