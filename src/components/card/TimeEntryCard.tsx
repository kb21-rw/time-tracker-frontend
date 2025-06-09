import { TimeEntryCardProps } from '@/util/interfaces'
import { Pencil } from 'lucide-react'

export default function TimeEntryCard({
    id,
    description,
    project,
    client,
    startTime,
    endTime,
    duration,
}: TimeEntryCardProps) {
    console.log(id)
    return (
        <div className="grid grid-cols-7 gap-4 items-center justify-center bg-white px-9 py-8 drop-shadow-md font-inter">
            <div className="min-w-80 col-span-2">{description}</div>
            <div>
                <li className="list-disc marker:text-primary-500 truncate">{project}</li>
            </div>
            <div>{client}</div>
            <div className="flex justify-center gap-x-10 items-center">
                <p>{startTime}</p>
                <span> &mdash; </span>
                <p>{endTime}</p>
            </div>
            <div className="text-center">{duration}</div>
            <div>
                <button className="text-primary-500">
                    <Pencil className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
