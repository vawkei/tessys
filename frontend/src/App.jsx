import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./store/auth/authIndex";
import ProfileHome from "./components/profile/ProfileHome";

function App() {
  axios.defaults.withCredentials = true;

   const { isLoggedIn,user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch,getLoginStatus]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/logIn" element={<Login />} />

        <Route path="/profile" element={<ProfileHome />} />
        {/* <Route  path="/profile/edit-profile" element={<ProfileForm />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
