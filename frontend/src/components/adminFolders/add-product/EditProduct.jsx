import { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import classes from "./AddProduct.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/category/categoryIndex";
import {
  getSingleProduct,
  productSliceActions,
  updateProduct,
} from "../../../store/product/productIndex";
import Button from "../../ui/button/Button";
import Loader from "../../ui/loader/Loader";

const EditProduct = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productEdit = useSelector((state) => state.product.product);
  console.log(productEdit);

  const { isLoading, message } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  console.log(categories);

  const [product, setProduct] = useState({ ...productEdit });

  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cloudinaryLoading, setCloudinaryLoading] = useState(false);


  //handle inputChanges====================================================>
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  //useEffect to get a single product by its id and all categories========>
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  //function to save to cloudinary============================================>
  const saveToCloudinary = async (e) => {
    e.preventDefault();

    setCloudinaryLoading(true);

    try {
      if (
        productImage !== "" &&
        (productImage.type == "image/jpeg" ||
          productImage.type === "image/jpg" ||
          productImage.type === "image/png")
      ) {
        let image = new FormData();
        image.append("image", productImage);
        image.append("oldImagePublicId",product?.publicID)

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/updateProductImage`,
          {
            method: "POST",
            body: image,
            headers: { "X-Request-With": "XMLHttpRequest" },
          }
        );
        if (response.ok) {
          const clone = response.clone();
          const contentLength = +response.headers.get("Content-Length");
          let receivedLength = 0;

          const reader = clone.body.getReader();

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            receivedLength += value.length;
            const progress = (receivedLength / contentLength) * 100;
            setUploadProgress(progress);

            const imageData = await response.json();
            console.log(imageData);

            //setImageURL(imageData.msg.src);
            setProduct({
              ...product,
              image: imageData.msg.src,
              publicID: imageData.msg.publicID,
            });

            console.log("Upload to cloudinary completed", imageURL);
            setImagePreview(null);
            setCloudinaryLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

//function to save to mongoDB===========================================>
  const editProductToMongo = async (e) => {
    e.preventDefault();

    const formData = {
      name: product.name,
      category: product.category,
      quantity: Number(product.quantity),
      price: Number(product.price),
      image: product.image,
      publicID:product.publicID,
      description: product.description,
    };
    console.log(formData);
    await dispatch(updateProduct({ id, formData }));
    setImagePreview(null);
  };

  //useEffect to navigate to view-products page===========================>
  useEffect(() => {
    if (message === "product updated successfully") {
      navigate("/admin/view-products");
      dispatch(productSliceActions.RESET_PRODUCT_STATE());
    }
  }, [navigate, dispatch, message]);

  //useEffect to render the page if theres change in productEdit==============>
  useEffect(() => {
    setProduct(productEdit);
  }, [productEdit]);

  return (
    <div className={classes["add-productContainer"]}>
      {isLoading && <Loader />}
      <h2>Update Product</h2>
      {/*==========================Upload Image Area==================================*/}
      <Card>
        <form action="">
          <div className={classes.control}>
            <label>Product image</label>
            {imagePreview === null ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  placeholder="productImage"
                  name="image"
                  onChange={handleImageChange}
                />
                <img src={product?.image} width={100} />
              </>
            ) : (
              <>
                <img src={imagePreview} alt="Product image" width={100} />
                <Button className={classes.btn} onClick={saveToCloudinary}>
                  saveToCloudinary
                </Button>
                {cloudinaryLoading && <p>Sending to cloudinary...</p>}
              </>
            )}

            {uploadProgress === 0 ? null : (
              <div className={classes.progress}>
                <div
                  className={classes["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}>
                  {uploadProgress < 100
                    ? `uploading ${uploadProgress}%`
                    : `Lisa Lipps ${uploadProgress}%`}
                </div>
              </div>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <form onSubmit={editProductToMongo}>
          {/*====================Product name Area=============================*/}
          <div className={classes.control}>
            <label htmlFor="">Product name</label>
            <input
              type="text"
              required
              value={product?.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          {/*========================Category Area=================================*/}

          <div className={classes.control}>
            <label htmlFor="">Product category</label>
            <select
              name="category"
              value={product?.category}
              onChange={handleInputChange}
              required>
              <option disabled>Select a category</option>
              {categories.length > 0 &&
                categories?.map((cat) => {
                  return (
                    <option key={cat._id} value={cat?.name}>
                      {cat?.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/*========================Product Qty Area==================================*/}

          <div className={classes.control}>
            <label htmlFor="">Product quantity</label>
            <input
              type="number"
              required
              name="quantity"
              value={product?.quantity}
              onChange={handleInputChange}
            />
          </div>

          {/*========================Product Price Area====================================*/}
          <div className={classes.control}>
            <label htmlFor="">Product price</label>
            <input
              type="number"
              required
              name="price"
              value={product?.price}
              onChange={handleInputChange}
            />
          </div>
          {/*====================Product Desc Area=============================*/}
          <div className={classes.control}>
            <label htmlFor="">Product description</label>
            <textarea
              value={product?.description}
              onChange={handleInputChange}
              required
              cols={"10"}
              rows={"7"}></textarea>
          </div>
          {/*========================Submit Button Area==================================*/}
          <div className={classes.action}>
            <Button className={classes.btn}>Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProduct;
