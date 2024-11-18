import {z} from 'zod'


export const messageSchema = z.object({
    content:z.string()
    .min(8,{message:"Message must be atleast 8 characters"})
    .max(300,{message:"Message shouldn't be more than 300 characters"})
})