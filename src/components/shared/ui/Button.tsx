import { ButtonProps } from '../../../util/interfaces'
import LoadingSpinner from './LoadingSpinner'

export default function Button({ isLoading, className, disabled, children, onClick }: ButtonProps) {
    return (
        <button
            className={`bg-primary-600 shadow shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4 ${className} ${isLoading || disabled ? 'bg-primary-600/50' : ''}`}
            disabled={isLoading || disabled}
            onClick={onClick}
        >
            {isLoading ? <LoadingSpinner /> : children}
        </button>
    )
}
