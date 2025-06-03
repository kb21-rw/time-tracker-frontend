import { AxiosError } from 'axios'
import { Project } from './interfaces'

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

export function groupProjectsByClient(projects: Project[]): Record<string, string[]> {
    return projects.reduce(
        (acc, project) => {
            const clientName = project.client.name
            acc[clientName] = acc[clientName] || []
            acc[clientName].push(project.name)
            return acc
        },
        {} as Record<string, string[]>,
    )
}
