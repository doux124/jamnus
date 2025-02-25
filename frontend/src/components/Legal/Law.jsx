import React, { useState, useRef } from 'react';
import axios from 'axios';
import { User, Bot, Upload, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function Law() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Please upload an image.", sender: 'bot' },
  ]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Add file message to chat
      const fileMessage = { 
        id: messages.length + 1, 
        text: `Selected file: ${selectedFile.name}`, 
        sender: 'user',
        isFile: true,
        fileName: selectedFile.name
      };
      setMessages([...messages, fileMessage]);
      
      // Auto submit when file is selected
      submitFile(selectedFile);
    }
  };

  // Handle form submission
  const submitFile = async (selectedFile) => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }
    
    setResult(null);
    setError(null);
    
    // Add processing message
    const processingMessage = { 
      id: messages.length + 2, 
      text: "Processing your image...", 
      sender: 'bot' 
    };
    setMessages(prev => [...prev, processingMessage]);
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/law', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data);
      
      // Add result messages
      const lawMessage = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.law}`, 
        sender: 'bot' 
      };
      
      const recMessage = { 
        id: messages.length + 4, 
        text: `**Recommendation**: ${response.data.rec}`, 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev.filter(m => m.text !== "Processing your image..."), lawMessage, recMessage]);
      
    } catch (err) {
      console.error('Error:', err);
      const errorMsg = err.response?.data?.error || 'An error occurred while processing your image';
      setError(errorMsg);
      
      // Add error message
      const errorMessage = { 
        id: messages.length + 3, 
        text: `Error: ${errorMsg}`, 
        sender: 'bot',
        isError: true
      };
      
      setMessages(prev => [...prev.filter(m => m.text !== "Processing your image..."), errorMessage]);
    }
  };
  
  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current.click();
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
          <div className="text-xl font-bold text-gray-800">Legality Analysis</div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link> 
            <div className="text-sm text-gray-500">Analyzes images for legal compliance</div>
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

      {/* Upload area */}
      <footer className="bg-white border-t py-3 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div 
            onClick={triggerFileUpload}
            className="flex items-center justify-center gap-3 bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <Upload className="h-6 w-6 text-gray-500" />
            <span className="text-gray-700">Click to upload an image</span>
            <input 
              ref={fileInputRef}
              type="file" 
              id="file" 
              name="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Supported formats: JPEG, PNG, HEIF - Max file size: 10MB
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Law;