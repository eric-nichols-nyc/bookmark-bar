import {object, string} from 'zod';


export const addBookmarkSchema = object({
    url: string().url({ message: "Must be a valid url" }),
    category: string().min(1, { message: "Category is required" }),
    title: string().optional(),
    description: string().optional(),
    image: string().optional(),
});

export const urlSchema = string().url({ message: "Invalid url" });