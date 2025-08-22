import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { AppDispatch, RootState } from '@/redux/store'
import { syncActiveTimer } from '@/redux/slice/timeLogsSlice'
import { syncTimer } from '@/redux/features/timerSlice'
import { TimerSyncOptions } from '@/util/interfaces'
import { getUserCurrentTime } from '@/util/helpers'
import { TimeConstants } from '@/constants'

const MS_PER_MINUTE = TimeConstants.MS_PER_SECOND * TimeConstants.SECONDS_PER_MINUTE
const MS_PER_DAY = MS_PER_MINUTE * TimeConstants.MINUTES_PER_HOUR * TimeConstants.HOURS_PER_DAY

export function useTimerSync(workspaceId?: string, options: TimerSyncOptions = {}) {
    const { periodicSyncMinutes, syncOnVisibilityChange = true } = options

    const dispatch = useDispatch<AppDispatch>()
    const { isRunning, currentTimerId } = useSelector((state: RootState) => state.timer)
    const { user } = useSelector((state: RootState) => state.auth)

    const midnightTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const dailyIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const periodicIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const clearTimerRef = (ref: React.RefObject<NodeJS.Timeout | null>) => {
        if (ref.current) {
            clearTimeout(ref.current)
            clearInterval(ref.current)
            ref.current = null
        }
    }

    const cleanupTimers = () => {
        clearTimerRef(midnightTimeoutRef)
        clearTimerRef(dailyIntervalRef)
        clearTimerRef(periodicIntervalRef)
    }

    const syncWithBackend = useCallback(async () => {
        if (!workspaceId) return

        try {
            const { payload: activeTimer } = await dispatch(syncActiveTimer({ workspaceId }))

            if (!activeTimer?.id) {
                dispatch(syncTimer(null))
                return
            }

            if (activeTimer.id !== currentTimerId) {
                dispatch(
                    syncTimer({
                        timerId: activeTimer.id,
                        startTime: activeTimer.startTime,
                    }),
                )
            }
        } catch {
            toast.error('Failed to sync timer with server')
        }
    }, [workspaceId, currentTimerId, dispatch])

    const getMsUntilMidnight = useCallback((): number => {
        const now = user && user.timeZone ? new Date(getUserCurrentTime(user)) : new Date()
        const midnightInTimezone = new Date(now)
        midnightInTimezone.setDate(midnightInTimezone.getDate() + 1)
        midnightInTimezone.setHours(0, 0, 0, 0)
        return midnightInTimezone.getTime() - now.getTime()
    }, [user])

    const startMidnightSync = useCallback(() => {
        if (!workspaceId) return

        clearTimerRef(midnightTimeoutRef)
        clearTimerRef(dailyIntervalRef)

        const timeout = setTimeout(() => {
            syncWithBackend()
            dailyIntervalRef.current = setInterval(syncWithBackend, MS_PER_DAY)
        }, getMsUntilMidnight())

        midnightTimeoutRef.current = timeout
    }, [workspaceId, syncWithBackend, getMsUntilMidnight])

    const startPeriodicSync = useCallback(() => {
        if (!workspaceId || !periodicSyncMinutes || !isRunning) return

        clearTimerRef(periodicIntervalRef)

        periodicIntervalRef.current = setInterval(
            syncWithBackend,
            periodicSyncMinutes * MS_PER_MINUTE,
        )
    }, [workspaceId, periodicSyncMinutes, isRunning, syncWithBackend])

    const handleVisibilityChange = useCallback(() => {
        if (syncOnVisibilityChange && !document.hidden && workspaceId) {
            syncWithBackend()
        }
    }, [syncOnVisibilityChange, workspaceId, syncWithBackend])

    // === Effects ===

    // Initial sync on mount
    useEffect(() => {
        if (workspaceId) {
            syncWithBackend()
        }

        return cleanupTimers
    }, [workspaceId, syncWithBackend])

    // Sync when running state changes
    useEffect(() => {
        if (isRunning && workspaceId) {
            startMidnightSync()
            startPeriodicSync()
        } else {
            cleanupTimers()
        }

        return cleanupTimers
    }, [isRunning, workspaceId, startMidnightSync, startPeriodicSync])

    // Re-sync when timer ID changes (real-time updates)
    useEffect(() => {
        if (workspaceId) {
            syncWithBackend()
        }
    }, [currentTimerId, workspaceId, syncWithBackend])

    // Handle tab visibility change
    useEffect(() => {
        if (!syncOnVisibilityChange) return

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [handleVisibilityChange, syncOnVisibilityChange])
}
