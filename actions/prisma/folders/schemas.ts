import {object, string} from 'zod';


export const addCategorySchema = object({
    category: string().min(3),
});

export const addBookmarkSchema = object({
    url: string().url({ message: "Must be a valid url" }),
    folderId: string().min(1, { message: "Folder is required" }),
    title: string().optional(),
    description: string().optional(),
    category: string().min(1, { message: "Category is required" }),
    imageUrl: string().optional(),
});

export const urlSchema = string().url({ message: "Invalid url" });