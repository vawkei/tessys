import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/products/`;

const createProduct = async (formData) => {
  const response = await axios.post(API_URL + "createProduct", formData);
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(API_URL + "getProducts");
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const getSingleProduct = async (id) => {
  const response = await axios.get(API_URL + "getSingleProduct/" + id, id);
  return response.data;
};
//deleteProductReview:
// const deleteProductReview = async(id)=>{
//   const response = await axios.patch(API_URL + "deleteProductReview/" + id, id);
//   return response.data
// };

const updateProduct = async (id, formData) => {
  const response = await axios.patch(API_URL + "updateProduct/" + id, formData);
  return response.data;
};


const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct
};

export default productService;
