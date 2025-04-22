import LandingImage from '../assets/images/landing-image.svg'
import { Link } from 'react-router-dom'
import FocusFlowHeader from '../components/shared/ui/FocusFlowHeader'

export default function LandingPage() {
    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <div className="flex justify-between mt-20 items-center gap-6">
                <div className="w-1/2 flex lg:flex-col gap-12 flex-col text-left">
                    <p className="text-5xl font-bold font-inter text-primary-700">
                        Where focus meets productivity
                    </p>
                    <p className="font-inter text-3xl w-2/3">
                        Streamlining your day and making every moment count.
                    </p>
                    <div className="flex flex-row gap-4">
                        <Link
                            className="w-52 bg-primary-600 shadow text-xl shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4"
                            to="/sign-up"
                        >
                            Create an account
                        </Link>
                        <Link
                            className="w-52 bg-primary-600 shadow text-xl shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4"
                            to="/login"
                        >
                            Login
                        </Link>
                    </div>
                </div>
                <img
                    src={LandingImage}
                    alt="Landing page illustration"
                    className="lg:block hidden w-2/5 mr-20"
                />
            </div>
        </div>
    )
}
