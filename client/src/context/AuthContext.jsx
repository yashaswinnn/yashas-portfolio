import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { adminApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Always clear on mount — force fresh login every time
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setChecking(false);
  }, []);

  const login = useCallback(async (password) => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi.login(password);
      localStorage.setItem('adminToken', data.token);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  }, []);

  if (checking) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);