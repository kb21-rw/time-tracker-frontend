import Sidebar from '../components/Sidebar'
import { FaPlus } from 'react-icons/fa6'
import WorkspaceCard from '../components/WorkspaceCard'
import { Workspaces } from '../util/interfaces'

const workspaces: Workspaces[] | [] = [
    { id: "1", name: 'The Gym', creationDate: '24/02/2024' },
    { id: "2", name: 'Alu', creationDate: '30/03/2025' },
    { id: "3", name: 'Kepler', creationDate: '29/06/2023' },
    { id: "3", name: 'AUCA', creationDate: '09/11/2025' },
]

export default function WorkspacePage() {
    return (
        <div>
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full bg-white">
                    <div className="w-full shadow-md  py-7 px-5 flex justify-between items-center">
                        <p className="text-xl font-bold">Workspaces</p>
                        <button className="flex items-center gap-x-2 bg-primary-500 rounded-lg text-white px-3 py-2 md:px-5 md:py-3 cursor-pointer">
                            <FaPlus />
                            <span className="hidden sm:inline">New Work Space</span>
                            <span className="sm:hidden">New</span>
                        </button>
                    </div>
                    <div className="pt-15">
                        <div className="flex items-center justify-between mx-4 md:mx-16  text-base md:text-xl font-bold">
                            <p>Workspace</p>
                            <p>Creation date</p>
                        </div>
                        <div className="mt-7 flex flex-col gap-y-2">
                            {
                             workspaces.length > 0 ?
                                workspaces.map(workspace => (
                                    <WorkspaceCard
                                        key={workspace.id}
                                        name={workspace.name}
                                        creationDate={workspace.creationDate}
                                    ></WorkspaceCard>
                                ))
                            :
                                <p className='mx-auto mt-8 text-xl'>You don't have any workspace</p>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
