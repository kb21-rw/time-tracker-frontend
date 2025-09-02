import { ColumnDef } from '@tanstack/react-table'
import { TableUser } from '../../util/interfaces'
import { Trash2 } from 'lucide-react'
import UserAddIcon from '@/assets/icons/UserAdd'

export function usersTableColumns(
    onOpenAdminModal: (userId: string) => void,
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
            cell: ({ row }) => (
                <div className="flex items-center justify-center gap-x-4">
                    <button
                        type="button"
                        onClick={() => onOpenAdminModal(row.original.id)}
                        className=" text-primary-500 w-5 h-5 cursor-pointer"
                        aria-label="Make admin"
                    >
                        <UserAddIcon />
                    </button>
                    <button
                        type="button"
                        className="text-accent-500 w-5 h-5 cursor-pointer"
                        onClick={() => onOpenAdminModal(row.original.id)}
                        aria-label="Remove user"
                    >
                        <Trash2 />
                    </button>
                </div>
            ),
        },
    ]
}
