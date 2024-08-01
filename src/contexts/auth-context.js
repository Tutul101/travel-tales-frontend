import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  token: null,
  userId: null,
  login: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const login = (uID, jwtToken) => {
    setToken(jwtToken);
    setUserId(uID);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  const value = { isLoggedin: !!token, token, userId, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
