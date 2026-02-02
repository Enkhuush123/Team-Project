"use client";

interface CoinIconProps {
  animated?: boolean;
  size?: number;
}

const CoinIcon = ({ animated = true, size = 30 }: CoinIconProps) => {
  return (
    <div
      className={`relative inline-block ${animated ? "coin-spin" : ""}`}
      style={{ width: size, height: size }}
    >
      <style jsx>{`
        .coin-spin {
          animation: coinFloat 3s ease-in-out infinite;
        }
        .coin-spin:hover {
          animation: coinSpin 0.6s ease-in-out;
        }
        @keyframes coinFloat {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-2px) rotateY(10deg); }
        }
        @keyframes coinSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
      >
        {/* Outer glow */}
        <defs>
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="coinShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>

        {/* Main coin body */}
        <ellipse
          rx="8.5"
          ry="9"
          transform="matrix(-1 0 0 1 10.5 12)"
          fill="url(#coinGradient)"
          stroke="#b45309"
          strokeWidth="1.5"
        />

        {/* Inner detail */}
        <ellipse
          rx="6.5"
          ry="7"
          transform="matrix(-1 0 0 1 10.5 12)"
          fill="none"
          stroke="#d97706"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* C letter */}
        <path
          d="M13 8.8C12.3732 8.29767 11.5941 8 10.7498 8C8.67883 8 7 9.79086 7 12C7 14.2091 8.67883 16 10.7498 16C11.5941 16 12.3732 15.7023 13 15.2"
          stroke="#92400e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Shine effect */}
        <path
          d="M5 8C6 6 8 5 10 5"
          stroke="url(#coinShine)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* 3D edge */}
        <path
          d="M11 3C14.6667 3 22 3.9 22 12C22 20.1 14.6667 21 11 21"
          stroke="#92400e"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default CoinIcon;