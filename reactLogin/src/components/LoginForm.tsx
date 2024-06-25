import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState({ username: '', password: '' });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default LoginForm;
