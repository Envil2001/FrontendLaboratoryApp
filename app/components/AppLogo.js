export default function AppLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="15"
        y="15"
        width={500 - 32}
        height={500 - 32}
        stroke="currentColor"
        strokeWidth="32"
        fill="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        rx="50"
      />
      <polygon
        points="132 132 367 250 132 367"
        stroke="currentColor"
        strokeWidth="32"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}
