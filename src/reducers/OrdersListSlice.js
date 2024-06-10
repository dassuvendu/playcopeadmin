import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/api";

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

const ordersList = createSlice({
  name: "ordersList",
  initialState: {
    loading: false,
    error: false,
    message: null,
    orders: 0,
  },
  reducers: {},
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
      });
  },
});


export default ordersList.reducer;