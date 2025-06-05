import { z } from 'zod'

export const workspaceShema = z.object({
    name: z
        .string()
        .min(3, { message: 'name must be at least 3 characters' })
        .regex(/^[A-Z]/, { message: 'name must start with a capital letter' }),
})

export const inviteUserSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
})

export const clientSchema = z.object({
    name: z.string().min(3, { message: 'Client name must be at least 3 characters' }),
})

export const ProjectSchema = z.object({
    clientId: z.string().min(2, { message: 'Client is required' }),
    name: z.string().min(3, { message: 'Project name required' }),
})
