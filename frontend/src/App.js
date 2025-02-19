import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [shopName, setShopName] = useState('');
  const [total, setTotal] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      setError('Please upload a receipt image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('project-id', process.env.REACT_APP_JAMAI_PROJECT_ID);
    formData.append('pat', process.env.REACT_APP_JAMAI_PAT);

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/process_receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { shop_name, total } = response.data;
      setShopName(shop_name);
      setTotal(total);
      setError('');
    } catch (err) {
      setError('Failed to process the receipt. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <div className="chatbox">
        <div className="chat-message bot-message">
          <h1>Receipt Processor</h1>
          <p>Hi! Please upload your receipt for processing.</p>
        </div>

        {error && <div className="chat-message error-message"><p>{error}</p></div>}

        <div className="chat-message user-message">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Processing...' : 'Submit Receipt'}
            </button>
          </form>
        </div>

        {shopName && (
          <div className="chat-message bot-message">
            <h2>Receipt Information:</h2>
            <p><strong>Shop Name:</strong> {shopName}</p>
            <p><strong>Total:</strong> {total}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
