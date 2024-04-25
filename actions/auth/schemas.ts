import {object, string} from 'zod';


export const loginSchema = object({
    email: string().email({ message: "Email is required" }),
    password: string().min(8, { message: "Pasword is required" }),
});
