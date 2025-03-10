import { ButtonProps } from '../../util/interfaces'
import LoadingSpinner from '../LoadingSpinner'

export default function Button({ isLoading, className, disabled, children }: ButtonProps) {
    return (
        <button
            className={`bg-primary shadow shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4 ${className} ${isLoading || disabled ? 'bg-primary/50' : ''}`}
            disabled={isLoading || disabled}
        >
            {isLoading ? <LoadingSpinner /> : children}
        </button>
    )
}
