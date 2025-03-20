import { Link } from 'react-router-dom'
import { MdModeEditOutline } from 'react-icons/md'
import { WorkspaceProps } from '../../util/interfaces'

export default function WorkspaceCard(props: WorkspaceProps) {
    return (
        <Link to="/workspace-details">
            <div className="border rounded-full border-gray-200 py-3 md:py-4">
                <div className="flex justify-between items-center px-4 md:px-11">
                    <p className=" text-sm md:text-lg">{props.name}</p>
                    <div className="flex items-center gap-x-9">
                        <span>{props.creationDate}</span>
                        <button>
                            <MdModeEditOutline />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
