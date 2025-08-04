import Sidebar from '../components/shared/Sidebar'
import { useLocation, Navigate, useParams, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSidebarOpen } from '../redux/features/sidebarSlice'
import { selectWorkspace } from '@/redux/features/workspaceStateSlice'
import { useIsMobile } from '@/hooks/useMobile'
import { getWorkspaceById } from '@/redux/slice/workspaceSlice'
import { AppDispatch } from '@/redux/store'

export default function WorkspaceDetails() {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
    const [workspaceName, setWorkspaceName] = useState<string>()
    const isOpen = useSelector(selectSidebarOpen)
    const workspace = useSelector(selectWorkspace)
    const isMobile = useIsMobile()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!id) return

        if (state?.name) {
            setWorkspaceName(state.name)
        } else if (workspace?.name) {
            setWorkspaceName(workspace.name)
        }
    }, [state, workspace, id, dispatch])

    if (!id || (!state?.name && !workspace)) {
        return <Navigate to="/manage-workspaces" />
    }

    return (
        <div className="flex w-full min-h-screen bg-background-accent">
            {/* Only show sidebar on desktop */}
            {!isMobile && <Sidebar />}
            <div
                className={`flex-1 transition-all duration-300 ${
                    !isMobile && (isOpen ? 'ml-68' : 'ml-20')
                }`}
            >
                <Outlet context={{ workspaceName, id }} />
            </div>
        </div>
    )
}
