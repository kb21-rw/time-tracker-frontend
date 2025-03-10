import { AxiosError } from 'axios'

export const handleAxiosError = (error: AxiosError) => {
    if (error.response) {
        return (error.response.data as { message?: string }).message
    } else {
        return error.message
    }
}
