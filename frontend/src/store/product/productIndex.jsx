import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialProductState = {
  product: null,
  products: [],
  minPrice: null,
  maxPrice: null,
  message: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
  isLoggedIn: false,
};

//createProduct=================================================================
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, thunkApi) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//getProducts=================================================================
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkApi) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//deleteProduct==================================================================
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkApi) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//getSingleProduct================================================================
export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (id, thunkApi) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//updateProduct==================================================================
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, thunkApi) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    RESET_PRODUCT_STATE(state) {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      //createProduct==========================================================
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      //getProducts==========================================================
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        console.log(action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      //deleteProduct=============================================================
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.msg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload.msg);
      })
      //getSingleProduct============================================================
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        console.log(action.payload);
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.product = null;
        state.isError = true;
        console.log(action.payload);
      })
      //updateProduct==========================================================
      .addCase(updateProduct.pending,(state)=>{
        state.updateProduct = true
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.message = action.payload.msg
        console.log(action.payload)
      })
      .addCase(updateProduct.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload)
      })
  },
});

export default productSlice;
export const productSliceActions = productSlice.actions;
