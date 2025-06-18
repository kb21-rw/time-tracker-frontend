import TimeLogsGroup from '@/components/card/TimeLogsGroup'
import TimeTrackerHeader from '@/components/ui/TimeTrackerHeader'
import { getUserTimeLogs } from '@/redux/slice/timeLogsSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { formatTimeLogs } from '@/util/helpers'
import { OutletContextType } from '@/util/interfaces'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useOutletContext } from 'react-router-dom'

export default function TimeTracker() {
    const { id } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { timeLogs } = useSelector((state: RootState) => state.timeLog)

    useEffect(() => {
        dispatch(getUserTimeLogs(id!))
    }, [dispatch, id])

    const formattedTimelogs = formatTimeLogs(timeLogs)
    return (
        <div className="bg-white h-full">
            <TimeTrackerHeader />
            <TimeLogsGroup timeLogs={formattedTimelogs} />
        </div>
    )
}
