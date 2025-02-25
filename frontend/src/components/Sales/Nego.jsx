import React, { useState, useRef } from 'react';
import axios from 'axios';
import { User, Bot, Upload, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function Resume() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Please provide the text for analysis.", sender: 'bot' },
  ]);
  const messagesEndRef = useRef(null);

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submission
  const submitText = async () => {
    if (!text.trim()) {
      setError('Please provide some text');
      return;
    }
    
    setResult(null);
    setError(null);
    
    // Add processing message
    const processingMessage = { 
      id: messages.length + 2, 
      text: "Processing your text...", 
      sender: 'bot' 
    };
    setMessages(prev => [...prev, processingMessage]);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/nego', { text });
      console.log(response.data); // Log the response to inspect its structure

      
      setResult(response.data);
      
      // Add result messages
      const outputMessage1 = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.output1}`, 
        sender: 'bot' 
      };
      const outputMessage2 = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.output2}`, 
        sender: 'bot' 
      };
      const outputMessage3 = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.output3}`, 
        sender: 'bot' 
      };
      const outputMessage4 = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.output4}`, 
        sender: 'bot' 
      };
      const outputMessage5 = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.output5}`, 
        sender: 'bot' 
      };
      const outputMessage6 = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.output6}`, 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev.filter(m => m.text !== "Processing your text..."), outputMessage1, outputMessage2, outputMessage3, outputMessage4, outputMessage5, outputMessage6]);
      
    } catch (err) {
      console.error('Error:', err);
      const errorMsg = err.response?.data?.error || 'An error occurred while processing your text';
      setError(errorMsg);
      
      // Add error message
      const errorMessage = { 
        id: messages.length + 3, 
        text: `Error: ${errorMsg}`, 
        sender: 'bot',
        isError: true
      };
      
      setMessages(prev => [...prev.filter(m => m.text !== "Processing your text..."), errorMessage]);
    }
  };

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm py-4 px-4">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">Negotiation</div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link> 
            <div className="text-sm text-gray-500">Analyzes negotiations</div>
          </div>
        </div>
      </header>

      {/* Main chat container */}
      <main className="flex-1 overflow-y-auto p-4 w-full">
        <div className="w-full max-w-6xl mx-auto space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-4xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-200'}`}>
                  {message.sender === 'user' ? 
                    <User className="h-5 w-5 text-white" /> : 
                    <Bot className="h-5 w-5 text-gray-600" />
                  }
                </div>
                <div className={`py-3 px-4 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : message.isError
                      ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-none'
                      : 'bg-white text-gray-800 shadow-sm rounded-tl-none'
                }`}>
                  {message.isFile ? (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <p className="text-sm">{message.text}</p>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Text input area */}
      <footer className="bg-white border-t py-3 px-4">
        <div className="w-full max-w-6xl mx-auto text-black">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type your resume or text here..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            rows="4"
          />
          <div 
            onClick={submitText}
            className="mt-3 bg-blue-500 text-white text-center py-2 rounded-lg cursor-pointer"
          >
            Analyze Text
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      </footer>
    </div>
  );
}

export default Resume;
