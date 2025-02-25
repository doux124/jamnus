import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Scale, Megaphone } from 'lucide-react';

const Main = () => {
  const departments = [
    { name: 'Sales', icon: <Sparkles />, color: 'from-blue-500 to-cyan-300' },
    { name: 'HR', icon: <Users />, color: 'from-purple-500 to-pink-300' },
    { name: 'Legal', icon: <Scale />, color: 'from-green-500 to-emerald-300' },
    { name: 'Marketing', icon: <Megaphone />, color: 'from-orange-500 to-yellow-300' }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 flex flex-col">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-bold text-white mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Choose a Department
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          {departments.map((dept) => (
            <Link
              key={dept.name}
              to={`/${dept.name.toLowerCase()}`}
              className={`
                group relative p-8 rounded-2xl
                bg-gray-800/50 backdrop-blur-sm
                hover:bg-gray-700/60
                transform transition-all duration-300
                hover:scale-105 hover:-translate-y-2
                border border-gray-700/50 hover:border-gray-600
                flex flex-col items-center justify-center
                min-h-[200px]
              `}
            >
              <div className={`
                absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10
                bg-gradient-to-r ${dept.color}
              `} />
              
              <div className="relative flex flex-col items-center space-y-6">
                <div className={`
                  p-4 rounded-xl
                  bg-gradient-to-r ${dept.color}
                  transform transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-6
                `}>
                  {React.cloneElement(dept.icon, { size: 32 })}
                </div>
                
                <span className="text-2xl font-semibold text-white text-center">
                  {dept.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;