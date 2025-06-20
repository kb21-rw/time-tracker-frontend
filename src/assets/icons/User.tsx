import IconProps from '../iconinterface'

export default function UserIcon({ className }: IconProps) {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M8 36C8 33.8783 8.84285 31.8434 10.3431 30.3431C11.8434 28.8429 13.8783 28 16 28H32C34.1217 28 36.1566 28.8429 37.6569 30.3431C39.1571 31.8434 40 33.8783 40 36C40 37.0609 39.5786 38.0783 38.8284 38.8284C38.0783 39.5786 37.0609 40 36 40H12C10.9391 40 9.92172 39.5786 9.17157 38.8284C8.42143 38.0783 8 37.0609 8 36Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
            />
            <path
                d="M24 20C27.3137 20 30 17.3137 30 14C30 10.6863 27.3137 8 24 8C20.6863 8 18 10.6863 18 14C18 17.3137 20.6863 20 24 20Z"
                stroke="currentColor"
                strokeWidth="4"
            />
        </svg>
    )
}
