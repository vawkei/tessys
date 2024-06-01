import ProfileHeader from "./ProfileHeader";
import { getUser } from "../../store/auth/authIndex";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";


const ProfileHome = () => {
    
    const {user,isLoggedIn} = useSelector((state)=>state.auth);
    console.log(user) 
    console.log(isLoggedIn) 

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUser())
    },[dispatch,getUser]);

    return ( 
        <div>
            <ProfileHeader />
            
        </div>
     );
}
 
export default ProfileHome;