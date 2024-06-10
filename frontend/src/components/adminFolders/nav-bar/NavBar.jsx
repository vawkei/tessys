import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { useSelector } from "react-redux";
import { BiCategory } from "react-icons/bi";
import { BiSolidCoupon } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { RiRefund2Line } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);

  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  return (
    <div className={classes["nav-container"]}>
      <div className={classes.user}>
        <h3>Hello {user?.name}</h3>
      </div>

      <nav className={classes.nav}>
        <ul>
          <NavLink className={navDataHandler} to={"/admin/home"}>
            <li>
              <FaHome size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/all-users"}>
            <li>
              <FaRegUser size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/view-products"}>
            <li>
              <GrOverview size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/add-product"}>
            <li>
              <IoIosAdd size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/orders"}>
            <li>
              <TbFileInvoice size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/coupon"}>
            <li>
              <RiCoupon2Line size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/category"}>
            <li>
              <BiCategory size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/refund"}>
            <li>
              <RiRefund2Line size={40} />
            </li>
          </NavLink>
          <NavLink className={navDataHandler} to={"/admin/newsletter"}>
            <li>
              <MdAlternateEmail size={40} />
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
