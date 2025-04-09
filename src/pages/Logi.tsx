import FocusFlowHeader from '../components/shared/FocusFlowHeader'
import LoginImage from '../assets/images/landing-image.svg'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../components/shared/Input'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'
import { loginSchema } from '../schema'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { loginUser } from '../redux/slice/authSlice'
import toast from 'react-hot-toast'
import { handleAxiosError } from '../util/helpers'
import { AxiosError } from 'axios'

type FormFields = z.infer<typeof loginSchema>
export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, error } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormFields>({
        resolver: zodResolver(loginSchema),
        mode: 'all',
        defaultValues: { email: '', password: '' },
    })

    const onSubmit: SubmitHandler<FormFields> = async data => {
        try {
            const { meta: responseData } = await dispatch(loginUser(data))
            const user = localStorage.getItem('user')
            const userData = JSON.parse(user || '{}')
            if (responseData.requestStatus === 'fulfilled') {
                if (userData.roles === 'Admin') {
                    navigate('/manage-workspaces')
                    toast.success('Successfully logged in!')
                } else {
                    navigate('/dashboard')
                    toast.success('Successfully logged in!')
                }
            } else {
                toast.error('Login failed')
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
                    src={LoginImage}
                    className="hidden lg:block  max-w-lg"
                    alt="login page image"
                />
                <div className="flex flex-col justify-between w-full lg:w-2/5 relative">
                    <h1 className="text-4xl font-bold my-8">Sign in as an admin</h1>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id="email"
                            label="Email Address:"
                            placeholder="Enter your email"
                            register={register('email')}
                            error={errors.email}
                            type="email"
                        />
                        <Input
                            id="password"
                            label="Password:"
                            placeholder="Enter your password"
                            register={register('password')}
                            error={errors.password}
                            type="password"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">
                                {typeof error === 'string' ? error : JSON.stringify(error)}
                            </p>
                        )}
                        <Link to="/forgot-password" className="absolute right-0 text-primary-600 ">
                            Forgot password?
                        </Link>
                        <Button
                            className="text-xl w-full mt-14"
                            isLoading={loading}
                            disabled={!isValid || loading}
                        >
                            Sign In
                        </Button>
                    </form>
                    <p className="text-center mt-8 text-lg">
                        Don't have an account?{' '}
                        <Link to="/" className="text-primary-600">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
