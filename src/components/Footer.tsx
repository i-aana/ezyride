import React from 'react';
import { Car, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Car className="mr-2 text-white" size={24} />
              <span className="font-bold text-xl text-white tracking-tight">
                EzyRide
              </span>
            </div>
            <p className="text-sm mb-4">
              Premium car rental service with a wide range of vehicles for any occasion. Experience comfort, reliability, and exceptional service.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(platform => (
                <a 
                  key={platform}
                  href="#" 
                  className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-900 transition-colors"
                >
                  <span className="sr-only">{platform}</span>
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.5 7.5h-1.5c-.276 0-.5.224-.5.5v1.5h2l-.5 2h-1.5v5h-2v-5h-1.5v-2h1.5v-1.5c0-1.93 1.07-3 3-3h1.5v2z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'About Us', 'Our Fleet', 'Locations', 'Rental Terms', 'FAQ'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Vehicle Categories */}
          {/* <div>
            <h3 className="font-semibold text-white text-lg mb-4">Vehicle Types</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Economy Cars', 
                'Standard Cars', 
                'Luxury Cars', 
                'SUVs & Crossovers', 
                'Vans & Minivans', 
                'Electric Vehicles'
              ].map(category => (
                <li key={category}>
                  <a href="#" className="hover:text-white transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 text-gray-400 flex-shrink-0 mt-1" size={18} />
                <span>
                  123 Rental Street
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-gray-400" size={18} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={18} />
                <span>info@EzyRide.com</span>
              </li>
            </ul>
          </div>
        </div>
        
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