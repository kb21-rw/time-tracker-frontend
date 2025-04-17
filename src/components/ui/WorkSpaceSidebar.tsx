import { Clock, Group } from 'lucide-react'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarProvider,
} from '../shadcn/sidebar'
import UserIcon from '../../assets/icons/userIcon'

export default function WorkspaceSidebar() {
    return (
        <SidebarProvider className="p-0 m-0">
            <Sidebar className="relative text-white text-base font-bold">
                <SidebarHeader className="flex flex-row items-center gap-x-2 px-7 py-12">
                    <UserIcon className="text-white h-7 w-7" />
                    <h1> Profile</h1>
                </SidebarHeader>
                <SidebarContent className="px-7">
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <h1 className="text-blue-100 text-base">Track</h1>
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuButton className=" text-base">
                                <Clock />
                                <h1>Timer</h1>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <h1 className="text-blue-100 text-base">Manage</h1>
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuButton className=" text-base">
                                <Group />
                                <h1>Group 1</h1>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}
