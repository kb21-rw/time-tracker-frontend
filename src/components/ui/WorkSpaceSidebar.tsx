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
import { Link, useParams, useLocation } from 'react-router-dom'
import FluentGroup from '../../assets/icons/FluentGroup'

export default function WorkspaceSidebar() {
    const { id } = useParams<{ id: string }>()
    const location = useLocation()
    const isInWorkspace = location.pathname.includes('/manage-workspaces/')

    return (
        <SidebarProvider className="p-0 m-0">
            <Sidebar className="relative text-white text-base font-bold">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem className="px-7">
                            <SidebarMenuButton size="lg" className="my-1">
                                <Link to="/tracker" className="flex items-center gap-2">
                                    <Clock
                                        fill="white"
                                        stroke="currentColor"
                                        className="text-primary-500 text-2xl w-7 h-7"
                                    />
                                    <p className="text-xl">Track</p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
<<<<<<< HEAD
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
=======
                <SidebarContent className="px-7 mb-10">
                    {isInWorkspace && (
                        <SidebarGroup className="my-auto space-y-2">
                            <SidebarGroupLabel>
                                <h1 className="text-blue-100 text-base">Manage</h1>
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="text-base">
                                        <Link
                                            to={`/manage-workspaces/${id}`}
                                            className="flex gap-2"
                                        >
                                            <FluentGroup className="w-7 h-7" />
                                            <h1>Users</h1>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="text-base">
                                        <Link
                                            to={`/manage-workspaces/${id}/groups`}
                                            className="flex gap-2"
                                        >
                                            <Group className="w-7 h-7" />
                                            <h1>Groups</h1>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    )}
>>>>>>> 85161f2038a5fc2f1116a315f2ec2ec6b244f05b
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}
