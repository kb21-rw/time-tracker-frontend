import toast from 'react-hot-toast'
import Modal from '../modal/Modal'
import Button from '../ui/Button'
import ProjectsList from '@/components/ui/ProjectsList'
import { ChevronDown } from 'lucide-react'
import { DateTimePicker } from '@/components/ui/DateTimePicker'
import Input from '../ui/Input'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EditTimeLogFormData, EditTimeLogSchema } from '@/schema/timelogs'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditTimeLogProps } from '@/util/interfaces'
import { handleAxiosError, splitTime } from '@/util/helpers'
import { set } from 'date-fns'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { deleteTimeLogAPI, editTimeLogAPI } from '@/redux/slice/timeLogsSlice'
import { AxiosError } from 'axios'
import { useMultiSelector } from '@/hooks/useMultiSelector'

export default function EditTimeLog({
    id,
    workspaceId,
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
    const [end, setEndTime] = useState<Date>(set(new Date(date), { ...splitTime(endTime) }))
    const [selectedProject, setSelectedProject] = useState<string | null>(project || null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch<AppDispatch>()

    const { projects, timeLogLoading } = useMultiSelector({
        projects: (state: RootState) => state.projects.projects,
        timeLogLoading: (state: RootState) => state.timeLog.loading,
    })

    const selectedProjectId = useMemo(() => {
        return projects.find(currentProject => project === currentProject.name)?.id
    }, [])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditTimeLogFormData>({
        resolver: zodResolver(EditTimeLogSchema),
        defaultValues: {
            description: description || '',
            projectId: selectedProjectId || '',
            startTime: start?.toISOString() || '',
            endTime: end?.toISOString() || '',
        },
        mode: 'all',
    })
    useEffect(() => {
        console.log('start', start, 'end', end)
        if (start && end) {
            setValue('startTime', start.toISOString())
            setValue('endTime', end.toISOString())
        }
    }, [start, end])
    const handleProjectSelect = (projectId: string, displayName: string) => {
        setValue('projectId', projectId)
        setSelectedProject(displayName)

        setProjectListOpen(false)
    }
    const handleEdit = async (data: EditTimeLogFormData) => {
        try {
            const timeLogData = () => {
                if (!data.projectId) {
                    const { projectId, ...restData } = data
                    return restData
                }
                return data
            }

            const { meta: response } = await dispatch(
                editTimeLogAPI({ id, workspaceId, data: timeLogData() }),
            )

            if (response.requestStatus === 'fulfilled') {
                toast.success('Timelog Edited successfully')
                setIsModalOpen(false)
            } else {
                toast.error('Failed to create a new project')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }
    const handleDelete = async () => {
        try {
            const { meta: response } = await dispatch(deleteTimeLogAPI({ id, workspaceId }))
            if (response.requestStatus === 'fulfilled') {
                toast.success('Time entry deleted successfully!')
                setIsModalOpen(false)
            } else {
                toast.error('Failed to delete time entry.')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
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
                <form className="px-4" onSubmit={handleSubmit(handleEdit)}>
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
                        <Button
                            className="w-full cursor-pointer"
                            type="submit"
                            name="save"
                            disabled={timeLogLoading}
                        >
                            Save
                        </Button>
                        <Button
                            className="w-full cursor-pointer"
                            variant="accent"
                            type="submit"
                            name="delete"
                            onClick={handleDelete}
                            disabled={timeLogLoading}
                        >
                            Delete
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
