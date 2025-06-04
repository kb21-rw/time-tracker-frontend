import { Clock, Group, Users } from 'lucide-react'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarProvider,
    SidebarMenuItem,
} from '../shadcn/sidebar'
import { NavLink, useParams, useLocation } from 'react-router-dom'
import FluentProject from '../../assets/icons/FluentProject'

export default function WorkspaceSidebar() {
    const { id } = useParams<{ id: string }>()
    const location = useLocation()
    return (
        <SidebarProvider className="p-0 m-0">
            <Sidebar className="relative text-white text-base font-bold">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem className="px-7">
                            <SidebarMenuButton
                                size="lg"
                                className="my-1"
                                isActive={location.pathname === `/manage-workspaces/${id}/tracker`}
                            >
                                <NavLink
                                    to={`/manage-workspaces/${id}/tracker`}
                                    className="flex items-center gap-2"
                                >
                                    <Clock
                                        fill="white"
                                        stroke="currentColor"
                                        className="text-primary-500 text-2xl w-7 h-7"
                                    />
                                    <p className="text-xl">Track</p>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent className="px-7 mb-10">
                    <SidebarGroup className="my-auto space-y-2">
                        <SidebarGroupLabel>
                            <h1 className="text-blue-100 text-base">Manage</h1>
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="text-base"
                                    isActive={location.pathname === `/manage-workspaces/${id}`}
                                >
                                    <NavLink to={`/manage-workspaces/${id}`} className="flex gap-2">
                                        <Users className="w-7 h-7" />
                                        <h1>Users</h1>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="text-base"
                                    isActive={
                                        location.pathname === `/manage-workspaces/${id}/clients`
                                    }
                                >
                                    <NavLink
                                        to={`/manage-workspaces/${id}/clients`}
                                        className="flex gap-2"
                                    >
                                        <Group className="w-7 h-7" />
                                        <h1>Clients</h1>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="text-base"
                                    isActive={
                                        location.pathname === `/manage-workspaces/${id}/projects`
                                    }
                                >
                                    <NavLink
                                        to={`/manage-workspaces/${id}/projects`}
                                        className="flex gap-2"
                                    >
                                        <FluentProject className="w-7 h-7" />
                                        <h1>Projects</h1>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}
