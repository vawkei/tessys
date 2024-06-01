import Card from "../ui/card/Card";
import classes from "./Auth.module.css";
// import styles from "./VerifyEmail.module.css";
import registerImage from "../../assets/veeshopregister-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import { useState } from "react";
import { register } from "../../store/auth/authIndex";
import {useDispatch} from "react-redux";

const Register = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmEnteredPassword, setConfirmEnteredPassword] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");


  const dispatch = useDispatch();

  const enteredNameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const enteredEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const enteredPasswordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const confirmEnteredPasswordChangeHandler = (e) => {
    setConfirmEnteredPassword(e.target.value);
  };
  const enteredPhoneNumberChangeHandler = (e)=>{
    setEnteredPhoneNumber(e.target.value)
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      enteredName.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      confirmEnteredPassword.trim().length === 0 ||
      !enteredName ||
      !enteredEmail ||
      !enteredPassword ||
      !confirmEnteredPassword ||
      !enteredPhoneNumber
    ) {
      console.log("Please fill out the inputs");
      // toast.error("Please fill out the inputs", { position: "top-left" });
      return;
    }

    if (enteredPassword < 6) {
      console.log("Password characters should be more than six");
      // toast.error("Password characters should be more than six", {
      //   position: "top-left",
      // });
      return;
    }

    if (enteredPassword !== confirmEnteredPassword) {
      console.log("Please check your passwords");
      // toast.error("Please check your passwords", { position: "top-left" });
      return;
    }

    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      confirmedPassword: confirmEnteredPassword,
      enteredPhoneNumber:enteredPhoneNumber
    };
    console.log(userData);
    await dispatch(register(userData));
  };

  return (
    <div className={classes.container}>
      <h1>Register</h1>
      <section className={classes.auth}>
        <div className={classes.image}>
          <img src={registerImage} alt="" width={400} height={300} />
        </div>

        <div className={classes.cardDiv}>
          <Card className={classes.cardClass}>
            <form onSubmit={submitHandler} className={classes.form}>
              <div className={classes.control}>
                <label htmlFor="">Your Name</label>
                <input
                  type="text"
                  value={enteredName}
                  onChange={enteredNameChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="">Your Email</label>
                <input
                  type="text"
                  value={enteredEmail}
                  onChange={enteredEmailChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="">Your Password</label>
                <input
                  type="password"
                  value={enteredPassword}
                  onChange={enteredPasswordChangeHandler}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="">Confirm Your Password</label>
                <input
                  type="password"
                  value={confirmEnteredPassword}
                  onChange={confirmEnteredPasswordChangeHandler}
                />
              </div>


              <div className={classes.control}>
                <label htmlFor="">Phone</label>
                <input
                  type=""
                  placeholder="phone number should be 11 digits"
                  value={enteredPhoneNumber}
                  onChange={enteredPhoneNumberChangeHandler}
                />
              </div>

              <div className={classes.action}>
                <Button className={classes.btn}>Register</Button>
              </div>

              <div>
                <p className={classes.login}>
                  <Link to={"/login"}>Login with existing account</Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Register;
