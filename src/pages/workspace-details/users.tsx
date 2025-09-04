import { usersTableColumns } from '@/components/tables/UsersTableColums'
import { getWorkspaceUsers, makeAdmin } from '@/redux/slice/workspaceSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { OutletContextType, TableUser } from '@/util/interfaces'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import InviteUserForm from '@/components/shared/forms/InviteUserForm'
import Modal from '@/components/shared/modal/Modal'
import DataTable from '@/components/tables/DataTable'
import WorkspaceHeader from '@/components/shared/ui/WorkspaceHeader'
import ConfirmationModal from '@/components/shared/modal/confirmationModal'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/util/helpers'
import { AxiosError } from 'axios'

export default function UsersDetails() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false)
    const { workspaceName, id } = useOutletContext<OutletContextType>()
    const [, setIsInviteModalOpen] = useState(false)
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { workspaceUsers, loading } = useSelector((state: RootState) => state.workspaces)
    const data: TableUser[] = workspaceUsers
    const columns = usersTableColumns((userId: number) => {
        setSelectedUserId(userId)
        setIsAdminModalOpen(true)
    })
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const handleMakeAdmin = async () => {
        if (!selectedUserId || !id) return

        try {
            await dispatch(
                makeAdmin({
                    workspaceId: id,
                    userId: selectedUserId,
                }),
            ).unwrap()
            dispatch(getWorkspaceUsers(id))

            toast.success('User successfully made admin')
        } catch (error) {
            handleAxiosError(error as AxiosError)
            toast.error('Failed to make user admin')
        } finally {
            setIsAdminModalOpen(false)
            setSelectedUserId(null)
        }
    }

    const handleCancelMakeAdmin = () => {
        setIsAdminModalOpen(false)
        setSelectedUserId(null)
    }

    useEffect(() => {
        dispatch(getWorkspaceUsers(id!))
    }, [dispatch])

    return (
        <div className="w-full">
            <WorkspaceHeader
                workspaceName={workspaceName}
                buttonText="User"
                setIsModalOpen={setIsInviteModalOpen}
            />
            <div className="w-full ">
                <div className="w-full flex justify-start sm:justify-between px-4 py-6 sm:px-9 sm:py-12 font-bold text-xl">
                    <p className="text-left font-bold text-xl">Users</p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="mx-auto w-full max-w-xs sm:max-w-full px-2 sm:px-0">
                        <DataTable
                            tableName="users"
                            columns={columns}
                            data={data}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            <Modal
                title="Invite a user to the workspace"
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <InviteUserForm id={id} setIsModalOpen={setIsModalOpen} />
            </Modal>

            <Modal
                title="Are you sure you want to
                   remove this user from this
                    workspace?"
                isModalOpen={isRemoveUserModalOpen}
                onClose={() => setIsRemoveUserModalOpen(false)}
            >
                <ConfirmationModal
                    confirm={() => {
                        console.log('User removed')
                    }}
                    cancel={() => {
                        console.log('User not removed')
                    }}
                />
            </Modal>

            <Modal
                title="Are you sure you want to make this user an admin?"
                isModalOpen={isAdminModalOpen}
                onClose={() => setIsAdminModalOpen(false)}
            >
                <ConfirmationModal confirm={handleMakeAdmin} cancel={handleCancelMakeAdmin} />
            </Modal>
        </div>
    )
}
