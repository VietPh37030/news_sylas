// src/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(''); // Optional: Store user ID if needed

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // Get userId from localStorage or token
      const storedUserId = localStorage.getItem('userId'); // Or extract from token
      if (storedUserId) {
        fetchUserData(storedUserId); // Fetch user data using user ID
      }
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/get-user-by-id/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsername(data.username);
        setUserId(data._id); // Optionally set the user ID in context
      } else {
        console.error('Failed to fetch user data:', data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userId', userData._id); // Store user ID in localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
