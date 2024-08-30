import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/api";
import errorHandler from "../store/errorHandler";

export const fetchOrdersList = createAsyncThunk(
  "fetchOrdersList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders");
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePlanDate = createAsyncThunk(
  "updatePlanDate",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/update-subscription-date", userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

const ordersList = createSlice({
  name: "ordersList",
  initialState: {
    loading: false,
    error: false,
    message: null,
    orders: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload.orders;
      })
      .addCase(fetchOrdersList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      })

      .addCase(updatePlanDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlanDate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(updatePlanDate.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      });
  },
});

export const { clearMessage } = ordersList.actions;

export default ordersList.reducer;