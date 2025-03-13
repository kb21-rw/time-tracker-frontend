import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { FieldValues, useForm } from 'react-hook-form'
import { passwordSchema } from '../../schema/password'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FocusFlowHeader from '../../components/shared/FocusFlowHeader'

type FormData = z.infer<typeof passwordSchema>
function ResetPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({ resolver: zodResolver(passwordSchema), mode: 'all' })
    const onSubmit = (data: FieldValues) => console.log(data)
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
                <Button className="w-full text-xl" disabled={!isValid}>
                    {' '}
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ResetPasswordPage
