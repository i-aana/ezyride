import React from 'react';
import { Car as CarIcon, Users, Cog } from 'lucide-react';
import { Car } from '../types';

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div id ="GALLERY" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Vehicle</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury and comfort with our Mercedes C-Class
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-semibold">{car.name}</h3>
                <p className="text-white/80">${car.price} per day</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <CarIcon size={20} className="mr-2 text-blue-900" />
                    Vehicle Specifications
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Users size={18} className="mr-2" />
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Cog size={18} className="mr-2" />
                      <span className="capitalize">{car.transmission} Transmission</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Premium Features</h4>
                  <ul className="space-y-2">
                    {car.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="h-2 w-2 bg-blue-900 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;