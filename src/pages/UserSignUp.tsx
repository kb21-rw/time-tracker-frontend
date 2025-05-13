import FocusFlowHeader from '@/components/shared/ui/FocusFlowHeader'
import UserSignupImage from '../assets/images/usersignup-image.png'
import Input from '@/components/shared/ui/Input'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Button from '@/components/shared/ui/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userSignUpShcema } from '../schema/signup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { signupUser } from '@/redux/slice/authSlice'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/util/helpers'
import { AxiosError } from 'axios'

type UserFormFiled = z.infer<typeof userSignUpShcema>
export default function UserSignUpPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, error } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<UserFormFiled>({
        resolver: zodResolver(userSignUpShcema),
        mode: 'all',
        defaultValues: { fullName: ''},
    })
    const onSubmit = async ({ ConfirmPassword: password, fullName }: UserFormFiled) => {
        try {
            if (!token) {
                toast.error('A token is needed to signup as a user!')
                return
            }
            const acceptInvitationData = { fullName, token, password }
            const { meta: responseData } = await dispatch(signupUser(acceptInvitationData))
            if (responseData.requestStatus === 'fulfilled') {
                toast.success('Successfully created a user account!')
                navigate('/login')
            } else {
                toast.error('Failed to create a user account. Please try again.')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }
    return (
        <section className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <div className="flex justify-between items-center mt-4 ">
                <img
                    src={UserSignupImage}
                    className="hidden lg:block  max-w-lg"
                    alt="signup page illustration"
                />
                <div className="flex flex-col w-full lg:w-2/5 lg:mt-12 md:mt-32 mt-7">
                    <h1 className="text-4xl font-bold my-8">Sign up as a user</h1>

                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Full Name:"
                            placeholder="Full Name"
                            id="fullName"
                            register={register('fullName')}
                            error={errors.fullName}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">
                                {typeof error === 'string' ? error : JSON.stringify(error)}
                            </p>
                        )}
                        <Input
                            label="Create password:"
                            placeholder="CreatePassword"
                            type="password"
                            id="createPassword"
                            register={register('CreatePassword')}
                            error={errors.CreatePassword}
                        />
                        <Input
                            label="Confirm password:"
                            placeholder="ConfirmPassword"
                            type="password"
                            id="confirmPassword"
                            register={register('ConfirmPassword')}
                            error={errors.ConfirmPassword}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">
                                {typeof error === 'string' ? error : JSON.stringify(error)}
                            </p>
                        )}
                        <Button
                            className="text-xl mt-5 font-inter w-full"
                            isLoading={loading}
                            disabled={!isValid || loading}
                        >
                            Create Account
                        </Button>
                        <p className="text-right flex justify-end gap-2 p-6 text-lg">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}
