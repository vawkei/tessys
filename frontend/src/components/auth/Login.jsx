import classes from "./Auth.module.css";
import signImage from "../../assets/veeshopsignin-removebg-preview.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";

import { useDispatch, useSelector } from "react-redux";
//import { getCartDb, saveCartDb } from "../../store/cart/cartIndex";
// import Spinner from "../ui/spinner/Spinner";

// import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { login } from "../../store/auth/authIndex";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function passwordTypeToggle() {
    setShowPassword((prevState) => !prevState);
  }

  const enteredEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const enteredPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      !enteredEmail ||
      !enteredPassword
    ) {
      console.log("Please fill out the inputs");
      //toast.error("Please fill out the inputs", { position: "top-left" });
      return;
    }

    const userData = { email: enteredEmail, password: enteredPassword };
    console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/");
    }
  }, [isLoggedIn, isSuccess]);

  return (
    <div className={classes.container}>
      {/* {isLoading && <Spinner />} */}
      <h1>Login</h1>
      <section className={classes.auth}>
        <div className={classes.image}>
          <img src={signImage} alt="login" width={400} height={300} />
        </div>

        <div className={classes.cardDiv}>
          <Card className={classes.cardClass}>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label>Your Email</label>
                <input
                  type="email"
                  value={enteredEmail}
                  onChange={enteredEmailChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label>Your Password</label>
                <input
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  value={enteredPassword}
                  onChange={enteredPasswordChangeHandler}
                />
                {showPassword ? (
                  <AiOutlineEye
                    size={24}
                    onClick={passwordTypeToggle}
                    className={classes.passwordToggle}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={24}
                    onClick={passwordTypeToggle}
                    className={classes.passwordToggle}
                  />
                )}
              </div>

              <div className={classes.action}>
                <Button className={classes.btn}>Login</Button>
              </div>

              <div className={classes.links}>
                <>
                  <p className={classes.login}>
                    <Link to={"/register"}>Don't have an account?</Link>
                  </p>
                  <p className={classes.forgot}>
                    <Link to={"/forgot-password"}>Forgot your password?</Link>
                  </p>
                </>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;
