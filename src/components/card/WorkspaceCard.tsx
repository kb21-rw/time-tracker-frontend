import { Link } from 'react-router-dom'
import { WorkspaceProps } from '../../util/interfaces'
import { formatDateTime } from '../../util/helpers'
import { useState } from 'react'
import { RenameWorkspaceForm } from '../shared/forms/RenameWorkspaceForm'
import { Pencil } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setWorkspace } from '@/redux/features/workspaceStateSlice'
import Modal from '../shared/modal/Modal'

export default function WorkspaceCard({ name, creationDate, id }: WorkspaceProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const handleWorkspaceSelection = () => {
        dispatch(
            setWorkspace({
                id,
                name,
            }),
        )
    }

    return (
        <div className="border rounded-full border-gray-200 py-3 md:py-4">
            <div className="flex justify-between items-center px-4 md:px-11">
                <Link
                    to={`/manage-workspaces/${id}`}
                    state={{ name, id }}
                    onClick={handleWorkspaceSelection}
                >
                    <p className=" text-sm md:text-lg">{name}</p>
                </Link>
                <div className="flex items-center gap-x-9 md:gap-x-26">
                    <span>{formatDateTime(creationDate).date}</span>
                    <button onClick={() => setIsModalOpen(true)}>
                        <Pencil className="text-primary-500 w-5 h-5" />
                    </button>
                </div>
            </div>
            {
                <Modal title={name} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <RenameWorkspaceForm id={id} setIsModalOpen={setIsModalOpen} />
                </Modal>
            }
        </div>
    )
}
