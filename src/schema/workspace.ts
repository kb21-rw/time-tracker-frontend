import { z } from 'zod'

export const workspaceShema = z.object({
    name: z
        .string()
        .min(3, { message: 'name must be at least 3 characters' })
        .regex(/^[A-Z]/, { message: 'name must start with a capital letter' }),
})

export const inviteUserSchema = z.object({
    fullName: z.string().refine(value => value.trim().split(/\s+/).length >= 2, {
        message: 'Please enter your full name (first and last name)',
    }),
    
    email: z.string().email({ message: 'Please enter a valid email address' }),
})
