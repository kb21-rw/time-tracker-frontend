import LogoIcon from '../../assets/icons/LogoIcon'

export default function FocusFlowHeader() {
    return (
        <div className="w-full flex justify-between items-center">
            <LogoIcon className="w-12 md:w-20" />
            <h1 className="text-3xl md:text-5xl font-fredoka font-semibold text-primary text-shadow-custom">
                Focus<span className="font-inter text-secondary"> Flow</span>
            </h1>
        </div>
    )
}
