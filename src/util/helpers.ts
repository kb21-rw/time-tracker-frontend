import { AxiosError } from 'axios'
import { formattedTimeLog, Project, TimeLog } from './interfaces'

export const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
        return (error.response.data as { message?: string }).message
    } else {
        return error.message
    }
}

export const formatDate = (isoString: string): string => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-GB')
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
        duration: formatDuration(log.startTime, log.endTime),
        createdAt: log.createdAt,
    }))
}

export function groupTimeLogsByDate(
    timeLogs: formattedTimeLog[],
): Record<string, formattedTimeLog[]> {
    return timeLogs.reduce(
        (acc, log) => {
            const date = log.createdAt
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(log)
            return acc
        },
        {} as Record<string, formattedTimeLog[]>,
    )
}

export function formatDuration(startTime: string, endTime: string): string {
    const duration = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000

    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = Math.floor(duration % 60)

    return `${hours}h ${minutes}m ${seconds}s`
}
