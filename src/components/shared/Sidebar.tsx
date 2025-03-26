import Home from '../../assets/images/homeIcon.svg'
import Profile from '../../assets/images/iconamoon_profile.svg'
import SidebarImage from '../../assets/images/sidebar-close.svg'
import Download from '../../assets/images/download_icon.svg'
import Notification from '../../assets/images/notification-line.svg'
import Settings from '../../assets/images/settings_icon.svg'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div>
            <aside className="row-span-5 bg-primary-800 p-4 h-screen top-0 bottom-0">
                <div className="space-y-2 h-full px-2 mb-2 py-4 flex flex-col justify-between">
                    {/* The links that redirect to specific route will be added later */}
                    <div className="space-y-3">
                        <Link to="#">
                            <img src={Home} className="h-10 w-10" alt="Home" />
                        </Link>
                        <Link to="#">
                            <img src={Profile} className="h-10 w-10" alt="Profile" />
                        </Link>
                    </div>
                    <div>
                        <Link to="#">
                            <img src={SidebarImage} className="h-10 w-10" alt="Sidebar" />
                        </Link>
                    </div>
                    <div>
                        <Link to="#">
                            <img src={Notification} className="h-7 w-7" alt="Notification" />
                        </Link>
                        <Link to="#">
                            <img src={Download} className="h-7 w-7" alt="Download" />
                        </Link>
                        <Link to="#">
                            <img src={Settings} className="h-7 w-7" alt="Settings" />
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    )
}
