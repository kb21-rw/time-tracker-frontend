import { ButtonHTMLAttributes } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
    disabled?: boolean
}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    id: string
    error?: FieldError
    register: UseFormRegisterReturn
}

export interface User {
    id: number
    fullName: string
    email: string
    roles: UserRole
}

export interface AuthState {
    user: User | null
    token: string | null
    loading: boolean
    error: any
}

export enum UserRole {
    ADMIN = 'Admin',
    MEMBER = 'Member',
}
export interface Workspace {
    id: string
    name: string
}
export interface WorkspaceState {
    workspace: Workspace | null
    loading: boolean
    error: any
}
