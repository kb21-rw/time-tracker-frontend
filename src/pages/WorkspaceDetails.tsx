import Sidebar from '../components/shared/Sidebar'
import { useLocation, Navigate, useParams, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSidebarOpen } from '../redux/features/sidebarSlice'
import { selectWorkspace } from '@/redux/features/workspaceStateSlice'

export default function WorkspaceDetails() {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
    const [workspaceName, setWorkspaceName] = useState<string>()
    const isOpen = useSelector(selectSidebarOpen)
    const workspace = useSelector(selectWorkspace)

    useEffect(() => {
        if (!id) return
        if (state?.name) {
            setWorkspaceName(state.name)
        } else if (workspace?.name) {
            setWorkspaceName(workspace.name)
        }
    }, [state, workspace])

    if (!id || (!state?.name && !workspace)) {
        return <Navigate to="/manage-workspaces" />
    }

    return (
        <>
            <div className="flex w-full min-h-screen bg-background-accent">
                <Sidebar />
                <div
                    className={`flex-1 transition-all duration-300 ml-20 ${isOpen ? 'md:ml-68' : 'ml-20'}`}
                >
                    <Outlet context={{ workspaceName, id }} />
                </div>
            </div>
        </>
    )
}
