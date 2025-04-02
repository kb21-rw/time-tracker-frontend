import LogoIcon from '../assets/icons/LogoIcon'
import SignUpImage from '../assets/images/signup-image.svg'
import Button from '../components/shared/Button'
import Input from '../components/shared/Input'

export default function SignUpPage() {
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
                    alt="signup page illustration"
                />
                <div className="flex flex-col w-full lg:w-2/5">
                    <Input label="Full Name:" placeholder="Full name" />
                    <Input label="Email Address:" placeholder="email@gmail.com" />
                    <Input label="Password:" type="password" placeholder="password" />
                    <Input label="Confirm Password:" type="password" placeholder="password" />
                    <Button className="text-xl"> Create Account </Button>
                </div>
            </div>
        </div>
    )
}
