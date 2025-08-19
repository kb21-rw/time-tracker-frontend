import { ColumnDef } from '@tanstack/react-table'
import { TableUser } from '../../util/interfaces'
import UserIcon from '@/assets/icons/User'
import { Trash2 } from 'lucide-react'
import UserAddIcon from '@/assets/icons/UserAdd'

export function usersTableColumns(onOpenAdminModal: () => void): ColumnDef<TableUser>[] {
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
            cell: () => (
                <div className="flex items-center justify-center gap-x-4">
                    <UserAddIcon
                        className="text-primary-500 w-5 h-5 cursor-pointer"
                        onClick={onOpenAdminModal}
                    />
                    <Trash2 className="text-accent-500 w-5 h-5 cursor-pointer" />
                </div>
            ),
        },
    ]
}
