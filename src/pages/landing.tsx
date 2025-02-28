// import LogoIcon from '../assets/LogoIcon'

import Button from '../components/shared/Button'
import Input from '../components/shared/Input'

export default function LandingPage() {
    return (
        <div className="w-1/2">
            <h1 className="font-inter text-primary">Landing page</h1>
            <div>
                <Input label="Full Name:" placeholder="full names" />
                <Input label="Password:" error="error" type="password" />
                <Button className="text-xl w-full" onClick={() => alert('Hello')}>
                    Get started
                </Button>
            </div>

            {/* <LogoIcon /> */}
        </div>
    )
}
