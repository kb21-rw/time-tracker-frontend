import { TimeLogsGroupProps } from '@/util/interfaces'
import TimeEntryCard from './TimeEntryCard'
import { formatTitle, groupTimeLogsByDate } from '@/util/helpers'

export default function TimeLogsGroup({ timeLogs }: TimeLogsGroupProps) {
    if (!timeLogs || timeLogs.length === 0) {
        return <p className="text-center mt-14 text-gray-500">No time logs available.</p>
    }
    const sortedTimeLogs = groupTimeLogsByDate(timeLogs)

    return (
        <div className="w-full flex flex-col gap-y-2 bg-white mt-5">
            {Object.entries(sortedTimeLogs).map(([date, logs]) => (
                <div key={date} className="mt-8">
                    <p className="font-bold text-xl ml-9 font-inter">{formatTitle(date)}</p>
                    {logs.map(log => (
                        <TimeEntryCard key={log.id} {...log} />
                    ))}
                </div>
            ))}
        </div>
    )
}
