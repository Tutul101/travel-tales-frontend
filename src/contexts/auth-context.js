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
  const login = (uID, jwtToken, expirationDate) => {
    setToken(jwtToken);
    setUserId(uID);
    const tokenExpierationDate =
      expirationDate || new Date().getTime() + 1000 * 60 * 60;
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uID,
        token: jwtToken,
        expiration: tokenExpierationDate,
      })
    );
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  };

  const value = { isLoggedin: !!token, token, userId, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
