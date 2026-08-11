interface NexaLogoProps {
  size?: number;
  withWordmark?: boolean;
}

export function NexaLogo({ size = 32, withWordmark = true }: NexaLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="nexaLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#E879F9" />
          </linearGradient>
        </defs>
        <path
          d="M20 18 h60 a12 12 0 0 1 12 12 v32 a12 12 0 0 1 -12 12 h-33 l-17 17 v-17 h-10 a12 12 0 0 1 -12 -12 v-32 a12 12 0 0 1 12 -12 z"
          fill="url(#nexaLogoGrad)"
        />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          fontSize="32"
          fontWeight="700"
          fill="#0A0A12"
        >
          N
        </text>
      </svg>
      {withWordmark && (
        <div className="flex items-center gap-1">
          <span className="text-lg font-semibold text-white">Nexa</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gradient-to-r from-[#4F8DF7] via-[#818CF8] to-[#C026D3] text-white">
            AI
          </span>
        </div>
      )}
    </div>
  );
}
