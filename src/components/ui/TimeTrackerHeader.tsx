import StartTimer from '@/assets/icons/StartTmer'
import { stopTimer, startTimer } from '@/redux/features/timerSlice'
import store, { AppDispatch, RootState } from '@/redux/store'
import { OutletContextType } from '@/util/interfaces'
import { Download, CircleStop, CirclePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { Calendar24 } from '../shadcn/datePicker'
import TimerRunner from './TimerRunner'
import TimerSwitch from './TimerSwitch'
import TrackerInput from './TrackerInput'
import { TimerStartFormData, TimerStartSchema } from '@/schema/timelogs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Message, useForm } from 'react-hook-form'
import { clearError } from '@/redux/slice/authSlice'
import { startTimerAPI } from '@/redux/slice/timeLogsSlice'

export default function TimeTrackerHeader() {
    const { workspaceName, id } = useOutletContext<OutletContextType>()
    const [isManual, setIsManual] = useState(false)
    const [, setSelectedProjectId] = useState<string | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const { isRunning, startTimestamp } = useSelector((state: RootState) => state.timer)
    const { loading, error } = useSelector((state: RootState) => state.timeLog)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TimerStartFormData>({
        resolver: zodResolver(TimerStartSchema),
        defaultValues: {
            description: '',
            projectId: '',
        },
    })

    useEffect(() => {
        dispatch(clearError())
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error as unknown as Message)
            dispatch(clearError())
        }
    }, [error, dispatch])

    const handleProjectSelect = (projectId: string) => {
        setSelectedProjectId(projectId)
        setValue('projectId', projectId)
    }

    const handleStartTimer = async (data: TimerStartFormData) => {
        try {
            dispatch(startTimer())
            const result = await dispatch(
                startTimerAPI({
                    startTime: new Date().toISOString(),
                    workspaceId: id,
                    description: data.description,
                    projectId: data.projectId,
                }),
            )

            if (startTimerAPI.fulfilled.match(result)) {
                toast.success('Timer started successfully!')
            } else {
                dispatch(stopTimer())
            }
        } catch (error) {
            toast.error('Failed to start timer')
        }
    }

    const handleStopTimer = () => {
        dispatch(stopTimer())
        setTimeout(() => {
            reset()
            setSelectedProjectId('')
        }, 0)
    }

    const handleToggle = () => {
        if (isRunning) {
            handleStopTimer()
            setTimeout(() => {
                const { stopTimestamp } = store.getState().timer
                toast.success(`Start time: ${new Date(startTimestamp!).toLocaleTimeString()}`)
                toast.success(`End time: ${new Date(stopTimestamp!).toLocaleTimeString()}`)
            }, 0)
        } else {
            handleSubmit(handleStartTimer)()
        }
    }
    return (
        <div className="w-full shadow-md py-7 px-9 flex justify-between items-center bg-white">
            <p className="text-xl font-bold flex gap-x-4 items-center justify-center">
                {workspaceName}
                <Download className="text-primary-500 w-5 h-5" />
            </p>
            <div className="w-3/5 flex items-center gap-x-3">
                <form
                    onSubmit={handleSubmit(handleStartTimer)}
                    className="flex items-center gap-x-3 w-full"
                >
                    <TrackerInput
                        id="description"
                        placeholder="Add a description"
                        variant="md"
                        register={register('description')}
                        onProjectSelect={handleProjectSelect}
                        error={errors.description}
                        hasIcon={true}
                    />
                    {!isManual && (
                        <>
                            {isRunning && (
                                <TimerRunner
                                    isRunning={isRunning}
                                    startTimestamp={startTimestamp}
                                />
                            )}
                            <button
                                type="submit"
                                onClick={handleToggle}
                                disabled={loading}
                                className="disabled:opacity-50"
                            >
                                {isRunning ? (
                                    <CircleStop
                                        className="w-12 h-12 fill-accent-500 stroke-white cursor-grab"
                                        strokeWidth={1}
                                    />
                                ) : (
                                    <StartTimer className="text-primary-500 w-12 h-12 cursor-grab" />
                                )}
                            </button>
                        </>
                    )}
                </form>
                {isManual && (
                    <>
                        <Calendar24 />
                        <CirclePlus className="w-16 h-16 fill-primary-500 stroke-white cursor-grab" />
                    </>
                )}
                <TimerSwitch
                    defaultMode="play"
                    onToggle={mode => {
                        setIsManual(mode === 'plus')
                    }}
                />
            </div>
        </div>
    )
}
