import Home from '../../assets/images/homeIcon.svg'
import SidebarImage from '../../assets/images/sidebar-close.svg'
import Notification from '../../assets/images/notification-line.svg'
import Settings from '../../assets/images/settings_icon.svg'
import { Link } from 'react-router-dom'
import WorkSpaceSidebar from '../ui/WorkSpaceSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebarOpen, toggleSidebar } from '../../redux/features/sidebarSlice'

export default function Sidebar() {
    const dispatch = useDispatch()
    const isOpen = useSelector(selectSidebarOpen)

    return (
        <div className="fixed left-0 top-0 flex h-screen z-10">
            <aside className="w-20 bg-primary-800 p-4 flex-shrink-0">
                <div className="h-full px-2 flex flex-col justify-between">
                    {/* The links that redirect to specific route will be added later */}
                    <div className="space-y-3">
                        <Link to="/tracker">
                            <img src={Home} className="h-10 w-10" alt="Home" />
                        </Link>
                    </div>
                    <div>
                        <button onClick={() => dispatch(toggleSidebar())}>
                            <img src={SidebarImage} className="h-10 w-10" alt="Sidebar" />
                        </button>
                    </div>
                    <div className="space-y-8">
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
                className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden bg-primary-800 h-full`}
            >
                <WorkSpaceSidebar />
            </div>
        </div>
    )
}
