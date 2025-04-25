import { Group } from '@/util/interfaces'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { ChevronDown, Plus, Pen } from 'lucide-react'
import groupData from '../../data/groups.json'

export default function GroupsDetails() {
    const groups: Group[] = groupData

    return (
        <div className="w-full py-12">
            <p className="text-xl font-bold px-9 pb-4">Groups</p>
            <div className="w-full flex justify-start items-start px-9 gap-x-4">
                {groups.map(group => (
                    <Collapsible key={group.id} className="w-full border rounded-2xl px-4 py-3">
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
    )
}
