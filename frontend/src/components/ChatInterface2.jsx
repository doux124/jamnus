import React, { useEffect, useRef, useState } from 'react';
import { User, Bot, FileText, Brain } from 'lucide-react';

const ChatInterface2 = ({ onBack }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome! I'm your AI Life Coach. I'm here to help you unlock your potential, overcome challenges, and create meaningful change in your life. What would you like to explore today?",
      sender: 'bot'
    },
  ]);
  const messagesEndRef = useRef(null);

  const handleTextChange = (e) => setText(e.target.value);

  const submitText = async () => {
    if (!text.trim()) {
      setError('Please share your thoughts with me');
      return;
    }

    setResult(null);
    setError(null);

    const userMessage = { id: messages.length + 1, text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setText('');

    const processingMessage = { id: messages.length + 2, text: "I'm thinking about this...", sender: 'bot' };
    setMessages(prev => [...prev, processingMessage]);

    const finalText = `${text.trim()} Be as gentle as possible.`; // ✨ Extra sentence here

    try {
      const response = await fetch('http://127.0.0.1:5000/nego', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: finalText }),
      });

      const data = await response.json();
      setResult(data);

      const outputMessage = { id: messages.length + 3, text: data.output1, sender: 'bot' };
      setMessages(prev => [...prev.filter(m => m.text !== "I'm thinking about this..."), outputMessage]);
    } catch (err) {
      const errorMessage = {
        id: messages.length + 3,
        text: `I apologize, but I encountered a technical issue. Please try sharing your thoughts again.`,
        sender: 'bot',
        isError: true,
      };
      setMessages(prev => [...prev.filter(m => m.text !== "I'm thinking about this..."), errorMessage]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 shadow-sm py-4 px-4">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">GentleMun</div>
              <div className="text-xs text-gray-500">Your Personal Growth Partner</div>
            </div>
          </div>
          <button
            onClick={onBack}
            className="text-sm text-white hover:underline transition"
          >
            ⬅ Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 w-full">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`flex items-start gap-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}>
                  {message.sender === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
                </div>
                <div className={`py-4 px-5 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-tr-md'
                    : message.isError
                      ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-md'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-md'
                }`}>
                  {message.isFile ? (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <p className="text-sm">{message.text}</p>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 py-6 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Share what's on your mind..."
            className="w-full p-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none resize-none transition-all duration-200 text-black"
            rows="3"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitText();
              }
            }}
          />
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">Press Enter to send • Shift + Enter for new line</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatInterface2;
