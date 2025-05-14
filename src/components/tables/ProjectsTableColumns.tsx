'use client'

import { Project, ProjectTableColumnsProps } from '@/util/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'

export const ProjectTableColumns = ({
    setEditProjectModal,
    setSelectedRow,
}: ProjectTableColumnsProps): ColumnDef<Project>[] => [
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
            const rowData = row.original

            const handleEditClick = () => {
                setEditProjectModal(true)
                setSelectedRow(rowData)
            }

            return (
                <div className="flex items-center gap-x-4">
                    <Pencil
                        onClick={handleEditClick}
                        className="text-primary-500 w-5 h-5 cursor-pointer"
                    />
                </div>
            )
        },
    },
]
