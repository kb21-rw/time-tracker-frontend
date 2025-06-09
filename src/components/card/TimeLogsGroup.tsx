import { TimeLogsGroupPropsProps } from '@/util/interfaces'
import TimeEntryCard from './TimeEntryCard'
import { groupTimeLogsByDate } from '@/util/helpers'

export default function TimeLogsGroup({ timeLogs }: TimeLogsGroupPropsProps) {
    const formatTitle = (date: string) => {
        if (new Date().getDay() === new Date(date).getDay()) {
            return 'Today'
        } else if (new Date().getDay() - 1 === new Date(date).getDay()) {
            return 'Yesterday'
        } else {
            return new Date(date).toLocaleDateString([], {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
            })
        }
    }
    if (!timeLogs || timeLogs.length === 0) {
        return <p className="text-center text-gray-500">No time logs available.</p>
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
