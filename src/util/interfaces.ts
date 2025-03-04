import { ButtonHTMLAttributes } from 'react'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    id?: string
    error?: string
}
