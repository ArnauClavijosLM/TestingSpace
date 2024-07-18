import { useEffect, useState } from 'react';
import axios from 'axios';

type AuthorizationResponse = {
  isAuthorized : boolean
  isLoading : boolean
}

const useAuth = (): AuthorizationResponse => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response)
        setIsAuthorized(true);

      })
      .catch(() => {
        localStorage.removeItem('token');
        setIsAuthorized(false);
      })
      .finally(() => {
        setIsLoading(false)
      });
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, []);

  return { isAuthorized, isLoading };
};

export default useAuth;
