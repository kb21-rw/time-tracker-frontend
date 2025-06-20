import { Folder } from 'lucide-react'
import { TrackerInputProps } from '@/util/interfaces'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import ProjectsList from './ProjectsList'

export default function TrackerInput({
    label,
    id,
    error,
    placeholder,
    hasIcon = false,
    register,
    onProjectSelect,
    ...props
}: TrackerInputProps) {
    const [selectedClient] = useState<string | null>(null)
    const [selectedProject] = useState<string | null>(null)
    const [isFolderActive, setIsFolderActive] = useState(false)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [project, setProject] = useState('')
    const iconRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
                setIsFolderActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleProjectSelect = (projectId: string, displayName: string) => {
        setProject(displayName)
        onProjectSelect?.(projectId, displayName)
    }

    return (
        <div className="w-full max-w-3xl font-inter pb-6 text-left">
            {label && (
                <label className="text-primary-800" htmlFor={id}>
                    {label}
                </label>
            )}
            {selectedClient && selectedProject && (
                <div className="mb-2 text-primary-700 text-sm">
                    Selected: <span className="font-bold">{selectedClient}</span> /{' '}
                    <span className="font-bold">{selectedProject}</span>
                </div>
            )}
            <div className="relative h-10 mt-5">
                <input
                    {...props}
                    id={id}
                    {...register}
                    {...(!label && { 'aria-label': placeholder })}
                    placeholder={placeholder}
                    className={`w-full h-full rounded-lg border-2 border-black/25 px-5 pr-60 font-inter placeholder:font-normal placeholder:text-black/30 focus:outline-none focus:ring-2 focus:border-0 focus:ring-primary-600`}
                />
                <div className=" absolute right-12 top-1/2 -translate-y-1/2 font-inter text-sm">
                    {project}
                </div>
                {error && <p className="py-1 font-Inter text-sm text-red-400">{error.message}</p>}
                {hasIcon && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2" ref={iconRef}>
                        <Folder
                            className={clsx(
                                'w-5 h-5 cursor-grab',
                                !isFolderActive && 'text-black/25',
                                isFolderActive && 'text-primary-500',
                            )}
                            onClick={() => {
                                setIsFolderActive(true)
                                setIsPopoverOpen(true)
                            }}
                        />
                    </span>
                )}
                <ProjectsList
                    setProject={handleProjectSelect}
                    isModalOpen={isPopoverOpen}
                    onClose={() => setIsPopoverOpen(false)}
                    anchorRef={iconRef as React.RefObject<HTMLDivElement>}
                />
            </div>
        </div>
    )
}
