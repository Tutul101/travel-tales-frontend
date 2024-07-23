import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  userId: null,
  login: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = (uID) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };
  const value = { isLoggedin, userId, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
