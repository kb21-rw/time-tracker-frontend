import TimeLogsGroup from '@/components/card/TimeLogsGroup'
import TimeTrackerHeader from '@/components/ui/TimeTrackerHeader'
import { setDescription, startTimer } from '@/redux/features/timerSlice'
import { getActiveTimeLog, getUserTimeLogs } from '@/redux/slice/timeLogsSlice'
import { AppDispatch } from '@/redux/store'
import { formatTimeLogs } from '@/util/helpers'
import { OutletContextType, TimeLog } from '@/util/interfaces'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { useOutletContext } from 'react-router-dom'

export default function TimeTracker() {
    const { id } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const [timeLogs, setTimeLogs] = useState<TimeLog[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const timeLogs = await dispatch(getUserTimeLogs(id!)).unwrap()
            setTimeLogs(timeLogs)
        }

        if (id) fetchData()
    }, [dispatch, id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activeLog = await dispatch(getActiveTimeLog(id!)).unwrap()
                if (activeLog) {
                    dispatch(setDescription(activeLog.description || ''))
                    dispatch(startTimer(new Date(activeLog.startTime).getTime()))
                }
            } catch (err) {
                toast.error('⚠️ Error fetching active time log:')
            }
        }

        if (id) fetchData()
    }, [dispatch, id])

    const formattedTimelogs = formatTimeLogs(timeLogs)
    return (
        <div className="bg-white h-full">
            <TimeTrackerHeader />
            <TimeLogsGroup timeLogs={formattedTimelogs} />
        </div>
    )
}
