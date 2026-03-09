import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password, role) => {
    setLoading(true);
    try {
      // Mock login - In real app, this would be an API call
      if (username === 'admin' && password === 'password') {
        const userData = { 
          id: 1, 
          username: 'admin', 
          role: 'superadmin', 
          name: 'Super Admin',
          email: 'admin@school.com'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
        return { success: true };
      } 
      else if (username === 'schooladmin' && password === 'password') {
        const userData = { 
          id: 2, 
          username: 'schooladmin', 
          role: 'admin', 
          name: 'School Admin',
          email: 'admin@school.com'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
        return { success: true };
      }
      else if (username === 'teacher' && password === 'password') {
        const userData = { 
          id: 3, 
          username: 'teacher', 
          role: 'teacher', 
          name: 'John Teacher',
          email: 'teacher@school.com'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
        return { success: true };
      }
      else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Check for saved user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'superadmin',
    isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
    isTeacher: user?.role === 'teacher'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
