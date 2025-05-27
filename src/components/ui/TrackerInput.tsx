import { Folder } from 'lucide-react'
import { InputProps } from '@/util/interfaces'
import clsx from 'clsx'

export default function TrackerInput({
    label,
    id,
    error,
    placeholder,
    hasIcon = false,
    register,
    ...props
}: InputProps) {
    return (
        <div className="w-full max-w-3xl font-inter pb-6 text-left">
            {label && (
                <label className="text-primary-800" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative h-10 mt-5">
                <input
                    {...props}
                    id={id}
                    {...register}
                    {...(!label && { 'aria-label': placeholder })}
                    placeholder={placeholder}
                    className={`w-full h-full rounded-lg border-2 border-black/25 px-5 font-inter placeholder:font-normal placeholder:text-black/30 focus:outline-none focus:ring-2 focus:border-0 focus:ring-primary-600`}
                />
                {error && <p className="py-1 font-Inter text-sm text-red-400">{error.message}</p>}
                {hasIcon && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Folder className={clsx('w-5 h-5 text-black/25')} />
                    </span>
                )}
            </div>
        </div>
    )
}
