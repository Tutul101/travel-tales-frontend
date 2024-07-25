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
    const response = await axios.post(
      "http://localhost:5000/api/places",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
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
