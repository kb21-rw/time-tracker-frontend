import { Group, GroupTable } from '@/util/interfaces'
import groupData from '../../data/groups.json'
import GroupsTable from '@/components/ui/GroupsTable'
import { groupsTableColumns } from '@/components/ui/GroupsTableColumns'

export default function GroupsDetails() {
    const { clients, projects }: Group = groupData

    const groupTableData: GroupTable[] = clients
        .map(client => {
            const clientProjects = projects.filter(project => project.clientId === client.id)
            return clientProjects.map(project => ({
                id: `${client.id}-${project.id}`,
                client: client.name,
                project: project.name,
                actions: '',
            }))
        })
        .flat()

    return (
        <div className="w-full">
            <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                <p>Groups</p>
            </div>

            <GroupsTable data={groupTableData} columns={groupsTableColumns} loading={false} />
        </div>
    )
}
