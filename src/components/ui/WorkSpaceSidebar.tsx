import { Calendar, Group, Timer, User } from 'lucide-react'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from '../shadcn/sidebar'

export default function WorkspaceSidebar() {
    return (
        <SidebarProvider className='p-0 m-0'>
            <Sidebar className="relative text-white text-base font-bold">
                <SidebarHeader className="flex flex-row items-center gap-x-2 px-7 py-12">
                    <User />
                    <h1> Profile</h1>
                </SidebarHeader>
                <SidebarContent className="px-7">
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <h1 className="text-blue-100 text-base">Track</h1>
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuButton className=' text-base'>
                                <Timer />
                                <h1>Timer</h1>
                            </SidebarMenuButton>
                            <SidebarMenuItem>
                                <SidebarMenuButton className=' text-base'>
                                    <Calendar />
                                    <h1>Calendar</h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <h1 className="text-blue-100 text-base">Manage</h1>
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuButton className=' text-base'>
                                <Group />
                                <h1>Team 1</h1>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            </SidebarProvider>
        
    )
}
