import { ColumnDef } from '@tanstack/react-table'
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

export interface WorkspaceProps {
    name: string
    creationDate: string
}

export interface Workspaces {
    id: string
    name: string
    creationDate: string
}
export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}
export type TableUser = {
    id: string
    names: string
    email: string
    actions?: string
}
