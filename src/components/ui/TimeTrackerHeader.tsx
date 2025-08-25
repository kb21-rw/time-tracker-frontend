import StartTimer from '@/assets/icons/StartTmer'
import { stopTimer, startTimer } from '@/redux/features/timerSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { TimeTrackerHeaderProps } from '@/util/interfaces'
import { Download, CircleStop } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import TimerRunner from './TimerRunner'
import TimerSwitch from './TimerSwitch'
import TrackerInput from './TrackerInput'
import { TimerStartFormData, TimerStartSchema } from '@/schema/timelogs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Message, useForm } from 'react-hook-form'
import { clearError } from '@/redux/slice/authSlice'
import { getUserTimeLogs, startTimerAPI, stopTimerAPI } from '@/redux/slice/timeLogsSlice'
import ManualTimeLog from '../shared/forms/ManualTimeLog'
import { MenuBar } from '@/components/ui/MenuBar'
import { useIsMobile } from '@/hooks/use-mobile'

export default function TimeTrackerHeader({ id, workspaceName }: TimeTrackerHeaderProps) {
    const [isManual, setIsManual] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
    const [resetProjectTrigger, setResetProjectTrigger] = useState(false)
    const isMobile = useIsMobile()
    const [menuOpen, setMenuOpen] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { isRunning, startTimestamp } = useSelector((state: RootState) => state.timer)
    const { loading, error } = useSelector((state: RootState) => state.timeLog)

    const {
        register,
        handleSubmit,
        reset,
        getValues,
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
    }, [dispatch])

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

    const handleFormCleanUp = () => {
        reset()
        setSelectedProjectId(null)
        setResetProjectTrigger(prev => !prev)
    }

    const handleStartTimer = async (data: TimerStartFormData) => {
        if (isProcessing) return
        setIsProcessing(true)

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

            if (!startTimerAPI.fulfilled.match(result)) {
                dispatch(stopTimer())
            }
        } catch (error) {
            toast.error('Failed to start timer')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleStopTimer = async (data: TimerStartFormData) => {
        if (isProcessing) return
        setIsProcessing(true)

        try {
            dispatch(stopTimer())

            const result = await dispatch(
                stopTimerAPI({
                    endTime: new Date().toISOString(),
                    workspaceId: id,
                    description: data.description,
                    projectId: data.projectId || '',
                }),
            )

            if (stopTimerAPI.fulfilled.match(result)) {
               handleFormCleanUp() 
                dispatch(getUserTimeLogs(id!))
            } else {
                toast.error('Failed to stop timer')
            }
        } catch (error) {
            toast.error('Failed to stop timer')
        } finally {
            setIsProcessing(false)
        }
    }

    const onSubmit = (data: TimerStartFormData) => {
        if (isRunning) {
            handleStopTimer(data)
        } else {
            handleStartTimer(data)
        }
    }

    return (
        <div className="w-full shadow-md py-3 px-3 sm:py-7 sm:px-9 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3">
            <div className="flex items-center gap-x-4">
                {isMobile && <MenuBar open={menuOpen} setOpen={setMenuOpen} />}
                <p className="text-xl font-bold flex gap-x-4 items-center justify-center">
                    {workspaceName}
                    <Download className="text-primary-500 w-5 h-5" />
                </p>
            </div>
            <div className={`${isMobile ? 'w-full' : 'w-3/5'} flex items-center gap-x-3`}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
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
                        resetProject={resetProjectTrigger}
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
                                disabled={loading || isProcessing}
                                className="disabled:opacity-50 transition-opacity"
                            >
                                {isRunning ? (
                                    <CircleStop
                                        className="w-12 h-12 fill-accent-500 stroke-white cursor-pointer"
                                        strokeWidth={1}
                                    />
                                ) : (
                                    <StartTimer className="text-primary-500 w-12 h-12 cursor-pointer" />
                                )}
                            </button>
                        </>
                    )}
                </form>
                {isManual && (
                    <ManualTimeLog
                        description={getValues('description')}
                        projectId={selectedProjectId ?? undefined}
                        workspaceId={id}
                        onSuccess={handleFormCleanUp}
                    />
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
