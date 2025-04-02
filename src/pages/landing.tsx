import LogoIcon from '../assets/icons/LogoIcon'
import LandingImage from '../assets/images/landing-image.svg'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="w-full flex flex-col px-4 py-2 md:px-24 md:py-12 h-screen">
            <div className="flex justify-between ">
                <LogoIcon />
                <p className="text-3xl md:text-5xl font-fredoka font-semibold text-primary text-shadow-custom">
                    Focus<span className="font-inter text-secondary"> Flow</span>
                </p>
            </div>

            <div className="flex justify-between mt-20 items-center">
                <div className="flex lg:flex-col gap-12 flex-col text-center items-center">
                    <p className="text-5xl font-bold font-inter text-secondary ">
                        Where focus meets <br /> productivity
                    </p>
                    <p className="font-inter text-xl">
                        Streamlining your day and <br />
                        making every moment count.
                    </p>
                    <div className='grid grid-cols-2 gap-4'>
                        <Link
                            className="w-48 bg-primary shadow shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4"
                            to="/sign-up"
                        >
                            Log in as an admin
                        </Link>

                        <Link
                            className="w-48 bg-primary shadow shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4"
                            to="/sign-up"
                        >
                            Log in as a user
                        </Link>

                        <Link
                            className="w-48 bg-primary shadow shadow-black/40 drop-shadow-xl text-white rounded-lg text-center p-4 col-span-2 mx-auto"
                            to="/sign-up"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
                <img src={LandingImage} alt="landing page illustration" className="lg:block hidden" />
            </div>
        </div>
    )
}
