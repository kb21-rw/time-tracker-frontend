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

export interface WorkspaceForCreation {
    id: string
    name: string
}

export interface WorkspaceState {
    workspaces: Workspace[]
    loading: boolean
    error: any
}

export interface WorkspaceProps {
    workspaceId: string
    name: string
    creationDate: string
}

export interface Workspace {
    id: string
    name: string
    created_at: string
    updated_at: string
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
export interface Project {
    id: string
    names: string
}

export interface Group {
    id: string
    name: string
    projects: Project[]
}
