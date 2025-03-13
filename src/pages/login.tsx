import FocusFlowHeader from '../components/shared/FocusFlowHeader'
import LoginImage from '../assets/images/landing-image.svg'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../components/shared/Input'
import { Link } from 'react-router-dom'
import Button from '../components/shared/Button'
import { useState } from 'react'
import { loginSchema } from '../schema'

type FormFields = z.infer<typeof loginSchema>
export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormFields>({
        resolver: zodResolver(loginSchema),
        mode: 'all',
        defaultValues: { email: '', password: '' },
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit: SubmitHandler<FormFields> = data => {
        setIsSubmitting(true)
        alert(`submitted successfully | ${data}`)
        setIsSubmitting(false)
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
                        {/* add link to forgot password page */}
                        <Link to="/forgot-password" className="absolute right-0 text-primary-600 ">
                            Forgot password?
                        </Link>
                        <Button
                            className="text-xl w-full mt-14"
                            isLoading={isSubmitting}
                            disabled={!isValid || isSubmitting}
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
