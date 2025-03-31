import React from 'react';
import { ProductGrid } from '../components/products/ProductGrid'
import { sampleProducts } from '../mockData/SampleProduct';
import { Brain, Heart, Leaf, Scale, Zap, Weight, Utensils, Battery, Moon, Shield } from 'lucide-react';
import RecognizedBy from '../components/RecognizedBy';

const AllProductPage = () => {
  const healthIssues = [
    {
      title: "Mental Fatigue",
      description: "Struggling with focus and mental clarity?",
      icon: <Brain className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/mental.jpg"
    },
    {
      title: "Heart Health",
      description: "Concerned about cardiovascular wellness?",
      icon: <Heart className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/heart.jpg"
    },
    {
      title: "Digestive Issues",
      description: "Experiencing gut health problems?",
      icon: <Utensils className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/digestive.jpg"
    },
    {
      title: "Weight Management",
      description: "Finding it hard to maintain healthy weight?",
      icon: <Weight className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/weight.jpg"
    },
    {
      title: "Low Energy",
      description: "Feeling tired and lacking vitality?",
      icon: <Battery className="w-8 h-8 text-green-700" />,
      bgImage: "/assets/health/energy.jpg"
    }
  ];

  const naturalSolutions = [
    {
      title: "Brain Boost",
      image: "/assets/solutions/brain.jpg",
      description: "Enhanced Mental Clarity",
      icon: <Brain className="w-8 h-8 text-green-700" />
    },
    {
      title: "Heart Care",
      image: "/assets/solutions/heart.jpg",
      description: "Cardiovascular Support",
      icon: <Heart className="w-8 h-8 text-green-700" />
    },
    {
      title: "Gut Health",
      image: "/assets/solutions/gut.jpg",
      description: "Digestive Wellness",
      icon: <Leaf className="w-8 h-8 text-green-700" />
    },
    {
      title: "Weight Balance",
      image: "/assets/solutions/weight.jpg",
      description: "Natural Weight Management",
      icon: <Scale className="w-8 h-8 text-green-700" />
    },
    {
      title: "Energy Boost",
      image: "/assets/solutions/energy.jpg",
      description: "Natural Vitality",
      icon: <Zap className="w-8 h-8 text-green-700" />
    },
    {
      title: "Sleep Better",
      image: "/assets/solutions/sleep.jpg",
      description: "Restful Natural Sleep",
      icon: <Moon className="w-8 h-8 text-green-700" />
    },
    {
      title: "Immunity Shield",
      image: "/assets/solutions/immunity.jpg",
      description: "Natural Defense System",
      icon: <Shield className="w-8 h-8 text-green-700" />
    }
  ];

  return (
    <div className='bg-white'>
      {/* Health Issues Section */}
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold  font-delius text-center mb-3">Health Concerns?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover natural solutions for your everyday health challenges
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {healthIssues.map((issue, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                     style={{ backgroundImage: `url(${issue.bgImage})` }}>
                  <div className="absolute inset-0 bg-[#0d6b1e]"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 h-[220px] flex flex-col items-center justify-center text-center z-10">
                  <div className="bg-white/95 rounded-full p-4 mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-white">
                    {React.cloneElement(issue.icon, {
                      className: "w-8 h-8 text-[#9F97B8] transition-colors duration-500 group-hover:text-[#39445B]"
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-[#FFD87D]  font-playfair mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                    {issue.title}
                  </h3>
                  <p className="text-[#E9ECEF] text-sm transition-transform duration-500 group-hover:-translate-y-1">
                    {issue.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className="relative rounded-xl shadow-lg p-8 my-4 bg-cover bg-center h-[300px]"
          style={{
            backgroundImage: 'url("/assets/bannerimg/banner.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-bold font-titillium text-white mb-4">DID YOU KNOW ?</h1>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Carefully sourced from nature, minimally processed, and delivered fresh to your door. Each
              product maintains its natural goodness and nutritional integrity.
            </p>
          </div>
        </div>
      </div>
      
      {/* Natural Solutions Section */}
      <div className="max-w-7xl mx-auto px-4">
        <ProductGrid products={sampleProducts} />
      </div>

      {/* Bottom Banner Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className="relative rounded-xl shadow-lg p-8 my-4 bg-cover bg-center h-[300px]"
          style={{
            backgroundImage: 'url("/assets/honeyimg/honey.jpeg")',
          }}
        >
          <div className="absolute inset-0  rounded-xl"></div>
          
        </div>
      </div>
      <div className=" py-4">
      <RecognizedBy />
      </div>
    </div>
  );
}

export default AllProductPage;