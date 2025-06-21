import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setAuth(JSON.parse(storedUser));
      }
    };
    loadAuth();
  }, []);

  const login = async (user) => {
    setAuth(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    setAuth(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
