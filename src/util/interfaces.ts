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
    expiresAt: number | null
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
    workspaceUsers: []
    loading: boolean
    error: any
}

export interface WorkspaceProps {
    id: string
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
    tableName: string
    loading: boolean
}
export type TableUser = {
    id: string
    names: string
    email: string
    actions?: string
}
export interface Project {
    id: string
    name: string
    client: Client
}

export interface Client {
    id: string
    workspaceId: string
    name: string
}
export interface WorkspaceModalSharedProps {
    id: string
    setIsModalOpen: (value: React.SetStateAction<boolean>) => void
}
export type ProjectTable = {
    id: string
    client: string
    project: string
    actions: string
}

export interface CommonModalProps {
    isModalOpen: boolean
    onClose: () => void
}

export interface ClientState {
    clients: Client[]
    loading: boolean
    error: any
}

export interface RenameClientProps {
    clientName?: string
}

export interface ProjectTableColumnsProps {
    setEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedRow: React.Dispatch<React.SetStateAction<Project | null>>
}

export type ClientTable = {
    id: string
    name: string
}

export interface ClientsTableColumnsProps {
    setEditClientModal: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedRow: React.Dispatch<React.SetStateAction<ClientTable | null>>
}

export interface WorkspaceHeaderProps {
    workspaceName: string
    buttonText: string
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export type OutletContextType = {
    workspaceName: string
    id: string
}
export interface projectState {
    projects: Project[]
    loading: boolean
    error: any
}
export type CreateClientProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export interface RenameProjectProps {
    projectName?: string
}
