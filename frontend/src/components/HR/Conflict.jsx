import React, { useState, useRef } from 'react';
import axios from 'axios';
import { User, Bot, Upload, FileText, Folder, FileDigit } from 'lucide-react';
import { Link } from 'react-router-dom';

function Resume() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Please provide text or upload files for analysis.", sender: 'bot' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle folder selection
  const handleFolderSelect = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setResult(null);
    setError(null);

    // Add upload message
    const uploadMessage = {
      id: messages.length + 1,
      text: `Uploaded folder with ${files.length} files for analysis.`,
      sender: 'user',
      isFile: true
    };
    setMessages(prev => [...prev, uploadMessage]);

    // Add processing message
    const processingMessage = {
      id: messages.length + 2,
      text: `Processing ${files.length} files...`,
      sender: 'bot'
    };
    setMessages(prev => [...prev, processingMessage]);

    // Process each file
    const results = [];
    const errors = [];
    let compiledOutput = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // Read file content
        const fileContent = await readFileAsText(file);
        
        // Add file processing message
        const fileProcessingMessage = {
          id: messages.length + 3 + i,
          text: `Processing file ${i+1}/${files.length}: ${file.name}...`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, fileProcessingMessage]);

        // Send the file content to the server
        const response = await axios.post('http://127.0.0.1:5000/indiv', { text: fileContent });
        
        results.push({
          filename: file.name,
          result: response.data
        });

        // Add to compiled output
        compiledOutput += `File: ${file.name}\nAnalysis: ${response.data.output}\n\n`;

        // Add result message for this file
        const resultMessage = {
          id: messages.length + files.length + 3 + i,
          text: `Result for ${file.name}:\n**Legal Analysis**: ${response.data.output}`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, resultMessage]);

      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
        const errorMsg = err.response?.data?.error || `An error occurred while processing ${file.name}`;
        
        errors.push({
          filename: file.name,
          error: errorMsg
        });

        // Add to compiled output (include errors too)
        compiledOutput += `File: ${file.name}\nError: ${errorMsg}\n\n`;

        // Add error message for this file
        const errorMessage = {
          id: messages.length + files.length + 3 + i,
          text: `Error processing ${file.name}: ${errorMsg}`,
          sender: 'bot',
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }

      // Scroll to the bottom after each file is processed
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    // Add message about sending compiled results
    const compilingMessage = {
      id: messages.length + files.length * 2 + 3,
      text: `Compiling results from all files for comprehensive analysis...`,
      sender: 'bot'
    };
    setMessages(prev => [...prev, compilingMessage]);

    // Send the compiled output as a single request
    try {
      const compiledResponse = await axios.post('http://127.0.0.1:5000/conflict', { text: compiledOutput });
      
      // Add compiled result message
      const compiledResultMessage1 = {
        id: messages.length + files.length * 2 + 4,
        text: `**Comprehensive Analysis**:\n${compiledResponse.data.output1}`,
        sender: 'bot'
      };

      const compiledResultMessage2 = {
        id: messages.length + files.length * 2 + 4,
        text: `**Comprehensive Analysis**:\n${compiledResponse.data.output2}`,
        sender: 'bot'
      };

      const compiledResultMessage3 = {
        id: messages.length + files.length * 2 + 4,
        text: `**Comprehensive Analysis**:\n${compiledResponse.data.output3}`,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, compiledResultMessage1, compiledResultMessage2, compiledResultMessage3]);
      
    } catch (err) {
      console.error('Error in compiled analysis:', err);
      const errorMsg = err.response?.data?.error || 'An error occurred while processing the compiled results';
      
      // Add error message for compiled results
      const compiledErrorMessage = {
        id: messages.length + files.length * 2 + 4,
        text: `Error in comprehensive analysis: ${errorMsg}`,
        sender: 'bot',
        isError: true
      };
      
      setMessages(prev => [...prev, compiledErrorMessage]);
    }

    // Add summary message
    const summaryMessage = {
      id: messages.length + files.length * 2 + 5,
      text: `Completed processing ${files.length} files. ${results.length} processed successfully, ${errors.length} errors.`,
      sender: 'bot'
    };
    
    setMessages(prev => [...prev.filter(m => m.text !== `Processing ${files.length} files...`), summaryMessage]);
    setIsProcessing(false);
  };

  // Function to read file content as text
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  // Handle form submission for text input
  const submitText = async () => {
    if (!text.trim()) {
      setError('Please provide some text');
      return;
    }
    
    setResult(null);
    setError(null);
    setIsProcessing(true);
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user'
    };
    
    // Add processing message
    const processingMessage = { 
      id: messages.length + 2, 
      text: "Processing your text...", 
      sender: 'bot' 
    };
    
    setMessages(prev => [...prev, userMessage, processingMessage]);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/indiv', { text });
      console.log(response.data);
      
      setResult(response.data);
      
      // Add result message
      const outputMessage = { 
        id: messages.length + 3, 
        text: `**Legal Analysis**: ${response.data.output}`, 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev.filter(m => m.text !== "Processing your text..."), outputMessage]);
      
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
    
    setIsProcessing(false);
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
          <div className="text-xl font-bold text-gray-800">Conflict Analysis</div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link> 
            <div className="text-sm text-gray-500">Analyzes conflicts</div>
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
                      : message.isCompiled
                        ? 'bg-blue-50 text-blue-800 border border-blue-200 rounded-tl-none'
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
          <div className="flex gap-2 mb-3">
            <div
              onClick={handleUploadClick}
              className={`${isProcessing ? 'bg-gray-400' : 'bg-green-500'} text-white py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2`}
              disabled={isProcessing}
            >
              <Folder className="h-5 w-5" />
              <span>{isProcessing ? 'Processing...' : 'Upload Folder of Emails'}</span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFolderSelect}
                className="hidden"
                webkitdirectory="true"
                directory="true"
                multiple
                disabled={isProcessing}
              />
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              Or paste a singular email below for analysis.
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your email here for analysis..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            rows="4"
            disabled={isProcessing}
          />
          <div 
            onClick={submitText}
            className={`mt-3 ${isProcessing ? 'bg-gray-400' : 'bg-blue-500'} text-white text-center py-2 rounded-lg cursor-pointer`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Analyze Text'}
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      </footer>
    </div>
  );
}

export default Resume;