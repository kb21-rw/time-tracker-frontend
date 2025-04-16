import FocusFlowHeader from '@/components/shared/ui/FocusFlowHeader'
import UserSignupImage from '../assets/images/usersignup-image.png'
import Input from '@/components/shared/ui/Input'
import { Link } from 'react-router-dom'
import Button from '@/components/shared/ui/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userSignUpShcema } from '../schema/signup'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

type UserFormFiled = z.infer<typeof userSignUpShcema>
function UserSignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<UserFormFiled>({
        resolver: zodResolver(userSignUpShcema),
        mode: 'all',
    })
    const { loading } = useSelector((state: RootState) => state.auth)
    const onSubmit = (data: UserFormFiled) => console.log(data)
    return (
        <section className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <div className="flex justify-between items-center mt-4 ">
                <img
                    src={UserSignupImage}
                    className="hidden lg:block  max-w-lg"
                    alt="signup page illustration"
                />
                <div className="flex flex-col w-full lg:w-2/5 lg:mt-12 md:mt-32">
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Create password:"
                            placeholder="CreatePassword"
                            type="password"
                            id="createPassword"
                            register={register('CreatePassword')}
                            error={errors.CreatePassword}
                        />
                        <Input
                            label="Confirm password:"
                            placeholder="ConfirmPassword"
                            type="password"
                            id="confirmPassword"
                            register={register('ConfirmPassword')}
                            error={errors.ConfirmPassword}
                        />
                        <p className="text-center flex justify-end gap-2 p-6 text-lg">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600">
                                Log in
                            </Link>
                        </p>
                        <Button
                            className="text-xl mt-5 font-inter w-full"
                            isLoading={loading}
                            disabled={!isValid || loading}
                        >
                            Create Account
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UserSignUp
