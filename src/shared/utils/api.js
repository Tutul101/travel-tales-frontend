import axios from "axios";

export const userLogin = async (body) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}users/login`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const userSignUp = async (body) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}users/signup`,
      body
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}users/`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addPlace = async (body, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}places`,
      body,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPlaceByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}places/user/${userId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPlaceByPlaceId = async (placeId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}places/${placeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updatePlaceById = async (body, placeId, token) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}places/${placeId}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deletePlace = async (placeId, token) => {
  try {
    const response = axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}places/${placeId}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
