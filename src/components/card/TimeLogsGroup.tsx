import TimeEntryCard from './TimeEntryCard'

export default function TimeLogsGroup({ time }: { time?: string }) {
    const Timelogs = [
        {
            id: '1',
            description: 'Worked on the project',
            project: 'Project 1',
            client: 'Client 1',
            startTime: '10:00',
            endTime: '11:30',
            duration: '1h 30m',
        },
        {
            id: '2',
            description: 'Worked on the project',
            project: 'Project 2',
            client: 'Client 2',
            startTime: '10:00',
            endTime: '11:30',
            duration: '1h 30m',
        },
    ]
    return (
        <div className="w-full flex flex-col gap-y-2 bg-white mt-5">
            <p className="font-bold text-xl ml-9 font-inter">{time}</p>
            {Timelogs.map(log => (
                <TimeEntryCard key={log.id} {...log} />
            ))}
        </div>
    )
}
