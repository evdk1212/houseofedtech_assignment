
export const Logo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M6 4V28M26 4V28M6 16H26"
                stroke="url(#logo-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M16 4L16 28"
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
                opacity="0.5"
            />
            <rect x="2" y="14" width="28" height="4" rx="2" fill="url(#logo-gradient)" fillOpacity="0.2" />
            <defs>
                <linearGradient id="logo-gradient" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
            </defs>
        </svg>
    );
};
