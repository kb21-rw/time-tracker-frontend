import { z } from 'zod'
import LogoIcon from '../assets/icons/LogoIcon'
import SignUpImage from '../assets/images/signup-image.svg'
import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import { signUpSchema } from '../util/validationSchema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../redux/slice/authSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type FormFields = z.infer<typeof signUpSchema>

const defaultValues: FormFields = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export default function SignUpPage() {
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

    const onSubmit: SubmitHandler<FormFields> = async data => {
        try {
            const { meta: responseData } = await dispatch(signupUser(data)) // Dispatch signup action
            if (responseData.requestStatus === 'fulfilled') {
                navigate('/login')
                toast.success('Signup successful!')
            } else {
                toast.error('Signup failed')
            }
        } catch (error) {
            console.error('An error occured', error)
        }
    }

    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <div className="w-full flex justify-between items-center">
                <LogoIcon className="w-12 md:w-20" />
                <h1 className="text-3xl md:text-5xl font-fredoka font-semibold text-primary text-shadow-custom">
                    Focus<span className="font-inter text-secondary"> Flow</span>
                </h1>
            </div>
            <div className="flex h-full justify-between items-center">
                <img
                    src={SignUpImage}
                    className="hidden lg:block  max-w-lg"
                    alt="signup page image"
                />
                <div className="flex flex-col w-full lg:w-2/5">
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
                </div>
            </div>
        </div>
    )
}
