import clsx from 'clsx'
import { ButtonProps } from '../../../util/interfaces'
import LoadingSpinner from './LoadingSpinner'

export default function Button({
    isLoading,
    className,
    disabled,
    children,
    onClick,
    variant = 'primary',
}: ButtonProps) {
    const variantClassNames = {
        primary: 'bg-primary-600 hover:bg-primary-600/90',
        accent: 'bg-accent-500 hover:bg-accent-500/80',
    }
    return (
        <button
            className={clsx(
                'shadow shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4',
                className,
                isLoading || (disabled && 'bg-primary-600/50'),
                variantClassNames[variant] || variantClassNames.primary,
            )}
            disabled={isLoading || disabled}
            onClick={onClick}
        >
            {isLoading ? <LoadingSpinner /> : children}
        </button>
    )
}
