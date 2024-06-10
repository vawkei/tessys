import classes from "./ProfileHome.module.css";
import ProfileHeader from "./ProfileHeader";
import { getUser } from "../../store/auth/authIndex";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "../ui/card/Card";
import Spinner from "../ui/spinner/Spinner";


const ProfileHome = () => {
    
    const {user,isLoggedIn,isLoading} = useSelector((state)=>state.auth);
    console.log(user) 
    console.log(isLoggedIn) 

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUser())
    },[dispatch,getUser]);

    return ( 
        <div className={classes.container}>
            {isLoading && <Spinner />}
            <ProfileHeader />
            <h2>{user?.name} {user?.surname}</h2>

            <Card className={classes.cardClass}>
                <div className={classes["main-image"]}>
                    <img src={user?.photo} alt="profile-image"/>
                </div>

                <div className={classes.content}>
                    <h4>{user?.name} {user?.surname}</h4>

                    <p className={classes.email}>{user?.email}</p>
                    <p>{user?.phone}</p>
                    <p>{user?.address}</p>
                    <p>{user?.town}</p>
                    <p>{user?.state}</p>
                    <p>Total Amount Spent:</p>
                    <p>Points:</p>
                    <p>Time of Last Order:</p>
                </div>
            </Card>
        </div>
     );
}
 
export default ProfileHome;