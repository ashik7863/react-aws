import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const owner = localStorage.getItem("owner");
    if (owner) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (userData) => {
    if (userData.owner !== "Super Admin") {
      localStorage.setItem("owner", userData.owner);
      localStorage.setItem("rst_id", userData.rst_id);
      localStorage.setItem("restaurant_name", userData.restaurant_name);
    } else {
      localStorage.setItem("owner", userData.owner);
    }
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("owner");
    localStorage.removeItem("rst_id");
    localStorage.removeItem("restaurant_name");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
