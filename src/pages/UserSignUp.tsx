import FocusFlowHeader from '@/components/shared/ui/FocusFlowHeader'
import UserSignupImage from '../assets/images/usersignup.svg'
import Input from '@/components/shared/ui/Input'
import { Link } from 'react-router-dom'
import Button from '@/components/shared/ui/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userSignUpShcema } from '../schema/usersignup'

type UserFormFiled = z.infer<typeof userSignUpShcema>
function UserSignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormFiled>({
        resolver: zodResolver(userSignUpShcema),
        mode: 'all',
    })
    const onSubmit = (data: UserFormFiled) => console.log(data)
    return (
        <section className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <div className="flex  justify-between items-center ">
                <img
                    src={UserSignupImage}
                    className="hidden lg:block  max-w-lg"
                    alt="signup page illustration"
                />
                <div className="flex flex-col w-full lg:w-2/5 ">
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="CreatePassword:"
                            placeholder="CreatePassword"
                            id="createPassword"
                            register={register('CreatePassword')}
                            error={errors.CreatePassword}
                        />
                        <Input
                            label="ConfirmPassword:"
                            placeholder="ConfirmPassword"
                            id="confirmPassword"
                            register={register('ConfirmPassword')}
                            error={errors.ConfirmPassword}
                        />
                        <Link
                            to="/login"
                            className="text-primary-600 text-lg flex justify-end font-inter"
                        >
                            Already have an accaunt
                        </Link>
                        <Button className="text-xl mt-5 font-inter w-full">Create Accaunt</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UserSignUp
