import Sidebar from '../components/shared/Sidebar'
import WorkSpaceSidebar from '../components/ui/WorkSpaceSidebar'
import { Download, ChevronDown, Plus, Pen } from 'lucide-react'
import UsersTable from '../components/ui/UsersTable'
import { columns } from '../components/ui/columns'
import { TableUser } from '@/util/interfaces'
import { Group } from '../util/interfaces'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/shadcn/collapsible'
import { useLocation, Navigate } from 'react-router-dom'
import userData from '../data/users.json'
import groupData from '../data/groups.json'
export default function WorkspaceDetails() {
    const { state } = useLocation()
    if (!state) return <Navigate to="/workspace" />
    const { name } = state
    const data: TableUser[] = userData
    const groups: Group[] = groupData
    return (
        <div className="flex w-full justify-around">
            <div className="w-27">
                <Sidebar />
            </div>
            <div className="">
                <WorkSpaceSidebar />
            </div>
            <div className="bg-white w-full">
                <div className="w-full shadow-md py-7 px-5 flex justify-between items-center">
                    <p className="text-xl font-bold">{name}</p>
                    <button className="flex items-center gap-x-2 bg-primary-500 rounded-lg text-white px-3 py-2 md:px-5 md:py-3 cursor-pointer">
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">New User</span>
                        <span className="sm:hidden">New</span>
                    </button>
                </div>
                <div className="w-full">
                    <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                        <p>Users</p>
                        <Download className="text-primary-500" />
                    </div>
                    <UsersTable columns={columns} data={data} />
                </div>
                <div className="w-full py-12">
                    <p className="text-xl font-bold px-9 pb-4">Groups</p>
                    <div className="w-full flex justify-start items-start px-9 gap-x-4">
                        {groups.map(group => (
                            <Collapsible
                                key={group.id}
                                className="w-full border rounded-2xl px-4 py-3"
                            >
                                <CollapsibleTrigger className="w-full text-lg font-bold flex justify-between items-center">
                                    <button className="w-full flex justify-between items-center">
                                        {group.name} <ChevronDown className="w-5 h-5" />
                                    </button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="w-full py-4">
                                    <div className="w-full flex justify-between">
                                        <p className="text-lg font-medium mb-5">Projects list</p>
                                        <button className="h-fit self-right flex items-center justify-between gap-x-1 bg-white text-primary-500 border-2 border-primary-500 rounded-md px-4 py-1">
                                            <Plus className="w-4 h-4" /> Add Project
                                        </button>
                                    </div>
                                    {group.projects.map(project => (
                                        <div
                                            key={project.id}
                                            className="w-full flex justify-between items-center px-3 py-3 rounded-md"
                                        >
                                            <p>{project.names}</p>
                                            <Pen className="w-4 h-4 text-primary-500" />
                                        </div>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
