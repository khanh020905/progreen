import Image from 'next/image';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo = ({ className = "h-12", inverted = false }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Image 
        src="/logo-final.png" 
        alt="Pro Green Life Logo" 
        width={180}
        height={48}
        className={`h-full w-auto object-contain ${inverted ? 'brightness-0 invert' : ''}`}
        priority
      />
    </div>
  );
};

export default Logo;
