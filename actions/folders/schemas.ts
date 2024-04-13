import {object, string} from 'zod';


export const addCategorySchema = object({
    category: string().min(3),
});