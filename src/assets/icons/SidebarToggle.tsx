import IconProps from '../iconinterface'

export default function SidebarToggle({ className }: IconProps) {
    return (
        <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M26.9167 4.25H7.08333C5.51853 4.25 4.25 5.51853 4.25 7.08333V26.9167C4.25 28.4815 5.51853 29.75 7.08333 29.75H26.9167C28.4815 29.75 29.75 28.4815 29.75 26.9167V7.08333C29.75 5.51853 28.4815 4.25 26.9167 4.25Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.75 4.25V29.75M22.6667 21.25L18.4167 17L22.6667 12.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
