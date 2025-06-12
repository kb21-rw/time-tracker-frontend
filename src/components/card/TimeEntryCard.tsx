import { TimeEntryCardProps } from '@/util/interfaces'
import { Pencil } from 'lucide-react'

export default function TimeEntryCard({
    description,
    project,
    client,
    startTime,
    endTime,
    duration,
}: TimeEntryCardProps) {
    return (
        <div className="grid grid-cols-6 lg:grid-cols-7 gap-4 items-center justify-center bg-white px-9 py-8 drop-shadow-md font-inter">
            <div className={`lg:min-w-50 col-span-2 capitalize ${description ? '' : 'text-black/20'}`}>
                {description ? description : 'No description'}
            </div>
            <div className="col-span-2 w-full">
                {project ? (
                    <div className="w-full flex flex-col justify-center lg:flex-row lg:items-center gap-4">
                        <li className={`list-disc marker:text-primary-500 marker:text-xl marker:text-center truncate lg:w-1/2 font-medium`}>{project}</li>
                        <li className='marker:text-xs text-black/50 lg:text-center'>{client}</li>
                    </div>
                ) : null}
            </div>

            <div className="hidden lg:flex justify-center lg:gap-x-6 items-center">
                <p>{startTime}</p>
                <span> &mdash; </span>
                <p>{endTime}</p>
            </div>
            <div className="text-right">{duration}</div>
            <div className="flex justify-center items-center">
                <button className="text-primary-500">
                    <Pencil className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
