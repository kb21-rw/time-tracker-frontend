import { z } from 'zod'
import SignUpImage from '../assets/images/signup-image.svg'
import Button from '../components/shared/ui/Button'
import Input from '../components/shared/ui/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { signupAdmin } from '../redux/slice/authSlice'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { handleAxiosError } from '../util/helpers'
import { AxiosError } from 'axios'
import { signUpSchema } from '../schema'
import FocusFlowHeader from '../components/shared/ui/FocusFlowHeader'

type FormFields = z.infer<typeof signUpSchema>

const defaultValues: FormFields = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export default function AdminSignUpPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, error } = useSelector((state: RootState) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormFields>({
        resolver: zodResolver(signUpSchema),
        mode: 'all',
        defaultValues,
    })
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormFields> = async ({ confirmPassword, ...data }) => {
        try {
            const { meta: responseData } = await dispatch(signupAdmin(data))
            if (responseData.requestStatus === 'fulfilled') {
                navigate('/login')
                toast.success('You have successfully created an account!')
            } else {
                toast.error('Signup failed')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }

    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <div className="flex h-full justify-between items-center">
                <img
                    src={SignUpImage}
                    className="hidden lg:block  max-w-lg"
                    alt="signup page illustration"
                />
                <div className="flex flex-col w-full lg:w-2/5">
                    <h1 className="text-2xl md:text-4xl font-bold my-8">Sign up as an admin</h1>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id="fullName"
                            label="Full Name:"
                            placeholder="Full name"
                            register={register('fullName')}
                            error={errors.fullName}
                        />
                        <Input
                            id="email"
                            label="Email Address:"
                            placeholder="email@gmail.com"
                            register={register('email')}
                            error={errors.email}
                        />
                        <Input
                            id="password"
                            label="Password:"
                            type="password"
                            placeholder="password"
                            register={register('password')}
                            error={errors.password}
                        />
                        <Input
                            id="confirmPassword"
                            label="Confirm Password:"
                            type="password"
                            placeholder="password"
                            register={register('confirmPassword')}
                            error={errors.confirmPassword}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">
                                {typeof error === 'string' ? error : JSON.stringify(error)}
                            </p>
                        )}

                        <Button
                            className="text-xl w-full mt-6"
                            isLoading={loading}
                            disabled={!isValid || loading}
                        >
                            Create Account
                        </Button>
                    </form>
                    <p className="text-right mt-8 text-lg">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
