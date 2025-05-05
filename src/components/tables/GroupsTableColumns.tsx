'use client'

import { ColumnDef } from '@tanstack/react-table'
import { GroupsTableColumnsProps, GroupTable } from '../../util/interfaces'
import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import EditModal from '../shared/modal/EditModal'
import EditButtons from '../ui/EditButtons'

export const groupsTableColumns = ({
    setEditClientModal,
    setSelectedRow,
}: GroupsTableColumnsProps): ColumnDef<GroupTable>[] => [
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
            const [isPopupOpen, setIsPopupOpen] = useState(false)
            const [popupPosition, setPopupPosition] = useState<{
                x: number
                y: number
            } | null>(null)

            const handleEditClick = (event: React.MouseEvent<SVGSVGElement>) => {
                const rect = event.currentTarget.getBoundingClientRect()
                setPopupPosition({
                    x: rect.right + window.scrollX - 40,
                    y: rect.bottom + window.scrollY + 50,
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
                        <EditModal
                            isModalOpen={isPopupOpen}
                            onClose={closePopup}
                            popupPosition={popupPosition}
                        >
                            <EditButtons
                                setClientModal={setEditClientModal}
                                rowData={rowData}
                                setSelectedRow={setSelectedRow}
                            />
                        </EditModal>
                    )}
                </div>
            )
        },
    },
]
