import { usersTableColumns } from '@/components/ui/UsersTableColums'
import UsersTable from '@/components/ui/UsersTable'
import { getWorkspaceUsers } from '@/redux/slice/workspaceSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { TableUser } from '@/util/interfaces'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function UsersDetails() {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const { workspaceUsers, loading } = useSelector((state: RootState) => state.workspaces)
    const data: TableUser[] = workspaceUsers

    useEffect(() => {
        dispatch(getWorkspaceUsers(id!))
    }, [dispatch])

    return (
        <div className="w-full">
            <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                <p>Users</p>
            </div>
            <UsersTable columns={usersTableColumns} data={data} loading={loading} />
        </div>
    )
}
