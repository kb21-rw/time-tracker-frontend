import toast from 'react-hot-toast'
import Modal from '../modal/Modal'
import Button from '../ui/Button'
import ProjectsList from '@/components/ui/ProjectsList'
import { ChevronDown } from 'lucide-react'
import { DateTimePicker } from '@/components/ui/DateTimePicker'
import Input from '../ui/Input'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EditTimerFormData, EditTimerSchema } from '@/schema/timelogs'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditTimeLogProps } from '@/util/interfaces'
import { splitTime } from '@/util/helpers'
import { set } from 'date-fns'

export default function EditTimeLog({
    description,
    project,
    date,
    startTime,
    endTime,
    duration,
    isModalOpen,
    setIsModalOpen,
}: EditTimeLogProps) {
    const [projectListOpen, setProjectListOpen] = useState(false)
    const [start, setStartTime] = useState<Date>(new Date(date))
    const [end, setEndTime] = useState<Date>(set(new Date(date),{...splitTime(endTime)}))
    const [selectedProject, setSelectedProject] = useState<string | null>(project || null)
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
            startTime: start?.toISOString() || '',
            endTime: end?.toISOString() || '',
        },
        mode: 'all',
    })

    const handleProjectSelect = (projectId: string, displayName: string) => {
        setValue('projectId', projectId)
        setSelectedProject(displayName)

        setProjectListOpen(false)
    }
    const onSubmit = (data: EditTimerFormData, event: React.FormEvent<HTMLFormElement>) => {
        console.log(data)
        const submitter = (event.nativeEvent as SubmitEvent & { submitter?: HTMLElement })
            .submitter as HTMLButtonElement | undefined
        if (submitter?.name === 'delete') {
            toast.success('Time entry deleted!')
        } else {
            toast.success('Time entry saved!')
        }
        setIsModalOpen(false)
    }

    return (
        <div>
            <Modal
                title="Edit Time Entry"
                isModalOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setProjectListOpen(false)
                }}
            >
                <form
                    className="px-4"
                    onSubmit={e => {
                        e.preventDefault()
                        handleSubmit(data => onSubmit(data, e))(e)
                    }}
                >
                    <Input
                        id="description"
                        register={register('description')}
                        error={errors.description}
                    />
                    <div className="w-full flex gap-4 justify-between items-center">
                        <DateTimePicker
                            start={startTime}
                            end={endTime}
                            previousDate={date}
                            duration={duration}
                            setStartTime={setStartTime}
                            setEndTime={setEndTime}
                        />
                        <div
                            ref={buttonRef}
                            className="relative w-full px-2 py-1 border border-gray-200 rounded-md hover:border-primary-500"
                        >
                            <span>{selectedProject ? selectedProject : 'select project'}</span>
                            <ChevronDown
                                type="button"
                                onClick={e => {
                                    e.stopPropagation()
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
                        <Button className="w-full cursor-pointer" type="submit" name="save">
                            Save
                        </Button>
                        <Button
                            className="w-full cursor-pointer"
                            variant="accent"
                            type="submit"
                            name="delete"
                        >
                            Delete
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
