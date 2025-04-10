import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import FocusFlowHeader from '../../components/shared/FocusFlowHeader'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { forgotPassword, clearError } from '../../redux/slice/authSlice'
import { handleAxiosError } from '../../util/helpers'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

type FormData = {
    email: string
}

function ForgotPasswordPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, error } = useSelector((state: RootState) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(
            z.object({
                email: z.string().email({ message: 'Please enter a valid email address' }),
            }),
        ),
        mode: 'all',
        defaultValues: { email: '' },
    })

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    const onSubmit = async (data: FieldValues) => {
        try {
            const { meta: responseData } = await dispatch(forgotPassword(data.email))
            if (responseData.requestStatus === 'fulfilled') {
                toast.success(
                    'Successfully sent a password reset link to your email. Please check your inbox.',
                )
                reset()
            } else {
                toast.error('Failed to send reset password link. Please try again.')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }
    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <form
                className="flex flex-col items-center gap-5 justify-center w-full mt-24 max-w-xl self-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-3xl font-inter font-bold">
                    Enter the registered email address
                </h1>
                <Input
                    register={register('email')}
                    placeholder="Enter your email"
                    error={errors.email}
                    id="email"
                />
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </p>
                )}

                <Button className="w-full text-xl" isLoading={loading} disabled={!isValid}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ForgotPasswordPage
