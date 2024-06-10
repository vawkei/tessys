import { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import classes from "./ViewProducts.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../store/product/productIndex";
import { getProducts } from "../../../store/product/productIndex";
import Loader from "../../ui/loader/Loader";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import DeleteNotifier from "../../ui/deleteNotifier/DeleteNotifier";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  console.log(products);

  var nairaSymbol = "\u20A6";

  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);
  const [currentProductToDelete, setCurrentProductToDelete] = useState(null);

  const showDeleteNotifierTrue = (id, name) => {
    setCurrentProductToDelete({ id, name });
    setShowDeleteNotifier(true);
  };
  const showDeleteNotifierFalse = () => {
    setShowDeleteNotifier(null);
  };

  const deleteProductHandler = async (id) => {
    await dispatch(deleteProduct(id));
    setShowDeleteNotifier(false);
    await dispatch(getProducts());
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className={classes["allProduct-container"]}>
      {isLoading && <Loader />}
      <h2>View Products</h2>
      <div className={classes.intro}>
        <div className={classes.search}>{/* <h4>Search</h4> */}</div>
      </div>
      <>
        <div>
          <Card className={classes.cardClass}>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => {
                  return (
                    <tr key={product?._id}>
                      <td>{index + 1}</td>
                      <td className={classes.namePart}>
                        {shortenText(product?.name, 10)}
                        <div className={classes["main-image"]}>
                          <img
                            src={product?.image}
                            alt="product image"
                            width={"100"}
                          />
                        </div>
                      </td>
                      <td>{product?.category}</td>
                      <td>
                        {" "}
                        {nairaSymbol} {product?.price}
                      </td>
                      <td>{product?.quantity}</td>
                      <td>
                        {nairaSymbol}{" "}
                        {(product?.price * product?.quantity).toFixed(2)}
                      </td>
                      <td>
                        <div className={classes.icons}>
                          <div>
                            <Link to={`/admin/edit-product/${product?._id}`}>
                              <AiFillEdit color="green" />
                            </Link>
                          </div>
                          {/* &nbsp; */}
                          <div>
                            <RiDeleteBin2Line
                              color="red"
                              onClick={() =>
                                showDeleteNotifierTrue(
                                  product?._id,
                                  product?.name
                                )
                              }
                            />
                          </div>
                        </div>
                      </td>
                      {showDeleteNotifier && (
                        <DeleteNotifier
                          heading={"Delete Product"}
                          body={`You are about to DELETE ${currentProductToDelete.name}`}
                          onConfirm={() =>
                            deleteProductHandler(currentProductToDelete.id)
                          }
                          cancel={showDeleteNotifierFalse}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </>
    </div>
  );
};

export default ViewProducts;
