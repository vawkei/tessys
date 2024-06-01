import classes from "./VerifyEmailComponent.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/button/Button";
import { authSliceActions, verifyEmail } from "../../store/auth/authIndex";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmailComponent = () => {
  const [showAccountSuccessful, setShowAccountSuccessful] = useState(false);

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);
  console.log(message);

  const query = useQuery();

  useEffect(() => {
    const verificationToken = query.get("token");
    const email = query.get("email");
    dispatch(verifyEmail({ verificationToken, email }));


  }, [dispatch]);


  useEffect(()=>{
    if (message === "email verification successful") {
      setShowAccountSuccessful(true);
      dispatch(authSliceActions.RESET_AUTH())
    };
  },[message])


  return (
    <div className={classes["account-confirmation"]}>
      {showAccountSuccessful && (
        <>
          <h2>Account Confirmed</h2>
          <Link to={"/login"}>
            <Button className={classes.btn}>Please log in</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmailComponent;
