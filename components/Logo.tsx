
import React from 'react';
import { LOGO_SVG } from '../constants';

interface LogoProps {
  className?: string;
  textColorClass?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", textColorClass = "text-villa-deep", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-full aspect-[2/1]">
        {LOGO_SVG()}
      </div>
      {showText && (
        <div className={`flex flex-col ${textColorClass}`}>
          <span className="text-[10px] uppercase tracking-widest font-sans font-light leading-tight">Pousada</span>
          <span className="text-xl md:text-2xl font-serif font-bold leading-tight">Villa & Mar</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
