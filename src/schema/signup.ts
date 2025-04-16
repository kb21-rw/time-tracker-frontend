import { z } from 'zod'

export const signUpSchema = z
    .object({
        fullName: z.string().refine(value => value.trim().split(/\s+/).length >= 2, {
            message: 'Please enter your full name (first and last name)',
        }),
        email: z.string().email({ message: 'Please enter a valid email address' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export const userSignUpShcema = z
    .object({
        CreatePassword: z.string().min(8, { message: 'Password must be 8 characters' }),
        ConfirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine(data => data.CreatePassword === data.ConfirmPassword, {
        message: "Passwords don't match",
        path: ['ConfirmPassword'],
    })
