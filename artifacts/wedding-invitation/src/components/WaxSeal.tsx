export function WaxSeal({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="relative cursor-pointer transition-transform duration-300 hover:scale-105 animate-seal-pulse"
      onClick={onClick}
      style={{ width: "80px", height: "80px" }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="38" fill="#8b1a1a" stroke="#601010" strokeWidth="2" />
        <circle cx="40" cy="40" r="34" fill="#7a1515" />
        <path d="M40 8C57.6731 8 72 22.3269 72 40C72 57.6731 57.6731 72 40 72C22.3269 72 8 57.6731 8 40C8 22.3269 22.3269 8 40 8Z" fill="#8b1a1a" />
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#c9a84c"
          fontFamily="Playfair Display"
          fontSize="24"
          fontWeight="bold"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          A & Y
        </text>
      </svg>
    </div>
  );
}
