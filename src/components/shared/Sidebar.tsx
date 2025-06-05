import { Link, useLocation } from 'react-router-dom'
import WorkSpaceSidebar from '../ui/WorkSpaceSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebarOpen, toggleSidebar } from '../../redux/features/sidebarSlice'
import Home from '../../assets/icons/Home'
import Notification from '../../assets/icons/Notification'
import Settings from '../../assets/icons/Settings'
import SidebarToggle from '../../assets/icons/SidebarToggle'
import Tracker from '@/assets/icons/Tracker'
export default function Sidebar() {
    const dispatch = useDispatch()
    const isOpen = useSelector(selectSidebarOpen)
    const location = useLocation()
    const isInWorkspace = location.pathname.startsWith(`/manage-workspaces/`)

    return (
        <div className="fixed left-0 top-0 flex h-screen z-10 text-primary-500">
            <aside className="w-20 bg-primary-800 p-4 flex-shrink-0">
                <div className="h-full px-2 flex flex-col justify-between">
                    <div className="space-y-8 flex flex-col items-center">
                        <Tracker />

                        <Link to="/manage-workspaces">
                            <Home className="h-6 w-6" />
                        </Link>
                    </div>
                    <div>
                        {isInWorkspace && (
                            <button onClick={() => dispatch(toggleSidebar())}>
                                <SidebarToggle />
                            </button>
                        )}
                    </div>
                    <div className="space-y-8 flex flex-col items-center mb-12">
                        <Link to="#">
                            <Notification />
                        </Link>
                        <Link to="#">
                            <Settings />
                        </Link>
                    </div>
                </div>
            </aside>
            <div
                className={`${isOpen ? 'w-48' : 'w-0'} transition-all duration-300 overflow-hidden h-full`}
            >
                <WorkSpaceSidebar />
            </div>
        </div>
    )
}
