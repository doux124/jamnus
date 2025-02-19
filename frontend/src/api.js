import axios from 'axios';

const API_URL = "http://localhost:5000";  // Flask API base URL

// Function to send POST request to process receipt
export const processReceipt = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/process-receipt`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;  // Processed data from the backend
  } catch (error) {
    console.error("Error processing receipt:", error);
    throw error;
  }
};

// Function to send POST request to process multiple files (folder)
export const processFolder = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/process-folder`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;  // Processed data from the backend
  } catch (error) {
    console.error("Error processing folder:", error);
    throw error;
  }
};
