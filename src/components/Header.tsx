import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Car className={`mr-2 ${isScrolled ? 'text-blue-900' : 'text-white'}`} size={28} />
          <span className={`font-bold text-xl tracking-tight ${
            isScrolled ? 'text-blue-900' : 'text-white'
          }`}>
            EzyRide
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
  <nav>
    <ul className="flex space-x-6">
      {['About Us', 'Contact Us'].map((item) => (
        <li key={item}>
          <a 
            href="#" 
            className={`text-sm font-medium hover:opacity-80 transition ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  
  <button className={`${
    isScrolled 
      ? 'bg-blue-900 text-white' 
      : 'bg-white text-blue-900'
  } px-4 py-2 rounded font-medium text-sm transition-all hover:opacity-90`}>
    Sign In
  </button>
</div>

      </div>
    </header>
  );
};

export default Header;