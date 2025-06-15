import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';

const Header: React.FC = () => {
  const navItems = [
    { label: 'GALLERY', href: '#GALLERY' },
    { label: 'FEATURE', href: '#FEATURE' },
    { label: 'FAQ', href: '#FAQ' },
    { label: 'CONTACT', href: '#FOOTER' }
  ];
  return (
    
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2">
      {/* ✅ Increased max-width and horizontal padding */}
      <div className="w-full px-10 flex justify-between items-center">
        
        {/* ✅ Left: Logo */}
        <div className="flex items-center">
          <img 
            src="/EzyRide.png" 
            alt="EzyRide Logo"
            className="h-11 w-auto mr-3"
          />
        </div>

        {/* ✅ Right: Nav links pushed to the right, with increased font size */}

   

<nav className="hidden md:flex items-center space-x-10 ml-auto">
  <ul className="flex space-x-10">
    {navItems.map((item) => (
      <li key={item.label}>
        <a 
          href={item.href} 
          className="text-lg text-gray-900 hover:text-blue-900 transition-all"
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
{/* 
        <nav className="hidden md:flex items-center space-x-10 ml-auto">
          <ul className="flex space-x-10">
            {['GALLERY','FEATURE','FAQ', 'CONTACT'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-lg text-gray-900 hover:text-blue-900 transition-all"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;