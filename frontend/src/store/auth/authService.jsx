import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/auth/`;

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const verifyEmail = async (verificationToken, email) => {
  const response = await axios.post(API_URL + "verifyEmail", {
    verificationToken,
    email,
  });
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data;
};

const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

const updateUserPhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updateUserPhoto", userData);
};

const updateUser = async (userData)=>{
  const response =  await axios.patch(API_URL + "updateUser", userData);
  return response.data
};

const getAllUsers = async ()=>{
  const response = await axios.get(API_URL + "getAllUsers");
  return response.data
};

const authService = {
  register,
  verifyEmail,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUserPhoto,
  updateUser,
  getAllUsers
};

export default authService;
