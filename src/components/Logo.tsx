import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-sm">AB</span>
      </div>
      {showText && (
        <span className="font-semibold text-lg text-foreground">
          Amit Bharti
        </span>
      )}
    </Link>
  );
};