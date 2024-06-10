/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../store/api";
import errorHandler from "../store/errorHandler";

export const login = createAsyncThunk(
  "login",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        let errors = errorHandler(response);
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "reset-password",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/forget-password", userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        let errors = errorHandler(response);
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      if (error.response && error.response.status === 422) {
        return rejectWithValue({ network: 422, message: error.response?.data?.message || "Something Went Wrong" });
      }
      return rejectWithValue({ network: error.response?.status || 500, message: 'Something went wrong.' });
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);
// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

// initialize the state
const initialState = {
  message: null,
  error: null,
  loading: false,
  isLoggedIn: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAfterLoggedIn: (state) => {
      state = { ...initialState, isLoggedIn: true };
    },
    logout: (state) => {
      state.message = null,
      state.error = null,
      state.loading = false,
      state.isLoggedIn = false,
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoggedIn = false;
        state.message = "Loading..";
        state.error = false;
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        const { access_token } = payload;
        state.isLoggedIn = true;
        state.message = "Successfully Logged in";
        localStorage.setItem(
          "userToken",
          JSON.stringify({ "token": access_token })
        );
        state.error = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      })

      .addCase(forgetPassword.pending, (state) => {
        state.isLoggedIn = false;
        state.message = "Loading..";
        state.error = false;
      })

      .addCase(forgetPassword.fulfilled, (state, { payload }) => {
        const { access_token,message } = payload;
        state.isLoggedIn = true;
        state.message = message;
        state.error = false;
      })
      .addCase(forgetPassword.rejected, (state, { network ,payload }) => {
        state.isLoggedIn = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      });
  },
});
export const { resetAfterLoggedIn, logout,clearMessages } =
  authSlice.actions;

export default authSlice.reducer;
