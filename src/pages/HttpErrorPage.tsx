import Button from '@/components/shared/ui/Button'
import { HttpErrorPageProps } from '@/util/interfaces'
import { ReactElement } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useNavigate, useLocation } from 'react-router-dom'

export default function HttpErrorPage({ errorType }: HttpErrorPageProps): ReactElement {
    const navigate = useNavigate()
    const location = useLocation()

    const detectedErrorType: 'notFound' | 'forbidden' =
        errorType || (location.state?.errorType === 'forbidden' ? 'forbidden' : 'notFound')

    const handleGoBack = () => {
        if (location.key !== 'default') {
            navigate(-1)
        } else {
            navigate('/')
        }
    }

    const errorConfig = {
        notFound: {
            code: '404',
            title: 'Page Not Found',
            description: "The page you're looking for doesn't exist.",
        },
        forbidden: {
            code: '403',
            title: 'Access Denied',
            description: "You don't have permission to access this resource.",
        },
    }

    const config = errorConfig[detectedErrorType]

    return (
        <main className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
            <div className="flex max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
                <div className="mb-4 text-red-500">
                    <IoMdNotificationsOutline size={64} />
                </div>
                <h1 className="text-center font-lora text-4xl font-bold text-gray-800">OOOOOPS!</h1>
                <p className="mt-2 text-center font-lora text-2xl font-semibold text-gray-700">
                    {config.code} - {config.title}
                </p>
                <p className="mt-2 text-center font-lora text-lg text-gray-600">
                    {config.description}
                </p>
                <Button
                    onClick={handleGoBack}
                    className="mt-6 rounded-lg bg-primary-600 px-6 py-2 text-white transition hover:bg-primary-500 cursor-pointer"
                >
                    Go Back
                </Button>
            </div>
        </main>
    )
}
