import Sidebar from '../components/shared/Sidebar'
import { useLocation, Navigate, useParams, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectSidebarOpen } from '../redux/features/sidebarSlice'

export default function WorkspaceDetails() {
    const { state } = useLocation()
    const { id } = useParams<{ id: string }>()
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
                    <Outlet context={{ workspaceName, id }} />
                </div>
            </div>
        </>
    )
}
