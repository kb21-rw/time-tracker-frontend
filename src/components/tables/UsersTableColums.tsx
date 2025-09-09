import { ColumnDef } from '@tanstack/react-table'
import { TableUser } from '../../util/interfaces'
import { Trash2 } from 'lucide-react'
import UserAddIcon from '@/assets/icons/UserAdd'

export function usersTableColumns(
    onOpenAdminModal: (userId: number) => void,
    onOpenDeleteUserModal: (userId: number) => void,
): ColumnDef<TableUser>[] {
    return [
        {
            accessorKey: 'fullName',
            header: 'Full Names',
        },
        {
            accessorKey: 'email',
            header: 'Email Address',
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const user = row.original
                const isAdmin = user.roles === 'Admin'
                return (
                    <div className="flex items-center justify-center gap-x-4">
                        <button
                            type="button"
                            onClick={() => onOpenAdminModal(user.id)}
                            className={`text-primary-500 w-5 h-5 cursor-pointer ${isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label="Make admin"
                            disabled={isAdmin}
                        >
                            <UserAddIcon />
                        </button>
                        <button
                            type="button"
                            className="text-accent-500 w-5 h-5 cursor-pointer"
                            onClick={() => onOpenDeleteUserModal(user.id)}
                            aria-label="Remove user"
                        >
                            <Trash2 />
                        </button>
                    </div>
                )
            },
        },
    ]
}
