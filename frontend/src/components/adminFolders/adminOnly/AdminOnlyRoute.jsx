import Button from "../../ui/button/Button";
import classes from "./Disclaimer.module.css";
import { useSelector } from "react-redux";

export const AdminOnlyRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  if (user?.role === "admin") {
    return props.children;
  } else {
    return (
      <div className={classes.disclaimer}>
        <p>You have no Accsess to this Route.</p>
        <div className={classes.action}>
          <Button>Click here to Go Home</Button>
        </div>
      </div>
    );
  }
};

export const AdminOnlyLink = (props)=>{
  const {user} = useSelector((state)=>state.auth);

  if(user?.role === "admin"){
    return props.children
  }else{
    return null;
  }
};
