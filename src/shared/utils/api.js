import axios from "axios";

export const userLogin = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
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
      "http://localhost:5000/api/users/signup",
      body
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users/");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addPlace = async (body) => {
  try {
    const response = await axios.post("http://localhost:5000/api/places", body);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPlaceByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/places/user/${userId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getPlaceByPlaceId = async (placeId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/places/${placeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updatePlaceById = async (body, placeId) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/places/${placeId}`,
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deletePlace = async (placeId) => {
  try {
    const response = axios.delete(
      `http://localhost:5000/api/places/${placeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
