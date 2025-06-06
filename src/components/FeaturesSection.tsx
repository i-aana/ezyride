import React from 'react';
import { ShieldCheck, Clock, CreditCard, Award } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck size={32} className="text-blue-900" />,
      title: 'Safe & Reliable',
      description: 'All our vehicles undergo regular maintenance and safety checks to ensure your peace of mind.'
    },
    {
      icon: <Clock size={32} className="text-blue-900" />,
      title: 'Fast & Easy Booking',
      description: 'Our streamlined booking process gets you on the road quickly with minimal paperwork.'
    },
    {
      icon: <CreditCard size={32} className="text-blue-900" />,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprise charges. What you see is what you pay.'
    },
    {
      icon: <Award size={32} className="text-blue-900" />,
      title: 'Premium Vehicles',
      description: 'Choose from our wide selection of well-maintained, late-model vehicles.'
    }
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EzyRide</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            We pride ourselves on providing exceptional service and premium vehicles for all your travel needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;