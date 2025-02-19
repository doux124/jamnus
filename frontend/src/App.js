import { useState } from 'react';
import axios from 'axios';

function App() {
  const [shopName, setShopName] = useState('');
  const [total, setTotal] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      setError('Please upload a receipt image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('project-id', process.env.REACT_APP_JAMAI_PROJECT_ID);  // Uses the project ID from the .env file
    formData.append('pat', process.env.REACT_APP_JAMAI_PAT);  // Uses the PAT from the .env file

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
      <h1>Receipt Processor</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Receipt'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shopName && (
        <div>
          <h2>Receipt Information:</h2>
          <p><strong>Shop Name:</strong> {shopName}</p>
          <p><strong>Total:</strong> {total}</p>
        </div>
      )}
    </div>
  );
}

export default App;
