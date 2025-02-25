import { Link } from 'react-router-dom';

function Legal() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-indigo-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Legal Resource Center
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
            Your comprehensive gateway to legal information and assistance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/resume" className="group">
            <div className="h-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Resume Analysis</h2>
              <p className="text-gray-600 mb-6 flex-grow">To search for the perfect candidate</p>
              <span className="text-indigo-600 font-medium inline-flex items-center group-hover:text-indigo-800">
                Click to use resource
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </div>
          </Link>

          <Link to="/law" className="group">
            <div className="h-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Law Analysis</h2>
              <p className="text-gray-600 mb-6 flex-grow">Check if action is legal</p>
              <span className="text-indigo-600 font-medium inline-flex items-center group-hover:text-indigo-800">
              Click to use resource
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </div>
          </Link>

          <Link to="/law" className="group">
            <div className="h-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Family Law</h2>
              <p className="text-gray-600 mb-6 flex-grow">Divorce, custody, adoption, and other family legal matters</p>
              <span className="text-indigo-600 font-medium inline-flex items-center group-hover:text-indigo-800">
                Explore resources
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </div>
          </Link>

          <Link to="/law" className="group">
            <div className="h-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Corporate Law</h2>
              <p className="text-gray-600 mb-6 flex-grow">Business formation, contracts, compliance, and corporate governance</p>
              <span className="text-indigo-600 font-medium inline-flex items-center group-hover:text-indigo-800">
                Explore resources
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Legal;