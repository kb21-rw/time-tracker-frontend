import Sidebar from '@/components/shared/Sidebar'
import { selectSidebarOpen } from '@/redux/features/sidebarSlice'
import { useSelector } from 'react-redux'

export default function TimeTracker() {
    const isOpen = useSelector(selectSidebarOpen)
    return (
        <div>
            <Sidebar />
            <div
                className={`bg-white flex-1 transition-all duration-300 ${isOpen ? 'ml-84' : 'ml-20'}`}
            >
                <h1>Time tracker page</h1>
            </div>
        </div>
    )
}
