import { z } from 'zod'

 export const userSignUpShcema = z.object({
    CreatePassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    ConfirmPassword:z.string().min(1, { message: 'Confirm password is required' }),
}) .refine(data => data. CreatePassword === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})