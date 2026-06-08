export function CandleFlame({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="40"
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-candle ${className}`}
    >
      <path
        d="M12 0C12 0 4 16 4 28C4 34.6274 7.58172 40 12 40C16.4183 40 20 34.6274 20 28C20 16 12 0 12 0Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M12 12C12 12 8 22 8 28C8 30.2091 9.79086 32 12 32C14.2091 32 16 30.2091 16 28C16 22 12 12 12 12Z"
        fill="url(#paint1_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="12"
          y1="0"
          x2="12"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e8c56d" />
          <stop offset="1" stopColor="#c9a84c" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="12"
          y1="12"
          x2="12"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#e8c56d" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
