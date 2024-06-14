import React, { useState, ChangeEvent } from 'react';
import './App.css';

const App = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleUsernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, username: event.target.value });
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
  };

  return (
    <div className="App">
      <form className="login-form">
        <input
          onChange={handleUsernameInputChange}
          value={values.username}
          className="form-field"
          placeholder="Username"
          name="usern"
        />
        <input
          onChange={handlePasswordInputChange} // Added onChange handler for the password input
          value={values.password}
          className="form-field"
          placeholder="Password"
          name="passw"
          type="password" // Ensuring it's a password input
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default App;
