'use client'

import { ColumnDef } from '@tanstack/react-table'
import { GroupTable } from '../../util/interfaces'
import { Pencil, Plus } from 'lucide-react'

export const groupsTableColumns: ColumnDef<GroupTable>[] = [
    {
        accessorKey: 'client',
        header: () => {
            return (
                <div className="flex gap-6.5 items-center">
                    <p>Clients</p>
                    <Plus className="w-5 h-5" />
                </div>
            )
        },
    },
    {
        accessorKey: 'project',
        header: () => {
            return (
                <div className="flex gap-6.5 items-center">
                    <p>Projects</p>
                    <Plus className="w-5 h-5" />
                </div>
            )
        },
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const rowData = row.original
            return (
                <div className="flex items-center justify-center gap-x-4">
                    <Pencil
                        onClick={() => console.log(rowData)}
                        className="text-primary-500 w-5 h-5"
                    />
                </div>
            )
        },
    },
]
