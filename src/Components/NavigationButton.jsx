import { Link } from 'react-router-dom';

function NavigationButton({ to, text, isPrimary = false, className = "" }) {
  const baseClasses = "touch-btn w-full flex flex-col items-center justify-center gap-1 px-4 py-4 rounded-xl font-bold transition duration-200 whitespace-nowrap";

  const colorClasses = isPrimary
    ? "bg-red-700 text-white hover:bg-red-600 shadow-md"
    : "bg-gray-600/60 text-gray-200 border border-gray-500/30 hover:bg-gray-600";

  return (
    <Link to={to} className="block">
      <button className={`${baseClasses} ${colorClasses} ${className}`}>
        {text}
      </button>
    </Link>
  );
}

export default NavigationButton;