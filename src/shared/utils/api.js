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

export const getAllUser = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
