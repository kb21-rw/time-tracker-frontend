import LogoIcon from '../assets/icons/LogoIcon'
import LandingImage from '../assets/images/landing-image.svg'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen bg-gray-100">
            <div className="flex justify-between ">
                <LogoIcon />
                <p className="text-3xl md:text-5xl font-fredoka font-semibold text-primary text-shadow-custom">
                    Focus<span className="font-inter text-secondary"> Flow</span>
                </p>
            </div>

            <div className="flex justify-between mt-20 items-center">
                <div className="flex flex-col gap-6  ">
                    <p className="text-5xl font-bold font-inter text-secondary ">
                        Where focus meets <br /> productivity
                    </p>
                    <p className="font-inter text-xl">
                        Streamlining your day and <br />
                        making every moment count.
                    </p>
                    <Link
                        className="w-48 bg-primary shadow shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4"
                        to="/sign-up"
                    >
                        Get started
                    </Link>
                </div>
                <img src={LandingImage} alt="landing page Image" />
            </div>
        </div>
    )
}
