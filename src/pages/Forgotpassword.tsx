import LogoIcon from '../assets/icons/LogoIcon'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { FieldValues, useForm } from 'react-hook-form'
import { passwordSchema } from '../util/passwordSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
type FormData = z.infer<typeof passwordSchema>

function Forgotpassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(passwordSchema) })

    const navigate = useNavigate()
    const onSubmit = (data: FieldValues) =>{
        navigate('/reset-password')
    }
    return (
        <div className="w-full p-10">
            <LogoIcon />
            <form
                className="flex flex-col items-center gap-5 justify-center mt-24"
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className="text-3xl font-inter font-bold ">Enter the registered email address</p>
                <Input
                    label="email"
                    placeholder="................"
                    register={register('email')}
                    error={errors.email}
                    id="email"
                />
                <Button className="w-42"> Submit</Button>
            </form>
        </div>
    )
}

export default Forgotpassword
