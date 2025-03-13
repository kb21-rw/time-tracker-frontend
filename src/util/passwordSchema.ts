import {z} from "zod"
export const passwordSchema= z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
        email: z.string().email({ message: 'Please enter a valid email address' }),
}) 