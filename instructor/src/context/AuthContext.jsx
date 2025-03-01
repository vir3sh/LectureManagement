import { createContext, useState, useEffect } from "react";
import React from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const instructorId = localStorage.getItem("instructorId");

    // console.log("Checking localStorage on refresh:", { token, instructorId });

    if (token && instructorId) {
      setUser({ token, instructorId });
      //   console.log("User restored from localStorage:", { token, instructorId });
    }
  }, []);

  const login = (token, instructorId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("instructorId", instructorId);
    setUser({ token, instructorId });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("instructorId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
