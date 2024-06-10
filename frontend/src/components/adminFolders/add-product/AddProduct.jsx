import { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import classes from "./AddProduct.module.css";
import Button from "../../ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  productSliceActions,
} from "../../../store/product/productIndex";
import { getCategories } from "../../../store/category/categoryIndex";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  image: "",
  description: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [publicID,setPublicID] = useState("");

  const [cloudinaryLoading, setCloudinaryLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, isLoading } = useSelector((state) => state.product);
  console.log(message);
  const { categories } = useSelector((state) => state.category);
  console.log(categories);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveToCloudinary = async (e) => {
    e.preventDefault();

    try {
      if (
        productImage !== null &&
        (productImage.type === "image/jpeg" ||
          productImage.type === "image/jpg" ||
          productImage.type === "image/png")
      ) {
        let image = new FormData();
        image.append("image", productImage);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/API/V1/products/upLoadProductImage`,
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
            //imageUrl = imageData.msg.src;
            setImageURL(imageData.msg.src);
            setPublicID(imageData.msg.publicID)
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

  const saveProductToMongo = async (e) => {
    e.preventDefault();

    if (imageURL === "") {
      console.log("Please upload an image");
      return;
    }

    const formData = {
      name: product.name,
      category: product.category,
      quantity: Number(product.quantity),
      price: Number(product.price),
      image: imageURL,
      publicID:publicID,
      description: product.description,
    };
    console.log(formData);
    await dispatch(createProduct(formData));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(()=>{
    if(message==="product created successfully."){
      navigate("/admin/view-products")
    };
    dispatch(productSliceActions.RESET_PRODUCT_STATE())
  },[message]);

  return (
    <div className={classes["add-productContainer"]}>
      <h2>Add Product</h2>

{/*==========================Upload Image Area==================================*/}
      <Card className={classes.cardClass1}>
        <form action="">
          <div className={classes.control}>
            <label htmlFor="">Product image</label>
            {imagePreview === null ? (
              <input
                type="file"
                accept="image/*"
                placeholder="productImage"
                name="image"
                onChange={handleImageChange}
              />
            ) : (
              <>
                <img src={imagePreview} alt="product image" width={100} />
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
                    : `${uploadProgress}% completed`}
                </div>
              </div>
            )}

            {product.image === "" ? null : (
              <input
                type="text"
                placeholder="imageURL"
                disabled
                name=""
                value={product.image}
              />
            )}
          </div>
        </form>
      </Card>

      <Card className={classes.cardClass2}>
        <form onSubmit={saveProductToMongo}>
{/*==========================Product name Area==================================*/}
          <div className={classes.control}>
            <label htmlFor="">Product name:</label>
            <input
              type="text"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
{/*========================Category Area=================================*/}
          <Card className={classes.cardClass}>
            <div className={`${classes.control} ${classes.cat}`}>
              <label htmlFor="">Product category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                required>
                <option disabled value="">
                  Select a category
                </option>
                {categories.map((cat, index) => {
                  return (
                    <option key={index} value={cat.name}>
                      {cat.name}
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
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
              />
            </div>
{/*========================Product Price Area====================================*/}
            <div className={classes.control}>
              <label htmlFor="">Product price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
{/*========================Product Desc Area==================================*/}
            <div className={classes.control}>
              <label htmlFor="">Product description</label>
              <textarea
                name="description"
                value={product.description}
                cols="10"
                rows="7"
                onChange={handleInputChange}></textarea>
            </div>
{/*========================Submit Button Area==================================*/}
            <div className={classes.action}>
              <Button className={classes.btn}>Submit</Button>
            </div>
          </Card>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
