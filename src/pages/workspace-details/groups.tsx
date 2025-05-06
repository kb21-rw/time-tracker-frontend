import { Group, GroupTable } from '@/util/interfaces'
import groupData from '../../data/groups.json'
import GroupsTable from '@/components/tables/GroupsTable'
import DialogDemo from '@/components/shared/modal/Modal'
import { useState } from 'react'
import { groupsTableColumns } from '@/components/tables/GroupsTableColumns'
import RenameClientForm from '@/components/shared/forms/RenameClient'
import RenameProject from '@/components/shared/forms/RenameProject'

export default function GroupsDetails() {
    const { clients, projects }: Group = groupData
    const [editClientModal, setEditClientModal] = useState(false)
    const [editProjectModal, setEditProjectModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<GroupTable | null>(null)

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

    const columns = groupsTableColumns({ setEditClientModal, setEditProjectModal, setSelectedRow })

    return (
        <div className="w-full">
            <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                <p>Groups</p>
            </div>

            <GroupsTable data={groupTableData} columns={columns} loading={false} />

            <DialogDemo
                title={`Edit \u2018${selectedRow?.client || 'Client'}\u2019`}
                isModalOpen={editClientModal}
                onClose={() => setEditClientModal(false)}
            >
                <RenameClientForm clientName={selectedRow?.client} />
            </DialogDemo>
            <DialogDemo
                title={`Edit \u2018${selectedRow?.project || 'Project'}\u2019`}
                isModalOpen={editProjectModal}
                onClose={() => setEditProjectModal(false)}
            >
                <RenameProject projectName={selectedRow?.project} />
            </DialogDemo>
        </div>
    )
}
