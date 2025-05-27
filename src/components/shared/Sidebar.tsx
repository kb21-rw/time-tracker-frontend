import Tracker from '../../assets/images/Tracker-icon.svg'
import Home from '../../assets/images/Home-icon.svg'
import SidebarImage from '../../assets/images/sidebar-close.svg'
import Notification from '../../assets/images/notification-line.svg'
import Settings from '../../assets/images/settings_icon.svg'
import { Link, useLocation, useParams } from 'react-router-dom'
import WorkSpaceSidebar from '../ui/WorkSpaceSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebarOpen, toggleSidebar } from '../../redux/features/sidebarSlice'

export default function Sidebar() {
    const dispatch = useDispatch()
    const isOpen = useSelector(selectSidebarOpen)
    const { id } = useParams<{ id: string }>()
    const location = useLocation()
    const isInWorkspace = location.pathname.startsWith(`/manage-workspaces/`)

    return (
        <div className="fixed left-0 top-0 flex h-screen z-10">
            <aside className="w-20 bg-primary-800 p-4 flex-shrink-0">
                <div className="h-full px-2 flex flex-col justify-between">
                    <div className="space-y-8 flex flex-col items-center">
                        <Link to={`/manage-workspaces/${id}/tracker`}>
                            <img src={Tracker} className="h-10 w-10" alt="Tracker" />
                        </Link>
                        <Link to="/manage-workspaces">
                            <img src={Home} className="h-6 w-6" alt="Home" />
                        </Link>
                    </div>
                    <div>
                        {isInWorkspace && (
                            <button onClick={() => dispatch(toggleSidebar())}>
                                <img src={SidebarImage} className="h-10 w-10" alt="Sidebar" />
                            </button>
                        )}
                    </div>
                    <div className="space-y-8 flex flex-col items-center">
                        <Link to="#">
                            <img src={Notification} className="h-10 w-10" alt="Notification" />
                        </Link>
                        <Link to="#">
                            <img src={Settings} className="h-10 w-10" alt="Settings" />
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
