import Sidebar from '../components/shared/Sidebar'
import { Download, Plus } from 'lucide-react'
import { useLocation, Navigate, useParams, Outlet } from 'react-router-dom'
import { useState } from 'react'
import DialogDemo from '@/components/shared/shared/Modal'
import InviteUserForm from '@/components/shared/forms/InviteUserForm'

export default function WorkspaceDetails() {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    if (!state || !id) return <Navigate to="/manage-workspaces" />
    const { name } = state

    return (
        <>
            <div className="flex w-full justify-around">
                <Sidebar />

                <div className="bg-white w-full">
                    <div className="w-full shadow-md py-7 px-9 flex justify-between items-center">
                        <p className="text-xl font-bold flex gap-x-4 items-center">
                            {name}
                            <Download className="text-primary-500 w-5 h-5" />
                        </p>
                        <button
                            className="flex items-center gap-x-2 bg-primary-500 rounded-lg text-white px-3 py-2 md:px-5 md:py-3 cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">New User</span>
                            <span className="sm:hidden">New</span>
                        </button>
                    </div>
                    <div>
                            <Outlet />
                        </div>
                </div>
            </div>
            {
                <DialogDemo
                    title="Invite a user to the workspace"
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <InviteUserForm id={id} setIsModalOpen={setIsModalOpen} />
                </DialogDemo>
            }
        </>
    )
}
