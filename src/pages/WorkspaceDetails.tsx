import Sidebar from '../components/shared/Sidebar'
import { Download, Plus } from 'lucide-react'
import { useLocation, Navigate, useParams, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DialogDemo from '@/components/shared/modal/Modal'
import InviteUserForm from '@/components/shared/forms/InviteUserForm'
import { useSelector } from 'react-redux'
import { selectSidebarOpen } from '../redux/features/sidebarSlice'

export default function WorkspaceDetails() {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [workspaceName, setWorkspaceName] = useState<string | null>(null)
    const navigate = useNavigate()
    const isOpen = useSelector(selectSidebarOpen)

    useEffect(() => {
        if (state?.name) {
            setWorkspaceName(state.name)
        } else if (!state && !workspaceName && id) {
            navigate('/manage-workspaces')
        }
    }, [state, id])

    if (!id || (!state?.name && !workspaceName)) {
        return <Navigate to="/manage-workspaces" />
    }

    return (
        <>
            <div className="flex w-full min-h-screen bg-background-accent">
                <Sidebar />
                <div
                    className={`flex-1 transition-all duration-300 ml-20 ${isOpen ? 'md:ml-68' : 'ml-20'}`}
                >
                    <div className="w-full shadow-md py-7 px-9 flex justify-between items-center bg-white">
                        <p className="text-xl font-bold flex gap-x-4 items-center">
                            {workspaceName || state?.name}
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
                        <Outlet context={{ workspaceName }} />
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
