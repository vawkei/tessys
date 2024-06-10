import AddProduct from "../add-product/AddProduct";
import EditProduct from "../add-product/EditProduct";
import AllUsers from "../all-users/AllUsers";
import Category from "../category/Category";
import Coupon from "../coupon/Coupon";
import Home from "../home/Home";
import NavBar from "../nav-bar/NavBar";
import Newsletter from "../newsletter/Newsletter";
import Orders from "../orders/Orders";
import Refund from "../refund/Refund";
import ViewProducts from "../view-products/ViewProducts";
import classes from "./AdminRoutes.module.css";
import { Routes,Route } from "react-router-dom";

const AdminRoutes = () => {
    return ( 
        <div className={classes.admin}>
            <div className={classes["nav-bar"]}>
                <NavBar />
            </div>

            <div className={classes.content}>
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="all-users" element={<AllUsers />} />
                    <Route path="view-products" element={<ViewProducts />} />
                    <Route path="edit-product/:id" element={<EditProduct />} />
                    <Route path="add-product" element={<AddProduct/>} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="coupon" element={<Coupon />} />
                    <Route path="category" element={<Category />} />
                    <Route path="refund" element={<Refund />} />
                    <Route path="newsletter" element={<Newsletter />} />
                </Routes>
            </div>
        </div>
     );
}
 
export default AdminRoutes;