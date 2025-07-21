import { getBrowserTimezone } from '@/util/helpers'
import { TimezoneDisplayProps } from '@/util/interfaces'

export default function TimezoneDisplay({ className = '', timeZone }: TimezoneDisplayProps) {
    return (
        <div className={`text-md text-gray-600 pb-6 font-inter ${className}`}>
            <span className=" text-primary-800">Time zone:</span> {timeZone}
        </div>
    )
}
