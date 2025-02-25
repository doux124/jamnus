import { Link } from 'react-router-dom';

const Sales = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden" 
         style={{
           background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #fcd34d 70%, #f59e0b 100%)"
         }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Circular gradient overlay */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-amber-200/30 to-amber-500/30 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-400/20 to-amber-100/20 blur-xl"></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-amber-300/30"></div>
        <div className="absolute top-40 left-1/4 w-8 h-32 rounded-full bg-amber-400/20 rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-amber-200/30 rounded-lg rotate-12"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border-4 border-amber-300/30 rounded-lg rotate-45"></div>
      </div>
      
      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-3xl backdrop-blur-sm bg-white/20 p-8 rounded-2xl shadow-xl border border-amber-200/50">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 text-center">Sales Portal</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-300 to-amber-500 mx-auto mb-8 rounded-full"></div>
          
          <div className="grid gap-8 md:grid-cols-2 sm:grid-cols-1">
            <Link to="/nego" className="group">
              <button 
                className="w-full bg-gradient-to-br from-amber-400 to-amber-600 group-hover:from-amber-500 group-hover:to-amber-700 text-white font-bold py-8 px-4 rounded-xl shadow-lg transition-all duration-300 text-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-amber-300/20 w-0 group-hover:w-full transition-all duration-700 rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                  </svg>
                  Negotiation
                </span>
              </button>
            </Link>
            
            <Link to="/nego" className="group">
              <button 
                className="w-full bg-gradient-to-br from-amber-400 to-amber-600 group-hover:from-amber-500 group-hover:to-amber-700 text-white font-bold py-8 px-4 rounded-xl shadow-lg transition-all duration-300 text-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-amber-300/20 w-0 group-hover:w-full transition-all duration-700 rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Report Summary
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;