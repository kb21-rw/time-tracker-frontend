'use client'

import { ColumnsProps, Project } from '@/util/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'

export const ProjectTableColumns = ({
    onEditClick,
}: ColumnsProps<Project>): ColumnDef<Project>[] => [
    {
        accessorKey: 'name',
        header: 'Project',
    },
    {
        accessorKey: 'client.name',
        header: 'Client',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center gap-x-4">
                    <Pencil
                        onClick={() => onEditClick(row.original)}
                        className="text-primary-500 w-5 h-5 cursor-pointer"
                    />
                </div>
            )
        },
    },
]
