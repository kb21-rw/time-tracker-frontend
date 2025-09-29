import { ReportDataProps } from '@/util/interfaces'

export default function ReportTable(mockReportData: ReportDataProps) {
    return (
        <div className="bg-white">
            {mockReportData.projects.map((project, projectIndex) => (
                <div
                    key={project.id}
                    className={`${projectIndex !== mockReportData.projects.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                    {/* Project Row with First Activity */}
                    <div className="grid grid-cols-[1fr_1.5fr_auto] gap-4 px-6 py-4 items-center">
                        {/* Project Name and Client */}
                        <div className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold text-lg mt-0.5">•</span>
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">{project.name}</span>
                                <span className="text-sm text-gray-500">{project.client}</span>
                            </div>
                        </div>

                        {/* First Activity */}
                        <div className="text-gray-700">{project.activities[0].name}</div>

                        {/* First Activity Duration */}
                        <div className="text-right text-gray-900 min-w-[100px]">
                            {project.activities[0].duration}
                        </div>
                    </div>

                    {/* Remaining Activities */}
                    {project.activities.slice(1).map((activity, activityIndex) => (
                        <div
                            key={activityIndex}
                            className="grid grid-cols-[1fr_1.5fr_auto] gap-4 px-6 py-4 items-center"
                        >
                            {/* Empty space for project column */}
                            <div></div>

                            {/* Activity Name */}
                            <div className="text-gray-700">{activity.name}</div>

                            {/* Activity Duration */}
                            <div className="text-right text-gray-900 min-w-[100px]">
                                {activity.duration}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
