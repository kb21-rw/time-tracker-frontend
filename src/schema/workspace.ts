import { z } from "zod";

 export const workspaceShema = z.object({
    name: z
        .string()
        .min(3, { message: 'name must be at least 3 characters' })
        .regex(/^[A-Z]/, { message: 'name must start with a capital letter' }),
})