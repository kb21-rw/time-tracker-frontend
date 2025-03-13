import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import FocusFlowHeader from '../../components/shared/FocusFlowHeader'
type FormData = {
    email: string
}

function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(
            z.object({
                email: z.string().email({ message: 'Please enter a valid email address' }),
            }),
        ),
        mode: 'all',
        defaultValues: { email: '' },
    })

    const navigate = useNavigate()
    const onSubmit = (data: FieldValues) => {
        console.log(data)
        navigate('/forgot-password/verify-code')
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
                <Button className="w-full text-xl" disabled={!isValid}>
                    {' '}
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ForgotPasswordPage
