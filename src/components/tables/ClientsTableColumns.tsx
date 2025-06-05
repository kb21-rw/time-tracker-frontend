'use client'

import { ClientTable, ColumnsProps } from '@/util/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'

export const ClientsTableColumns = ({
    onEditClick,
}: ColumnsProps<ClientTable>): ColumnDef<ClientTable>[] => [
    {
        accessorKey: 'name',
        header: 'Clients',
    },
    {
        accessorKey: 'actions',
        header: () => {
            return (
                <div className="mx-10 w-1/2">
                    <h1 className="text-end">Actions</h1>
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center gap-x-4 relative">
                    <Pencil
                        onClick={() => onEditClick(row.original)}
                        className="text-primary-500 w-5 h-5 cursor-pointer"
                    />
                </div>
            )
        },
    },
]
