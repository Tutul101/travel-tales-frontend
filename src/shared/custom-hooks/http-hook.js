import { useState, useCallback, useContext } from "react";
import {
  getAllUser,
  userLogin,
  userSignUp,
  addPlace,
  getPlaceByUserId,
  getPlaceByPlaceId,
  updatePlaceById,
  deletePlace,
} from "../utils/api";
import { AuthContext } from "../../contexts/auth-context";

export const useHttpClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const sendRequest = useCallback(async (action, body = null, id = null) => {
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
        case "getuser":
          response = await getAllUser();
          break;
        case "addplace":
          response = await addPlace(body, token);
          break;
        case "getplacebyuserid":
          response = await getPlaceByUserId(id);
          break;
        case "getplacebyplaceid":
          response = await getPlaceByPlaceId(id);
          break;
        case "updateplace":
          response = await updatePlaceById(body, id, token);
          break;
        case "deleteplace":
          response = await deletePlace(id, token);
          break;
        default:
          response = await getAllUser();
      }
      setLoading(false);
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
