import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/main" element={<ProtectedRoute element={MainPage} />} />
      </Routes>
    </div>
  );
};

export default App;
