import { AxiosError } from 'axios'
import { formattedTimeLog, Project, TimeLog } from './interfaces'
import {
    differenceInSeconds,
    format,
    intlFormat,
    isToday,
    isValid,
    isYesterday,
    parse,
    parseISO,
} from 'date-fns'
import toast from 'react-hot-toast'

export const getBrowserTimezone = (): string => {
    // Check if Intl is available (for very old browsers)
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
        return 'UTC'
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return timeZone || 'UTC'
}

export const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
        return (error.response.data as { message?: string }).message
    } else {
        return error.message
    }
}
export function groupProjectsByClient(projects: Project[]): Record<string, Project[]> {
    return projects.reduce(
        (acc, project) => {
            const clientName = project.client.name
            acc[clientName] = acc[clientName] || []
            acc[clientName].push(project)
            return acc
        },
        {} as Record<string, Project[]>,
    )
}

export function formatTimeLogs(timeLogs: TimeLog[]): formattedTimeLog[] {
    return timeLogs.map(log => ({
        id: log.id,
        description: log.description,
        project: log.project?.name || '',
        client: log.project?.client?.name || '',
        date: log.startTime,
        startTime: new Date(log.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
        endTime: new Date(log.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
        duration: calculateDuration(log.startTime, log.endTime),
        createdAt: log.startTime,
    }))
}

export function groupTimeLogsByDate(
    timeLogs: formattedTimeLog[],
): Record<string, formattedTimeLog[]> {
    return timeLogs.reduce(
        (acc, log) => {
            const date = log.createdAt.split('T')[0]
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(log)
            return acc
        },
        {} as Record<string, formattedTimeLog[]>,
    )
}

export function formatTitle(date: string): string {
    const inputDate = parseISO(date)

    if (isToday(inputDate)) {
        return 'Today'
    }

    if (isYesterday(inputDate)) {
        return 'Yesterday'
    }

    return format(inputDate, 'EEE, dd MMM')
}

export const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    const returnDate = intlFormat(date, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    const time = intlFormat(date, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })
    return {
        date: returnDate,
        time,
    }
}

export function formatTime(time?: string): string {
    if (!time) return ''
    try {
        const parsed = parse(time, 'HH:mm', new Date())
        return format(parsed, 'HH:mm:ss')
    } catch {
        return ''
    }
}

export function splitTime(time: string) {
    const parts = time.split(':').map(Number)
    if (parts.length === 2) {
        return { hours: parts[0], minutes: parts[1], seconds: 0 }
    }
    if (parts.length === 3) {
        return { hours: parts[0], minutes: parts[1], seconds: parts[2] }
    }
    return { hours: 0, minutes: 0, seconds: 0 }
}

export const toSeconds = (time: string): number => {
    const [h = 0, m = 0, s = 0] = time.split(':').map(Number)
    return h * 3600 + m * 60 + s
}

export const secondsToTimeFormat = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600).toString()
    const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, '0')
    const seconds = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}

export function calculateDuration(start: string, end: string): string {
    const isTimeOnly = (time: string) => /^\d{2}:\d{2}(:\d{2})?$/.test(time)

    if (isTimeOnly(start) && isTimeOnly(end)) {
        let diff = toSeconds(end) - toSeconds(start)
        if (diff < 0) diff += 86400
        return secondsToTimeFormat(diff)
    }

    const startDate = parseISO(start)
    const endDate = parseISO(end)

    if (!isValid(startDate) || !isValid(endDate)) return '00:00:00'

    const diff = differenceInSeconds(endDate, startDate)
    return secondsToTimeFormat(diff)
}
