import LandingImage from '../assets/images/landing-image.svg'
import { Link } from 'react-router-dom'
import FocusFlowHeader from '../components/shared/ui/FocusFlowHeader'

export default function LandingPage() {
    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <FocusFlowHeader />
            <div className="flex justify-between items-center lg:mt-10 mt-20 gap-12 md:pr-20 md:mt-32">
                <div className="flex lg:flex-col lg:gap-12 flex-col gap-6 items-center lg:items-start w-full lg:w-2/5 md:mt-6 lg:mt-0 md:w-full md:gap-12">
                    <p className="lg:text-6xl text-5xl font-bold font-inter ml-14 lg:ml-0 text-primary-700 md:ml-0 md:text-4xl">
                        Where focus meets productivity
                    </p>
                    <p className="font-inter text-3xl w-2/3 md:w-full ">
                        Streamlining your day and making every moment count.
                    </p>
                    <div className="flex md:flex-row gap-4 flex-col ">
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
                    className="lg:block hidden w-2/5 mr-20 md:block"
                />
            </div>
        </div>
    )
}
