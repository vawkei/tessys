import classes from "./ProfileHeader.module.css";
import { NavLink } from "react-router-dom";

const ProfileHeader = () => {
  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  return (
    <div className={classes["profile-header"]}>
      <ul>
        <li>
          <NavLink to={"/profile"} className={navDataHandler}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to={"/profile/edit-profile"} className={navDataHandler}>
            Edit Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileHeader;
