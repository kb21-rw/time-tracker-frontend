import RenameClientForm from '@/components/shared/forms/RenameClient'
import DialogDemo from '@/components/shared/modal/Modal'
import WorkspaceHeader from '@/components/shared/ui/WorkspaceHeader'
import { ClientsTableColumns } from '@/components/tables/ClientsTableColumns'
import DataTable from '@/components/tables/DataTable'
import { getWorkspaceClients } from '@/redux/slice/clientSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { ClientTable, OutletContextType } from '@/util/interfaces'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'

export default function ClientsPage() {
    const { workspaceName, id } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { clients, loading } = useSelector((state: RootState) => state.clients)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editClientModal, setEditClientModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<ClientTable | null>(null)

    
    const columns = ClientsTableColumns({
        setEditClientModal,
        setSelectedRow,
    })

    useEffect(() => {
        dispatch(getWorkspaceClients(id!))
    }, [dispatch])

    return (
        <>
            <WorkspaceHeader
                workspaceName={workspaceName}
                buttonText="Client"
                setIsModalOpen={setIsModalOpen}
            />
            <div className="w-full">
                <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                    <p>Clients</p>
                </div>
                <DataTable tableName="clients" columns={columns} data={clients} loading={loading} />
            </div>
            {
                <DialogDemo
                    title={`Edit \u2018${selectedRow?.name || 'Client'}\u2019`}
                    isModalOpen={editClientModal}
                    onClose={() => setEditClientModal(false)}
                >
                    <RenameClientForm clientName={selectedRow?.name} />
                </DialogDemo>
            }
            {
                <DialogDemo
                title='Create Client'
                isModalOpen={isModalOpen}
                onClose={()=> setIsModalOpen(false)}
                >

                </DialogDemo>
            }
        </>
    )
}
