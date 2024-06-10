import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialCatState = {
  category: null,
  categories: [],
  message: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
  isLoggedIn: false,
};

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, thunkApi) => {
    try {
      return await categoryService.createCategory(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg).error
          .msg || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkApi) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
        return thunkApi.rejectWithValue(message)
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (slug, thunkApi) => {
    try {
      return await categoryService.deleteCategory(slug);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initialCatState,
  reducers: {},
  extraReducers(builder) {
    builder
      //1 createCategories==============================================================
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      //2 getCategories==============================================================
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.categories = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        state.categories = [];
      })
      //3 deleteCategory========================================================
      .addCase(deleteCategory.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled,(state,action)=>{
        state.isLoading = false;
        console.log(action.payload)
      })
      .addCase(deleteCategory.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload)
      })
  },
});

export default categorySlice;
export const categoryActions = categorySlice.actions;
