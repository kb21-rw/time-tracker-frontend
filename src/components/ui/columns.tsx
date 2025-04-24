'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { TableUser } from '../../util/interfaces'
import UserAddIcon from '@/assets/icons/UserAddIcon'

export const columns: ColumnDef<TableUser>[] = [
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
        cell: () => {
            return (
                <div className="flex items-center gap-x-4">
                    <Trash2 className="text-accent-500 w-5 h-5 cursor-pointer" />
                    <UserAddIcon className="text-primary-500 w-5 h-5 cursor-pointer" />
                </div>
            )
        },
    },
]
