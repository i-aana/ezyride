import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      stars: 5,
      text: 'EzyRide made my business trip so much smoother. The car was immaculate, and pickup was a breeze. I\'ll definitely be using their service for all my future trips!',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Family Vacation',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      stars: 5,
      text: 'We rented an SUV for our family vacation and couldn\'t be happier. The vehicle was spacious, comfortable, and perfect for our road trip. The kids loved it!',
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Weekend Getaway',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      stars: 4,
      text: 'I wanted something special for a weekend away with my partner, and the luxury convertible was perfect. The booking process was simple and the car was a dream to drive.',
    },
  ];

  return (
    <div id ="FAQ" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Don't just take our word for it - hear from some of our satisfied customers about their experience with EzyRide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-sm">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center pt-8">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      fill={i < testimonial.stars ? 'currentColor' : 'none'} 
                      className={i < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'} 
                      size={16} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;