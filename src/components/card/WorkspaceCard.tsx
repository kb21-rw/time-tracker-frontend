import { Link } from 'react-router-dom'
import { MdModeEditOutline } from 'react-icons/md'
import { WorkspaceProps } from '../../util/interfaces'
import { formatDate } from '../../util/helpers'
import DialogDemo from '../shared/shared/Modal'
import { useState } from 'react'
import { RenameWorkspaceForm } from '../shared/forms/RenameWorkspaceForm'

export default function WorkspaceCard({ name, creationDate, id }: WorkspaceProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const formattedDate = formatDate(creationDate)

    return (
        <div className="border rounded-full border-gray-200 py-3 md:py-4">
            <div className="flex justify-between items-center px-4 md:px-11">
                <Link to={`/manage-workspaces/${id}`} state={{ name, id }}>
                    <p className=" text-sm md:text-lg">{name}</p>
                </Link>
                <div className="flex items-center gap-x-9">
                    <span>{formattedDate}</span>
                    <button onClick={() => setIsModalOpen(true)}>
                        <MdModeEditOutline />
                    </button>
                </div>
            </div>
            {
                <DialogDemo
                    title={name}
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <RenameWorkspaceForm id={id} setIsModalOpen={setIsModalOpen} />
                </DialogDemo>
            }
        </div>
    )
}
