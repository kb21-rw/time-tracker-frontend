import TimeLogsGroup from '@/components/card/TimeLogsGroup'
import LoadingSpinner from '@/components/shared/ui/LoadingSpinner'
import TimeTrackerHeader from '@/components/ui/TimeTrackerHeader'
import { getUserTimeLogs } from '@/redux/slice/timeLogsSlice'
import { getWorkspacesByUser } from '@/redux/slice/workspaceSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { formatTimeLogs } from '@/util/helpers'
import { OutletContextType } from '@/util/interfaces'
import { useEffect, useMemo, useState } from 'react'
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

    // Pick the workspace we care about
    const targetWorkspace = useMemo(() => {
        if (isAdmin) {
            if (id && workspaceName) return { id, name: workspaceName }
            return null
        }
        const firstWorkspace = workspaces[0]
        return firstWorkspace ? { id: firstWorkspace.id, name: firstWorkspace.name } : null
    }, [isAdmin, id, workspaceName, workspaces])

    // Ensure non-admins have workspaces loaded
    useEffect(() => {
        if (!isAdmin && workspaces.length === 0) {
            dispatch(getWorkspacesByUser())
        }
    }, [isAdmin, workspaces.length, dispatch])

    // Set the active workspace + fetch logs once per target change
    useEffect(() => {
        if (!targetWorkspace) return
        setWorkspaceInfo({ id: targetWorkspace.id, workspaceName: targetWorkspace.name })
        dispatch(getUserTimeLogs(targetWorkspace.id))
    }, [dispatch, targetWorkspace])

    const formattedTimelogs = useMemo(() => formatTimeLogs(timeLogs), [timeLogs])

    if (loading) {
        return <LoadingSpinner center size={80} className="text-primary-600 h-screen" />
    }

    if (!workspaceInfo.id) {
        return <div>No workspace available.</div>
    }

    return (
        <div className="bg-white h-full">
            <TimeTrackerHeader id={workspaceInfo.id} workspaceName={workspaceInfo.workspaceName} />
            <TimeLogsGroup timeLogs={formattedTimelogs} workspaceId={workspaceInfo.id} />
        </div>
    )
}
