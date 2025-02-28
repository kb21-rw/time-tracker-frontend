import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}
export default function Button({ isLoading, className, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`bg-primary text-white rounded-lg text-center p-4 ${className} ${isLoading ? 'bg-primary/45' : ''}`}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : props.children}
        </button>
    )
}
