import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/categories/`;

const createCategory = async (formData) => {
  const response = await axios.post(API_URL + "createCategory", formData);
  return response.data;
};

const getCategories = async () => {
  const response = await axios.get(API_URL + "getCategories");
  return response.data;
};

const deleteCategory = async (slug) =>{
    const response = await axios.delete(API_URL + slug);
    return response.data
}

const categoryService = { createCategory, getCategories, deleteCategory };
export default categoryService;






// const deleteCategory = async (slugData) => {
//   const response = await axios.delete(API_URL + "deleteCategory", {
//     data: slugData, // Use `data` to send the body in a DELETE request
//   });
//   console.log(response);
//   return response.data;

// //   Why axios.delete Needs a Configuration Object
// // axios.delete follows the convention where the primary purpose of the DELETE method is to identify the resource to delete via the URL. Since sending a body with DELETE requests is less common and not universally supported by all servers or HTTP standards, axios requires a configuration object to include the data.
// };