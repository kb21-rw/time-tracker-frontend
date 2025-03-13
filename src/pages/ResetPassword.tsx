import LogoIcon from '../assets/icons/LogoIcon'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { FieldValues, useForm } from 'react-hook-form'
import { passwordSchema } from '../util/passwordSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type FormData = z.infer<typeof passwordSchema>
function ResetPassword() {
    const { register, handleSubmit,formState:{errors}} = useForm<FormData>({resolver: zodResolver(passwordSchema)})
    const onSubmit = (data: FieldValues) => console.log(data)
    return (
        <div className='className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen"'>
            <div className="flex justify-between ">
                <LogoIcon />
                <p className="text-3xl md:text-5xl font-fredoka font-semibold text-primary text-shadow-custom">
                    Focus<span className="font-inter text-secondary"> Flow</span>
                </p>
            </div>
            <form
                className="flex flex-col items-center mt-20 gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    label="Password"
                    placeholder="................"
                    register={register("password")}
                     error={errors.password}
                     id='Password'
    
                />
                <Input
                    label="Confirm Password"
                    placeholder="..............."
                    register={register("confirmPassword")}
                    error={errors.confirmPassword}
                    id='Confirm Password'
                />
                <Button className="w-1/3"> Submit</Button>
            </form>
        </div>
    )
}

export default ResetPassword
