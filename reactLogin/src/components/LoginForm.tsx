import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [values, setValues] = useState({ username: '', password: '' });

  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', values);
      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message || 'Login failed. Please try again.');
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <form className="login-form" >
      <input
        onChange={handleInputChange}
        value={values.username}
        className="form-field"
        placeholder="Username"
        name="username"
      />
      <input
        onChange={handleInputChange}
        value={values.password}
        className="form-field"
        placeholder="Password"
        name="password"
        type="password"
      />
      <button onClick={handleLoginSubmit} className="submit-button">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
