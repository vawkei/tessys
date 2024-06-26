import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";

import authService from "./authService";
import categorySlice from "../category/categoryIndex";
import productSlice from "../product/productIndex";

const initialAuthState = {
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  user: null,
  users: [],
};

//register:
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//verifyEmail:
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ verificationToken, email }, thunkApi) => {
    try {
      return await authService.verifyEmail(verificationToken, email);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//login:
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//logout:
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.msg ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

//getLoginStatus:
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkApi) => {
    try {
      return await authService.getLoginStatus();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//getUser:
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkApi) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.msg ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

//updateUserPhoto:
export const updateUserPhoto = createAsyncThunk(
  "auth/updateUserPhoto",
  async (userData, thunkApi) => {
    try {
      return await authService.updateUserPhoto(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//updateUser:
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkApi) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//getAllUsers:
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, thunkApi) => {
    try {
      return await authService.getAllUsers();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    RESET_AUTH(state) {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      //1:register====================================================================:
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isLoggedIn = true;
        state.user = action.payload;
        state.message = action.payload.msg;
        console.log(action.payload.msg);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        console.log(action.payload);
      })
      //3 verifyEmail===================================================================:
      .addCase(verifyEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      //4 login==========================================================================:
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.message = action.payload.msg;
        state.isError = false;
        state.user = action.payload.user;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.user = null;
      })
      //5 logout========================================================================:
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      //6 getLoginStatus================================================================:
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        console.log(action.payload);
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      //7 getUser=====================================================================:
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message ="ok"
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        console.log(action.payload);
      })
      //8 updateUserPhoto==============================================================:
      .addCase(updateUserPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.msg);
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      //9 updateUser====================================================================:
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.updatedUser;
        console.log(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        console.log(action.payload);
      })
      //10 getAllUsers==================================================================
      .addCase(getAllUsers.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.users = action.payload.allUsers;
        console.log(action.payload)
      })
      .addCase(getAllUsers.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.users = null;
        console.log(action.payload)
      })
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category:categorySlice.reducer,
    product:productSlice.reducer
  },
});

export const authSliceActions = authSlice.actions;
export default store;
