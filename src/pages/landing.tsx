// import LogoIcon from '../assets/LogoIcon'

import Button from '../components/shared/Button'

export default function LandingPage() {
    return (
        <div>
            <h1 className="font-inter text-primary">Landing page</h1>
            <Button className="text-xl w-1/2" isLoading={true} onClick={() => alert('Hello')}>
                Get started
            </Button>
            {/* <LogoIcon /> */}
        </div>
    )
}
