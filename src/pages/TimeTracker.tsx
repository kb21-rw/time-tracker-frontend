import TimeLogsGroup from '@/components/card/TimeLogsGroup'
import LoadingSpinner from '@/components/shared/ui/LoadingSpinner'
import TimeTrackerHeader from '@/components/ui/TimeTrackerHeader'
import { getUserTimeLogs } from '@/redux/slice/timeLogsSlice'
import { getWorkspacesByUser } from '@/redux/slice/workspaceSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { formatTimeLogs } from '@/util/helpers'
import { OutletContextType } from '@/util/interfaces'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useOutletContext } from 'react-router-dom'

export default function TimeTracker() {
    const outletContext = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { timeLogs } = useSelector((state: RootState) => state.timeLog)
    const [workspaceInfo, setWorkspaceInfo] = useState({ id: '', workspaceName: '' })
    const { workspaces, loading } = useSelector((state: RootState) => state.workspaces)
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const isAdmin = user.roles === 'Admin'
    const id = outletContext?.id
    const workspaceName = outletContext?.workspaceName

    useEffect(() => {
        if (isAdmin) {
            if (id && workspaceName) {
                setWorkspaceInfo({ id, workspaceName })
                dispatch(getUserTimeLogs(id))
            }
            return
        }

        if (workspaces.length === 0) {
            dispatch(getWorkspacesByUser())
            return
        }

        const [firstWorkspace] = workspaces
        setWorkspaceInfo({
            id: firstWorkspace.id,
            workspaceName: firstWorkspace.name,
        })
    }, [dispatch, isAdmin, id, workspaces, workspaceName])

    useEffect(() => {
        if (!isAdmin && workspaces.length > 0) {
            const workspace = workspaces[0]
            setWorkspaceInfo({
                id: workspace.id,
                workspaceName: workspace.name,
            })
        } else if (isAdmin && id && workspaceName) {
            setWorkspaceInfo({
                id: id,
                workspaceName: workspaceName,
            })
            dispatch(getUserTimeLogs(id))
        }
    }, [dispatch, id, workspaces, isAdmin, workspaceName])

    if (loading) {
        return <LoadingSpinner center size={80} className="text-primary-600 h-screen" />
    }

    // Don't render if we don't have workspace info yet
    if (!workspaceInfo.id) {
        return <div>Loading workspace information...</div>
    }

    const formattedTimelogs = formatTimeLogs(timeLogs)
    return (
        <div className="bg-white h-full">
            <TimeTrackerHeader id={workspaceInfo.id} workspaceName={workspaceInfo.workspaceName} />
            <TimeLogsGroup timeLogs={formattedTimelogs} workspaceId={workspaceInfo.id} />
        </div>
    )
}
