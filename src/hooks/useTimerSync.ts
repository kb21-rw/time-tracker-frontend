import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { AppDispatch, RootState } from '@/redux/store'
import { syncActiveTimer } from '@/redux/slice/timeLogsSlice'
import { syncTimer } from '@/redux/features/timerSlice'
import { TimerSyncOptions } from '@/util/interfaces'
import { getBrowserTimezone } from '@/util/helpers'

export function useTimerSync(workspaceId?: string, options: TimerSyncOptions = {}) {
    const { periodicSyncMinutes, syncOnVisibilityChange = true } = options

    const dispatch = useDispatch<AppDispatch>()
    const { isRunning, currentTimerId } = useSelector((state: RootState) => state.timer)

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
            const result = await dispatch(syncActiveTimer({ workspaceId }))
            const activeTimer = result.payload

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

    const getUserTimezone = useCallback((): string => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const [, payload] = token.split('.')
                const decoded = JSON.parse(atob(payload))
                if (decoded?.timeZone) return decoded.timeZone
            }
        } catch {
            // Ignore decoding errors
        }
        return getBrowserTimezone()
    }, [])

    const getMsUntilMidnight = useCallback((): number => {
        const timezone = getUserTimezone()
        const now = new Date()
        const nowInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
        const midnightInTimezone = new Date(nowInTimezone)
        midnightInTimezone.setDate(midnightInTimezone.getDate() + 1)
        midnightInTimezone.setHours(0, 0, 0, 0)

        const offset = nowInTimezone.getTime() - now.getTime()
        const utcMidnight = new Date(midnightInTimezone.getTime() - offset)

        return utcMidnight.getTime() - now.getTime()
    }, [getUserTimezone])

    const startMidnightSync = useCallback(() => {
        if (!workspaceId) return

        clearTimerRef(midnightTimeoutRef)
        clearTimerRef(dailyIntervalRef)

        const timeout = setTimeout(() => {
            syncWithBackend()
            dailyIntervalRef.current = setInterval(syncWithBackend, 24 * 60 * 60 * 1000)
        }, getMsUntilMidnight())

        midnightTimeoutRef.current = timeout
    }, [workspaceId, syncWithBackend, getMsUntilMidnight])

    const startPeriodicSync = useCallback(() => {
        if (!workspaceId || !periodicSyncMinutes || !isRunning) return

        clearTimerRef(periodicIntervalRef)

        periodicIntervalRef.current = setInterval(syncWithBackend, periodicSyncMinutes * 60 * 1000)
    }, [workspaceId, periodicSyncMinutes, isRunning, syncWithBackend])

    const handleVisibilityChange = useCallback(() => {
        if (syncOnVisibilityChange && !document.hidden && workspaceId) {
            syncWithBackend()
        }
    }, [syncOnVisibilityChange, workspaceId, syncWithBackend])

    // === Effects ===

    // Initial sync on mount
    useEffect(() => {
        if (workspaceId) syncWithBackend()
        return cleanupTimers
    }, [workspaceId, syncWithBackend])

    // Sync on running state changes
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
        if (workspaceId) syncWithBackend()
    }, [isRunning, currentTimerId, workspaceId, syncWithBackend])

    // Handle tab visibility change
    useEffect(() => {
        if (!syncOnVisibilityChange) return

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [handleVisibilityChange, syncOnVisibilityChange])
}
