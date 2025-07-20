import React, { useEffect, useState } from 'react';
import { Brain, Sparkles, Target, Heart, Zap, MessageCircle, ChevronRight } from 'lucide-react';

const HomeIntro = ({ onStartClassic, onStartGentle }) => {
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    const sequence = [
      () => setIntroStep(1),
      () => setIntroStep(2),
      () => setIntroStep(3),
      () => setIntroStep(4),
    ];

    sequence.forEach((step, index) => {
      setTimeout(step, (index + 1) * 800);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo Animation */}
        <div className={`transition-all duration-1000 transform ${introStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-yellow-900" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
            CoachMun
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-1000 delay-300 transform ${introStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Your personal guide to growth, clarity, and transformation
          </p>
        </div>

        {/* Features */}
        <div className={`transition-all duration-1000 delay-600 transform ${introStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Target className="h-8 w-8 text-purple-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Goal Setting</h3>
              <p className="text-blue-100 text-sm">Define and achieve your most important objectives</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Heart className="h-8 w-8 text-pink-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Emotional Support</h3>
              <p className="text-blue-100 text-sm">Navigate life's challenges with confidence</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Zap className="h-8 w-8 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Personal Growth</h3>
              <p className="text-blue-100 text-sm">Unlock your potential and build better habits</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className={`transition-all duration-1000 delay-900 transform ${introStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartClassic}
              className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <MessageCircle className="h-6 w-6" />
              Start Classic Coaching
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onStartGentle}
              className="group bg-gradient-to-r from-pink-400 to-indigo-500 hover:from-pink-500 hover:to-indigo-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <MessageCircle className="h-6 w-6" />
              Start Gentle Coaching
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4 opacity-75">
            Begin your conversation with AI-powered life coaching
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default HomeIntro;
