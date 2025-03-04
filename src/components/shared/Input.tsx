import { useState } from 'react'
import { InputProps } from '../../util/interfaces'

export default function Input({
    label,
    id,
    error,
    type = 'text',
    placeholder,
    register,
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => setShowPassword(previousState => !previousState)

    return (
        <div className="w-full max-w-3xl font-inter pb-6 text-left">
            {label && (
                <label className="text-quaternary" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative h-14 mt-5">
                <input
                    id={id}
                    {...register}
                    {...(!label && { 'aria-label': placeholder })}
                    placeholder={type === 'password' ? '********' : placeholder}
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    className={`w-full h-full rounded-lg border-2 border-black/25 py-4 px-5 font-inter placeholder:font-normal placeholder:text-black/30 focus:outline-none focus:ring-2 focus:border-0 focus:ring-primary`}
                />
                {error && <p className="py-1 font-Inter text-sm text-red-400">{error.message}</p>}
                {type === 'password' && (
                    <button
                        title={showPassword ? 'show' : 'hide'}
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label="Toggle password visibility"
                        className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                    >
                        {showPassword ? 'hide' : 'show'}
                    </button>
                )}
            </div>
        </div>
    )
}
