import { Link } from 'react-router-dom';

const HR = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center p-6" style={{
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(21, 87, 153, 0.3) 0%, rgba(6, 25, 44, 0.5) 90%), linear-gradient(45deg, rgba(18, 40, 76, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)',
      backgroundSize: 'cover',
    }}>
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Human Resources Portal</h1>
          <p className="text-blue-300 text-lg max-w-2xl mx-auto">Access HR services and resources through our centralized dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/conflict" className="group">
            <div className="bg-blue-600 group-hover:bg-blue-700 text-white p-8 rounded-lg transform transition-all duration-300 group-hover:scale-105 shadow-lg flex flex-col items-center justify-center h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xl font-bold">Recruitment</span>
              <span className="text-blue-200 mt-2">Job postings, applications & hiring</span>
            </div>
          </Link>
          
          <Link to="/conflict" className="group">
            <div className="bg-purple-600 group-hover:bg-purple-700 text-white p-8 rounded-lg transform transition-all duration-300 group-hover:scale-105 shadow-lg flex flex-col items-center justify-center h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xl font-bold">SOP Guidelines</span>
              <span className="text-purple-200 mt-2">Policies, procedures & standards</span>
            </div>
          </Link>
          
          <Link to="/conflict" className="group">
            <div className="bg-teal-600 group-hover:bg-teal-700 text-white p-8 rounded-lg transform transition-all duration-300 group-hover:scale-105 shadow-lg flex flex-col items-center justify-center h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xl font-bold">Conflict Resolution</span>
              <span className="text-teal-200 mt-2">Mediation, support & solutions</span>
            </div>
          </Link>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">© 2025 Jordan's Company • <span className="text-blue-400">HR Department</span></p>
        </div>
      </div>
    </div>
  );
};

export default HR;