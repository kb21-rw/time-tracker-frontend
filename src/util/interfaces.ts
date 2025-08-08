import { ColumnDef } from '@tanstack/react-table'
import React, { ButtonHTMLAttributes } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
    disabled?: boolean
    variant?: 'primary' | 'accent'
}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    id: string
    error?: FieldError
    variant?: 'sm' | 'md' | 'lg'
    hasIcon?: boolean
    register?: UseFormRegisterReturn
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
    client: Client
    setEditClientModal: React.Dispatch<React.SetStateAction<boolean>>
}

export type ClientTable = {
    id: string
    workspaceId: string
    name: string
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
    projectId?: string
    clientId?: string
    setEditProjectModal: (value: boolean) => void
}

export interface VerticalToggleSwitchProps {
    defaultMode?: 'play' | 'plus'
    onToggle?: (mode: 'play' | 'plus') => void
    className?: string
}

export interface TimerState {
    isRunning: boolean
    startTimestamp: number | null
    stopTimestamp: number | null
    currentTimerId: string | null
}
export interface TimerRunnerProps {
    isRunning: boolean
    startTimestamp: number | null
}
export interface ProjectsListProps extends CommonModalProps {
    anchorRef?: React.RefObject<HTMLElement>
    setProject: (id: string, displayName: string) => void
}

export interface ColumnsProps<T> {
    onEditClick: (rowData: T) => void
}
export interface TimeEntryCardProps {
    id: string
    description: string
    project: string
    client: string
    startTime: string
    endTime: string
    duration: string
    date: string
    workspaceId: string
}

export interface TimeLog {
    id: string
    description: string
    project: Project
    startTime: string
    endTime: string | null
    createdAt: string
    manualEntry?: boolean
    autoStoppedAt?: string | null
    updatedAt?: string
}

export interface formattedTimeLog {
    id: string
    description: string
    project: string
    client: string
    date: string
    startTime: string
    endTime: string
    duration: string
    createdAt: string
}
export interface TimeLogState {
    timeLogs: TimeLog[]
    loading: boolean
    error: unknown
}

export interface TimeLogsGroupProps {
    timeLogs: formattedTimeLog[]
    workspaceId: string
}

export interface TimeLogEntryValues {
    description?: string
    projectId?: string
    startTime: string
    endTime: string
}
export interface TimerFormData {
    description?: string
    startTime?: string
    endTime?: string
    projectId?: string
}
export interface StartTimerPayload extends TimerFormData {
    workspaceId: string
}

export interface StopTimerPayload extends TimerFormData {
    workspaceId: string
}

export interface TrackerInputProps extends InputProps {
    onProjectSelect?: (projectId: string, projectName: string) => void
}

export interface DateTimePickerProps {
    start?: string
    end?: string
    previousDate?: string
    duration?: string
    setStartTime: React.Dispatch<React.SetStateAction<Date>>
    setEndTime: React.Dispatch<React.SetStateAction<Date>>
}

export interface ProjectSelection {
    id: string
    name: string
    clientName: string
    displayName: string
}

export interface EditTimeLogProps extends TimeEntryCardProps {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    duration: string
    previousDate?: string
}

export interface ManualTimeLogProps {
    description?: string
    projectId?: string
    workspaceId: string
}

export interface ProtectedRouteProps {
    allowedRoles?: string[]
}

export interface HttpErrorPageProps {
    errorType?: 'notFound' | 'forbidden'
}

export interface TimezoneDisplayProps {
    timeZone: string
    className?: string
}

export interface TimeTrackerHeaderProps {
    id: string
    workspaceName: string
}

export interface TimerSyncOptions {
    periodicSyncMinutes?: number
    syncOnVisibilityChange?: boolean
}
export interface SpinnerProps {
    size?: number
    className?: string
    center?: boolean
}
