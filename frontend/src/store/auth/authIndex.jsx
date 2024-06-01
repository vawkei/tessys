import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";

import authService from "./authService";

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
      //verifyEmail===================================================================:
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
      //login:
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
      //logout:
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
      //getLoginStatus:
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
      //getUser:
      .addCase(getUser.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        console.log(action.payload)
      })
      .addCase(getUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        console.log(action.payload)
      })
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const authSliceActions = authSlice.actions;
export default store;
