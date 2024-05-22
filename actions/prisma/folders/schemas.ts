import {number, object, string} from 'zod';


export const addCategorySchema = object({
    category: string().min(3),
});

export const addBookmarkSchema = object({
    url: string().url({ message: "Must be a valid url" }),
    folderId: string().min(1, { message: "Folder is required" }),
    title: string().optional(),
    description: string().optional(),
    imageUrl: string().optional(),
});

export const FolderSchema = object({
    name: string().min(3),
    index: number().int({message: "index must be unique"}),
});

export const urlSchema = string().url({ message: "Invalid url" });
