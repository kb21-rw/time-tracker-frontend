import Home from '../../assets/images/homeIcon.svg'
import SidebarImage from '../../assets/images/sidebar-close.svg'
import Notification from '../../assets/images/notification-line.svg'
import Settings from '../../assets/images/settings_icon.svg'
import { Link } from 'react-router-dom'
import WorkSpaceSidebar from '../ui/WorkSpaceSidebar'
import { useState } from 'react'

export default function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

    return (
        <div className="flex">
            <aside className="sticky w-20 left-0 row-span-5 bg-primary-800 p-4 h-screen top-0 bottom-0">
                <div className="space-y-2 h-full px-2 mb-2 py-4 flex flex-col justify-between">
                    {/* The links that redirect to specific route will be added later */}
                    <div className="space-y-3">
                        <Link to="/tracker">
                            <img src={Home} className="h-10 w-10" alt="Home" />
                        </Link>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setSidebarOpen(previous => !previous)
                            }}
                        >
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
            <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                <WorkSpaceSidebar />
            </div>
        </div>
    )
}
