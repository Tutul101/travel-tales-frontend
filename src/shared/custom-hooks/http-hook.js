import { useState, useCallback } from "react";
import { getAllUser, userLogin, userSignUp } from "../utils/api";

export const useHttpClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (action, body = null) => {
    setLoading(true);
    try {
      let response;
      switch (action) {
        case "login":
          response = await userLogin(body);
          break;
        case "signup":
          response = await userSignUp(body);
          break;
        default:
          response = await getAllUser();
      }
      return response;
    } catch (err) {
      setError(err.message || "Something went wrong please try again");
      setLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };
  return {
    loading: loading,
    error: error,
    sendRequest: sendRequest,
    clearError: clearError,
  };
};