import classes from "./MainNavigation.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions, logout } from "../../store/auth/authIndex";
import DrawerToggleButton from "../ui/drawerToggleButton/DrawerToggleButton";
import { AdminOnlyLink } from "../adminFolders/adminOnly/AdminOnlyRoute";

const MainNavigation = () => {
  //states, dispatch, useSelector, functions, declarations, navigate, useMediaQ.:
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  console.log(isLoggedIn);

  const toggleMenuHandler = () => {
    setShowMenu((currentState) => !currentState);
  };

  const [displayName, setDisplayName] = useState("");

  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  const logOutHandler = async () => {
    await dispatch(logout());
    dispatch(authSliceActions.RESET_AUTH());
    navigate("/login");
  };

  // vawkeicodewebz@gmail.com

  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      setDisplayName(user.name || "");
    }
  }, [isLoggedIn, user]);

  const logo = (
    <div className={classes.logo}>
      <h1>
        <NavLink to={"/"}>
          Tessy<span>'s</span>
        </NavLink>
      </h1>
    </div>
  );
  const cart = (
    <span>
      <NavLink to={"/cart"} className={classes.cart}>
        <div>
          <p>Cart</p>
          <FaShoppingCart size={20} />
          <p>0</p>
        </div>
      </NavLink>
    </span>
  );

  return (
    <header>
      <div className={classes.header}>
        {logo}

        <nav
          className={
            showMenu
              ? `${classes["show-navigation"]}`
              : `${classes["hide-navigation"]}`
          }>
          <div
            className={
              showMenu
                ? `${classes["nav-backdrop"]} ${classes["show-nav-backdrop"]}`
                : `${classes["nav-backdrop"]}`
            }></div>

          <ul onClick={toggleMenuHandler}>
            <AdminOnlyLink>
              <NavLink className={navDataHandler} to={"/admin/home"}>
                <li style={{color:"green"}}>Admin</li>
              </NavLink>
            </AdminOnlyLink>

            <NavLink className={navDataHandler} to={"/shop"}>
              <li>Shop</li>
            </NavLink>

            {!isLoggedIn && (
              <NavLink className={navDataHandler} to={"/logIn"}>
                <li>Login</li>
              </NavLink>
            )}

            <NavLink className={navDataHandler} to={"/profile"}>
              <li>{`Hello ${displayName}`}</li>
            </NavLink>

            {!isLoggedIn && (
              <NavLink className={navDataHandler} to={"/register"}>
                <li>Register</li>
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink className={navDataHandler} to={"/contact"}>
                <li>Send a Mail</li>
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink className={navDataHandler} to={"/order-history"}>
                My Orders
              </NavLink>
            )}

            {isLoggedIn && (
              <Link to={"/"} onClick={logOutHandler}>
                Logout
              </Link>
            )}
            <span className={classes["span-cart"]}>{cart}</span>
          </ul>
        </nav>

        <div className={classes["mobile-icon"]}>
          {showMenu ? (
            <FaTimes size={22} color="white" onClick={hideMenuHandler} />
          ) : (
            <div className={classes["conditional-cart"]}>
              <span>{cart}</span>
              <span>
                <DrawerToggleButton toggle={toggleMenuHandler} />
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
