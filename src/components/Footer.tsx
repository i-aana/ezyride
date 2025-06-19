import React from 'react';
import { Car, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const ConnectLinks = [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Twitter', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div id="FOOTER" className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 text-gray-400 mt-1" size={18} />
                <span>231 Morgantown Road</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-gray-400" size={18} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={18} />
                <span>booking@ezyrideky.com</span>
              </li>
            </ul>

            <p className="text-sm mt-6">WE LOVE YOUR FEEDBACK!</p>
            <p className="text-sm">THANK YOU FOR SUPPORTING LOCAL BUSINESS</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['HOME', 'GALLERY', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <br></br>
            <h3 className="font-semibold text-white text-lg mb-4">Connect With Us</h3>
            <ul className="flex space-x-4">
              {ConnectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-900 transition-colors text-xs uppercase"
                  >
                    {item.label[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            {/* add logo */}
            <img 
            src="/EzyRide.png" 
            alt="EzyRide Logo"
            className="h-20 w-auto mr-3"
          />
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} EzyRide. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
