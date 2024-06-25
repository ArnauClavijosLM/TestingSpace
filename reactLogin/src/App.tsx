import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';
console.log("App.tsx")

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (values: { username: string; password: string }) => {
    try {
      const response = await axios.post('/login', values);
      setMessage(response.data.message);
      navigate('/');
      console.log('Trying');
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
