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

const login = async (userData)=>{
  const response = await axios.post(API_URL + "login", userData);
  return response.data
};

const logout = async()=>{
    const response = await axios.get(API_URL + "logout");
    return response.data
};

const getLoginStatus = async()=>{
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data
};

const getUser = async()=>{
  const response = await axios.get(API_URL + "getUser");
  return response.data
}

const authService = { register,verifyEmail,login,logout,getLoginStatus, getUser };

export default authService;
