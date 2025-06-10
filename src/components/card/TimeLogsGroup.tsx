import { TimeLogsGroupProps } from '@/util/interfaces'
import TimeEntryCard from './TimeEntryCard'
import { groupTimeLogsByDate } from '@/util/helpers'

export default function TimeLogsGroup({ timeLogs }: TimeLogsGroupProps) {
    const formatTitle = (date: string) => {
        const inputDate = new Date(date)
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        if (inputDate.toDateString() === today.toDateString()) {
            return 'Today'
        } else if (inputDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday'
        } else {
            return inputDate.toLocaleDateString([], {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
            })
        }
    }
    if (!timeLogs || timeLogs.length === 0) {
        return <p className="text-center mt-14 text-gray-500">No time logs available.</p>
    }
    const sortedTimelogs = groupTimeLogsByDate(timeLogs)

    return (
        <div className="w-full flex flex-col gap-y-2 bg-white mt-5">
            {Object.entries(sortedTimelogs).map(([date, logs]) => (
                <div key={date} className="mt-8">
                    <p className="font-bold text-xl ml-9 font-inter">{formatTitle(date)}</p>
                    {logs.map((log: any) => (
                        <TimeEntryCard key={log.id} {...log} />
                    ))}
                </div>
            ))}
        </div>
    )
}
