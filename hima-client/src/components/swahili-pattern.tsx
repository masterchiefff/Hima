interface SwahiliPatternProps {
className?: string
}

export function SwahiliPattern({ className = "" }: SwahiliPatternProps) {
    return (
        <div className={`absolute inset-0 opacity-5 pointer-events-none ${className}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <pattern id="swahiliPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,20 L40,20 M20,0 L20,40" stroke="currentColor" strokeWidth="1" />
                <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M5,5 L15,15 M35,5 L25,15 M5,35 L15,25 M35,35 L25,25" stroke="currentColor" strokeWidth="1" />
            </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#swahiliPattern)" />
        </svg>
        </div>
    )
}
  