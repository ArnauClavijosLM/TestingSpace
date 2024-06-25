import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface User {
  username: string;
  password: string;
}

const MainPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<User[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get('/users', {
        params: { search: keyword },
      });
      setResults(response.data);
    } catch (error) {
      console.error('There was an error fetching the users!', error);
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          value={keyword}
          className="form-field"
          placeholder="Enter keyword"
          name="keyword"
        />
        <button type="submit" className="submit-button">Search</button>
      </form>

      <div className="results">
        {results.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {results.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
