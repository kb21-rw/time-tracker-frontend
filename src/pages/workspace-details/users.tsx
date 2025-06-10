import { usersTableColumns } from '@/components/tables/UsersTableColums'
import { getWorkspaceUsers } from '@/redux/slice/workspaceSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { OutletContextType, TableUser } from '@/util/interfaces'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import InviteUserForm from '@/components/shared/forms/InviteUserForm'
import DialogDemo from '@/components/shared/modal/Modal'
import DataTable from '@/components/tables/DataTable'
import WorkspaceHeader from '@/components/shared/ui/WorkspaceHeader'

export default function UsersDetails() {
    const { workspaceName, id } = useOutletContext<OutletContextType>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { workspaceUsers, loading } = useSelector((state: RootState) => state.workspaces)
    const data: TableUser[] = workspaceUsers

    useEffect(() => {
        dispatch(getWorkspaceUsers(id!))
    }, [dispatch])

    return (
        <div className="w-full">
            <WorkspaceHeader
                workspaceName={workspaceName}
                buttonText="User"
                setIsModalOpen={setIsModalOpen}
            />
            <div className="w-full">
                <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                    <p>Users</p>
                </div>
                <DataTable
                    tableName="users"
                    columns={usersTableColumns}
                    data={data}
                    loading={loading}
                />
            </div>
            {
                <DialogDemo
                    title="Invite a user to the workspace"
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <InviteUserForm id={id} setIsModalOpen={setIsModalOpen} />
                </DialogDemo>
            }
        </div>
    )
}
