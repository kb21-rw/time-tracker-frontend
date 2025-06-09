import StartTimer from '@/assets/icons/StartTmer'
import TimeLogsGroup from '@/components/card/TimeLogsGroup'
import ManualTimeForm from '@/components/ui/ManualTimeInput'
import TimerRunner from '@/components/ui/TimerRunner'
import TimerSwitch from '@/components/ui/TimerSwitch'
import TrackerInput from '@/components/ui/TrackerInput'
import { startTimer, stopTimer } from '@/redux/features/timerSlice'
import { getUserTimeLogs } from '@/redux/slice/timeLogsSlice'
import store, { AppDispatch, RootState } from '@/redux/store'
import { formatTimeLogs } from '@/util/helpers'
import { OutletContextType } from '@/util/interfaces'
import { CirclePlus, CircleStop, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { useOutletContext } from 'react-router-dom'

export default function TimeTracker() {
    const { workspaceName, id } = useOutletContext<OutletContextType>()
    const [isManual, setIsManual] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { isRunning, startTimestamp } = useSelector((state: RootState) => state.timer)
    const { timeLogs } = useSelector((state: RootState) => state.timeLog)

    useEffect(() => {
        dispatch(getUserTimeLogs(id!))
    }, [dispatch])

    const handleToggle = () => {
        if (isRunning) {
            dispatch(stopTimer())
            setTimeout(() => {
                const { stopTimestamp } = store.getState().timer
                toast.success(`Start time: ${new Date(startTimestamp!).toLocaleTimeString()}`)
                toast.success(`End time: ${new Date(stopTimestamp!).toLocaleTimeString()}`)
            }, 0)
        } else {
            dispatch(startTimer())
        }
    }
    const formattedTimelogs = formatTimeLogs(timeLogs)
    return (
        <div className="bg-white h-full">
            <div className="w-full shadow-md py-7 px-9 flex justify-between items-center bg-white">
                <p className="text-xl font-bold flex gap-x-4 items-center justify-center">
                    {workspaceName}
                    <Download className="text-primary-500 w-5 h-5" />
                </p>
                <div className="w-3/5 flex items-center gap-x-3">
                    <TrackerInput
                        id="description"
                        placeholder="Add a description"
                        variant="md"
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
                            <button onClick={handleToggle}>
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
                    {isManual && (
                        <>
                            <ManualTimeForm />
                            <CirclePlus className="w-16 h-16 fill-primary-500 stroke-white cursor-grab" />
                        </>
                    )}
                    <TimerSwitch
                        defaultMode="play"
                        onToggle={mode => {
                            if (mode === 'plus') {
                                setIsManual(true)
                            } else {
                                setIsManual(false)
                            }
                        }}
                    />
                </div>
            </div>
            <TimeLogsGroup timeLogs={formattedTimelogs} />
        </div>
    )
}
