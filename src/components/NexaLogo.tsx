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
          d="M50 8
             C 74 8 92 24.5 92 46
             C 92 62 82 74.5 67 80
             L 67 92
             L 52 80.5
             C 51.3 80.5 50.7 80.5 50 80.5
             C 26 80.5 8 64 8 46
             C 8 24.5 26 8 50 8 Z"
          fill="url(#nexaLogoGrad)"
        />
        <text
          x="48"
          y="47"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="44"
          fontWeight="800"
          fill="#0A0A12"
          fontFamily="Inter, system-ui, sans-serif"
        >
          N
        </text>
      </svg>
      {withWordmark && (
        <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Nexa</span>
      )}
    </div>
  );
}
