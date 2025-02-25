import { Link } from 'react-router-dom';

const Marketing = () => {
  const marketingFeatures = [
    {
      title: "Information Extraction",
      description: "Extract valuable insights from your marketing data",
      icon: "📊"
    },
    {
      title: "CRM",
      description: "Manage customer relationships effectively",
      icon: "👥"
    },
    {
      title: "Email Automation",
      description: "Automate email campaigns for better engagement",
      icon: "📧"
    }
  ];

  return (
    <div className="w-screen h-screen mx-auto p-6 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/3 z-0"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100 rounded-full opacity-70 translate-x-1/3 translate-y-1/3 z-0"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-40 z-0"></div>
      
      <div className="relative z-10 pt-24">
        <h1 className="text-3xl font-bold mb-2 text-center pb-4">Marketing Solutions</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
        
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
            {marketingFeatures.map((feature, index) => (
              <Link to="/nego" className="group flex justify-center" key={index}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center border border-gray-200 hover:border-blue-500 group-hover:transform group-hover:scale-105 w-full max-w-xs relative overflow-hidden">
                  {/* Card corner decoration */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                  
                  <div className="text-5xl mb-4 bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center shadow-sm group-hover:text-blue-600 transition-colors">{feature.icon}</div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="mt-auto w-full">
                    <div className="py-2 px-4 bg-blue-50 text-blue-600 rounded-md font-medium text-sm hover:bg-blue-100 transition-colors">
                      Learn More
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;