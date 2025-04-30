import { Group, GroupTable } from '@/util/interfaces'
import groupData from '../../data/groups.json'
import GroupsTable from '@/components/tables/GroupsTable'
import DialogDemo from '@/components/shared/modal/Modal'
import { useState } from 'react'
import { groupsTableColumns } from '@/components/tables/GroupsTableColumns'
import RenameClientForm from '@/components/shared/forms/RenameClient'

export default function GroupsDetails() {
    const { clients, projects }: Group = groupData
    const [editClientModal, setEditClientModal] = useState(false)
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

    const columns = groupsTableColumns({ setEditClientModal, setSelectedRow })

    return (
        <div className="w-full">
            <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                <p>Groups</p>
            </div>

            <GroupsTable data={groupTableData} columns={columns} loading={false} />

            <DialogDemo
                title={`Edit ${selectedRow?.client || 'Client'}`}
                isModalOpen={editClientModal}
                onClose={() => setEditClientModal(false)}
            >
                <RenameClientForm clientName={selectedRow?.client} />
            </DialogDemo>
        </div>
    )
}
