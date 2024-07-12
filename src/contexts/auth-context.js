import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  login: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const value = { isLoggedin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
