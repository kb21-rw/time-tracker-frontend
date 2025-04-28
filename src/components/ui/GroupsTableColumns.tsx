'use client'

import { ColumnDef } from '@tanstack/react-table'
import { GroupTable } from '../../util/interfaces'
import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import EditPopUpModal from '../shared/shared/EditPopUpModal'
import EditButtons from './EditButtons'

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
            const _rowData = row.original

            const [isPopupOpen, setIsPopupOpen] = useState(false)
            const [popupPosition, setPopupPosition] = useState<{
                x: number
                y: number
            } | null>(null)

            const handleEditClick = (event: React.MouseEvent<SVGSVGElement>) => {
                const rect = event.currentTarget.getBoundingClientRect()
                setPopupPosition({
                    x: rect.right + window.scrollX - 20,
                    y: rect.bottom + window.scrollY + 40,
                })
                setIsPopupOpen(true)
            }

            const closePopup = () => {
                setIsPopupOpen(false)
                setPopupPosition(null)
            }
            return (
                <div className="flex items-center justify-center gap-x-4 relative">
                    <Pencil
                        onClick={handleEditClick}
                        className="text-primary-500 w-5 h-5 cursor-pointer"
                    />
                    {isPopupOpen && popupPosition && (
                        <EditPopUpModal
                            isModalOpen={isPopupOpen}
                            onClose={closePopup}
                            popupPosition={popupPosition}
                        >
                            <EditButtons />
                        </EditPopUpModal>
                    )}
                </div>
            )
        },
    },
]
