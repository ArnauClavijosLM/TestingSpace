// src/components/App.tsx
import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

const App = () => {
  const handleLoginSubmit = (values: { username: string; password: string }) => {
    console.log("Form submitted with values:", values);



    // Llogica per enviar formulari



  };

  return (
    <div className="App">
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default App;
