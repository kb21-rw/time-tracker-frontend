import Sidebar from '@/components/shared/Sidebar'
import TimeTracker from './TimeTracker'

export default function DashboardPage() {
    return (
        <div>
            <Sidebar />
            <div className="lg:ml-20">
                <TimeTracker />
            </div>
        </div>
    )
}
