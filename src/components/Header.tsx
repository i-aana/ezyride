import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'GALLERY', href: '#GALLERY' },
    { label: 'FEATURE', href: '#FEATURE' },
    { label: 'FAQ', href: '#FAQ' },
    { label: 'CONTACT', href: '#FOOTER' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2">
      <div className="w-full px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/EzyRide.png"
            alt="EzyRide Logo"
            className="h-11 w-auto mr-3"
          />
        </div>

        {/* Desktop Nav */}
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

        {/* Hamburger Menu (Mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-md">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)} // auto-close menu on click
                  className="block text-lg text-gray-900 hover:text-blue-900 transition-all"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
