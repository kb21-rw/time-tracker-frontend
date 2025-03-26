import Input from '../../components/shared/ui/Input'
import Button from '../../components/shared/ui/Button'
import { FieldValues, useForm } from 'react-hook-form'
import { passwordSchema } from '../../schema/password'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FocusFlowHeader from '../../components/shared/ui/FocusFlowHeader'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { handleAxiosError } from '../../util/helpers'
import { resetPassword } from '../../redux/slice/authSlice'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AxiosError } from 'axios'

type FormData = z.infer<typeof passwordSchema>
function ResetPasswordPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, error } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({ resolver: zodResolver(passwordSchema), mode: 'all' })
    const onSubmit = async (data: FieldValues) => {
        try {
            if (!token) {
                toast.error('Token is required to reset password.')
                return
            }
            const resetData = {
                newPassword: data.password as string,
                token,
            }
            const { meta: responseData } = await dispatch(resetPassword(resetData))
            if (responseData.requestStatus === 'fulfilled') {
                toast.success('Successfully reset your password!')
                navigate('/login')
            } else {
                toast.error('Failed to reset your password. Please try again.')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }
    return (
        <div className='className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen"'>
            <FocusFlowHeader />
            <form
                className="flex flex-col justify-center self-center mt-20 gap-4 max-w-xl w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-3xl font-inter font-bold text-center">Reset Password</h1>
                <Input
                    label="Password"
                    register={register('password')}
                    error={errors.password}
                    id="Password"
                    type="password"
                />
                <Input
                    label="Confirm Password"
                    register={register('confirmPassword')}
                    error={errors.confirmPassword}
                    id="Confirm Password"
                    type="password"
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

export default ResetPasswordPage
