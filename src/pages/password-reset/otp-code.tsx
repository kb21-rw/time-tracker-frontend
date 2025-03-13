import { FieldValues, useForm } from 'react-hook-form'
import FocusFlowHeader from '../../components/shared/FocusFlowHeader'
import Input from '../../components/shared/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../../components/shared/Button'
import { useNavigate } from 'react-router-dom'
type FormData = {
    otp: string
}
export default function OtpCodePage() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(z.object({ otp: z.string().min(4) })),
        mode: 'all',
    })
    const onSubmit = (data: FieldValues) => {
        console.log(data)
        navigate('/reset-password')
    }
    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-5 justify-center mt-24 w-full max-w-xl self-center"
            >
                <h1 className="text-3xl font-inter font-bold text-center">Verify Email Address</h1>
                <Input
                    id="otp"
                    register={register('otp')}
                    placeholder="Enter OTP Code"
                    error={errors.otp}
                />
                <Button className="w-full text-xl" disabled={!isValid}>
                    {' '}
                    Verify
                </Button>
            </form>
        </div>
    )
}
