import Download from '@/assets/icons/Download'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { OutletContextType } from '@/util/interfaces'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ReportTable from '../components/ui/ReportTable'

const mockReportData = {
    user: {
        fullName: 'Keza Uwase',
    },
    projects: [
        {
            id: 1,
            name: 'Typing',
            client: 'The Gym',
            activities: [
                { name: 'Typing exercise', duration: '10:40:00' },
                { name: 'Typing master', duration: '07:30:00' },
                { name: 'Advanced typing', duration: '15:20:50' },
            ],
        },
        {
            id: 2,
            name: 'Javascript',
            client: 'ALU',
            activities: [
                { name: 'Introduction', duration: '2:00:00' },
                { name: 'Exercises', duration: '20:56:30' },
                { name: 'Assignment', duration: '6:06:05' },
            ],
        },
        {
            id: 3,
            name: 'CSS',
            client: 'The Gym',
            activities: [{ name: 'Designing', duration: '7:50:40' }],
        },
        {
            id: 4,
            name: 'Codewars',
            client: 'ALU',
            activities: [{ name: 'Codewars session', duration: '14:30:02' }],
        },
    ],
}

export default function ReportPage() {
    const { workspaceName } = useOutletContext<OutletContextType>()
    const [startDate] = useState<Date>(new Date())
    const [endDate] = useState<Date>(new Date())

    return (
        <div>
            <div className="w-full flex justify-start sm:justify-between px-4 py-6 sm:px-9 sm:py-12 font-bold text-xl">
                <p>{workspaceName} Report</p>
            </div>
            <div className="px-4 sm:px-9 pb-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <DateRangePicker start={startDate} end={endDate} />
                        <button>
                            <Download className="text-primary-500 w-8 h-8 cursor-pointer" />
                        </button>
                    </div>
                </div>

                {/* Table Headers */}
                <div className="grid grid-cols-[1fr_1.5fr_auto] gap-4 px-6 py-3 bg-white border-b border-gray-200 font-bold text-sm">
                    <div>Projects</div>
                    <div>Activities</div>
                    <div className="text-right min-w-[100px]">Duration</div>
                </div>

                {/* User Info */}
                <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                    <span className="font-medium text-gray-900">
                        {mockReportData.user.fullName}
                    </span>
                </div>

                {/* Projects and Activities */}
                <ReportTable {...mockReportData} />
            </div>
        </div>
    )
}
