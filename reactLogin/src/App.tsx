// src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './components/LoginForm';

const App = () => {
  const [message, setMessage] = useState<string>('');

  const handleLoginSubmit = async (values: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, values);
      setMessage(response.data.message);
      console.log("Trying")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message || 'Login failed. Please try again.');
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="App">
      <LoginForm onSubmit={handleLoginSubmit} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
