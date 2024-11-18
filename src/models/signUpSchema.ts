import {z} from 'zod'


export const signUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be between 3 and 20 characters"),
    email: z.string().email({message: "Please enter a valid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
    
})