"use server";
import { connectDB } from "@/lib/db";
import { Bookmark } from "../../models/bookmark-model";
import { revalidatePath } from "next/cache";
import { addBookmarkSchema } from "./schemas";
import { v2 as cloudinary } from "cloudinary";
import { fetch } from "fetch-opengraph";
import { Tag } from "@/models/tag-model";

type Bookmark = {
  url: string;
  title: string;
  description?: string;
  image?: string;
  category: string;
  tags?: string[];
};

// return all bookmarks
export const getBookmarks = async () => {
  try {
    await connectDB()
    const bookmarks = await Bookmark.find();

    return JSON.parse(JSON.stringify(bookmarks));
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
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

export const getBookmarksByCategory = async (category: string = "general") => {
  try {
    const conn = await connectDB()
    const bookmarks = await Bookmark.find({
      category: category,
    }).sort({ createdAt: -1 });
  
    // return JSON.parse(JSON.stringify(bookmarks));
    return JSON.parse(JSON.stringify(bookmarks));
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
  }
};


// add bookmark to db
export const addBookmark = async (data: Bookmark) => {
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

// delete bookmark by id
export const deleteBookmark = async (id: string) => {
  try {
    await connectDB()
    await Bookmark.findByIdAndDelete(id);
    // revalidate path
    revalidatePath('/')
  }
  catch (error: any) {
    console.error(`Error: ${error.message}`);
    return error.message;
  }
}


