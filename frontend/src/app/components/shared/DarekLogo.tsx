interface DarekLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DarekLogo({ size = 'md', className = '' }: DarekLogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizes[size]} rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#059669] flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[65%] h-[65%]"
      >
        {/* Building */}
        <path d="M6 28V12L16 4L26 12V28H6Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
        {/* Door */}
        <rect x="13" y="20" width="6" height="8" rx="0.5" stroke="white" strokeWidth="1.5" fill="none" />
        {/* Window */}
        <rect x="12" y="13" width="8" height="5" rx="0.5" stroke="white" strokeWidth="1.5" fill="none" />
        {/* Checkmark circle */}
        <circle cx="24" cy="8" r="6" fill="#059669" stroke="white" strokeWidth="1.5" />
        <path d="M21 8L23 10L27 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
