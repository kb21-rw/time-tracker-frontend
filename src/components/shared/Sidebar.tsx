import Home from '../../assets/images/homeIcon.svg'
import Profile from '../../assets/images/iconamoon_profile.svg'
import SidebarImage from '../../assets/images/sidebar-close.svg'
import Download from '../../assets/images/download_icon.svg'
import Notification from '../../assets/images/notification-line.svg'
import Settings from '../../assets/images/settings_icon.svg'

export default function Sidebar() {
    return (
        <div>
            <aside className="row-span-5 bg-primary-800 h-screen top-0 bottom-0">
                <div className="space-y-2 h-full px-2 mb-2 py-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <img src={Home} className="h-7 w-7" />
                        <img src={Profile} className="h-7 w-7" />
                    </div>
                    <div>
                        <img src={SidebarImage} className="h-7 w-7" />
                    </div>
                    <div>
                        <img src={Notification} className="h-7 w-7" />
                        <img src={Download} className="h-7 w-7" />
                        <img src={Settings} className="h-7 w-7" />
                    </div>
                </div>
            </aside>
        </div>
    )
}
