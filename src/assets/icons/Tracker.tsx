import IconProps from '../iconinterface'

export default function Tracker({ className }: IconProps) {
    return (
        <svg
            width="40"
            height="37"
            viewBox="0 0 40 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M38 18.5C38 28.7173 29.4934 37 19 37C8.50659 37 0 28.7173 0 18.5C0 8.28273 8.50659 0 19 0C29.4934 0 38 8.28273 38 18.5ZM3.49518 18.5C3.49518 26.8377 10.4369 33.5968 19 33.5968C27.5631 33.5968 34.5048 26.8377 34.5048 18.5C34.5048 10.1623 27.5631 3.4032 19 3.4032C10.4369 3.4032 3.49518 10.1623 3.49518 18.5Z"
                fill="#130E74"
            />
            <path
                d="M19 1.7016C19 0.761832 19.7633 -0.00771471 20.6995 0.0741456C23.6508 0.332206 26.5076 1.25976 29.037 2.79199C32.0493 4.6168 34.4767 7.22638 36.0444 10.3252C37.6121 13.4241 38.2574 16.8884 37.9072 20.3259C37.5571 23.7634 36.2255 27.0368 34.0632 29.7755C31.9009 32.5141 28.9943 34.6085 25.6725 35.8217C22.3507 37.0348 18.7465 37.3181 15.2678 36.6396C11.7892 35.961 8.57516 34.3477 5.98965 31.9823C3.84539 30.0206 2.20447 27.6065 1.18663 24.9355C0.840349 24.0267 1.40832 23.0562 2.34972 22.8124C3.27364 22.5731 4.20875 23.126 4.56529 24.0113C5.40155 26.0878 6.70295 27.9651 8.38299 29.5021C10.4929 31.4324 13.1157 32.749 15.9544 33.3027C18.7931 33.8564 21.7343 33.6252 24.445 32.6352C27.1558 31.6453 29.5277 29.9361 31.2922 27.7013C33.0567 25.4664 34.1434 22.7952 34.4291 19.99C34.7149 17.1848 34.1883 14.3578 32.909 11.829C31.6297 9.30023 29.6488 7.17071 27.1906 5.68158C25.2157 4.48521 22.9961 3.74059 20.6984 3.49404C19.764 3.39377 19 2.64137 19 1.7016Z"
                fill="#2B22D2"
            />
            <g clipPath="url(#clip0_72_10)" filter="url(#filter0_d_72_10)">
                <path
                    d="M24.5514 17.2769L14.9545 12.0931C14.4972 11.8462 13.9051 11.8469 13.4494 12.0931C12.9847 12.3435 12.6957 12.8114 12.6957 13.3138V23.6822C12.6957 24.1848 12.9844 24.6527 13.4466 24.9018C13.6751 25.0263 13.9363 25.0921 14.2017 25.0921C14.4665 25.0921 14.7274 25.0266 14.955 24.9029L24.5519 19.7186C25.0162 19.4675 25.3044 18.9999 25.3044 18.4981C25.3042 17.997 25.0162 17.5294 24.5514 17.2769ZM23.8319 18.5531L14.2344 23.7376C14.2147 23.7482 14.1912 23.7493 14.1675 23.7365C14.1473 23.7255 14.1346 23.7046 14.1346 23.6822V13.3136C14.1346 13.2911 14.1471 13.2705 14.1682 13.2591C14.1782 13.2534 14.1898 13.2505 14.2015 13.2505C14.2137 13.2505 14.2252 13.2534 14.2356 13.2591L23.8307 18.4422C23.8521 18.4539 23.8655 18.4752 23.8655 18.4981C23.8653 18.5212 23.8528 18.5416 23.8319 18.5531Z"
                    fill="#2B22D2"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_72_10"
                    x="11.9551"
                    y="11.9081"
                    width="28.0898"
                    height="21.1839"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="10" dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.711068 0 0 0 0 0.18468 0 0 0 0 0.18468 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_72_10"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_72_10"
                        result="shape"
                    />
                </filter>
                <clipPath id="clip0_72_10">
                    <rect
                        width="14.0899"
                        height="13.1839"
                        fill="white"
                        transform="translate(11.9551 11.9081)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}
