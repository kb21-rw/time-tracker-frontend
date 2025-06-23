import { TimeEntryCardProps } from '@/util/interfaces'
import { ChevronDown, Pencil } from 'lucide-react'
import { useState, useRef } from 'react'
import Modal from '../shared/modal/Modal'
import Input from '../shared/ui/Input'
import { Calendar24 } from '../shadcn/datePicker'
import { EditTimerFormData, EditTimerSchema } from '@/schema/timelogs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../shared/ui/Button'
import ProjectsList from '../ui/ProjectsList'

export default function TimeEntryCard({
    description,
    project,
    client,
    date,
    startTime,
    endTime,
    duration,
}: TimeEntryCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectListOpen, setProjectListOpen] = useState(false)
    const buttonRef = useRef<HTMLDivElement>(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditTimerFormData>({
        resolver: zodResolver(EditTimerSchema),
        defaultValues: {
            description: description || '',
            projectId: project || '',
            startTime: startTime || '',
            endTime: endTime || '',
        },
        mode: 'all',
    })
    const handleProjectSelect = (projectId: string) => {
        setValue('projectId', projectId)
        setProjectListOpen(false)
    }
    console.log('ProjectsList rendered', projectListOpen, buttonRef.current)

    return (
        <div className="grid grid-cols-6 lg:grid-cols-7 gap-4 items-center justify-center bg-white px-9 py-8 drop-shadow-md font-inter">
            <div className={`lg:min-w-50 col-span-2 capitalize ${!description && 'text-black/20'}`}>
                {description || 'No description'}
            </div>
            <div className="col-span-2 w-full">
                {project ? (
                    <div className="w-full flex flex-col justify-center lg:flex-row lg:items-center gap-4">
                        <li
                            className={`list-disc marker:text-primary-500 marker:text-xl marker:text-center truncate lg:w-1/2 font-medium`}
                        >
                            {project}
                        </li>
                        <li className="marker:text-xs text-black/50 lg:text-center">{client}</li>
                    </div>
                ) : null}
            </div>

            <div className="hidden lg:flex justify-center lg:gap-x-6 items-center">
                <p>{startTime}</p>
                <span> &mdash; </span>
                <p>{endTime}</p>
            </div>
            <div className="text-right">{duration}</div>
            <div className="flex justify-center items-center">
                <button className="text-primary-500" onClick={() => setIsModalOpen(true)}>
                    <Pencil className="w-5 h-5" />
                </button>
            </div>
            {isModalOpen && (
                <>
                    <Modal
                        title="Edit Time Entry"
                        isModalOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false)
                            setProjectListOpen(false)
                        }}
                    >
                        <form className="px-4" onSubmit={() => handleSubmit}>
                            <Input
                                id="description"
                                register={register('description')}
                                error={errors.description}
                            />
                            <div className="w-full flex gap-4 justify-between items-center">
                                <Calendar24
                                    start={startTime}
                                    end={endTime}
                                    previousDate={date}
                                    duration={duration}
                                />
                                <div
                                    ref={buttonRef}
                                    className="relative w-full px-2 py-1 border border-gray-200 rounded-md hover:border-primary-500"
                                >
                                    {project || 'select project'}
                                    <ChevronDown
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation()
                                            console.log('Button clicked')
                                            setProjectListOpen(true)
                                        }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 active:text-primary-500 hover:text-primary-500 cursor-pointer w-5 h-5"
                                        aria-label="Select project"
                                    />
                                    <ProjectsList
                                        anchorRef={buttonRef as React.RefObject<HTMLDivElement>}
                                        isModalOpen={projectListOpen}
                                        onClose={() => setProjectListOpen(false)}
                                        setProject={handleProjectSelect}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-4 mt-4 justify-between w-full">
                                <Button className="w-full">Save</Button>
                                <Button className="w-full" variant="accent">
                                    Delete
                                </Button>
                            </div>
                        </form>
                    </Modal>
                </>
            )}
        </div>
    )
}
