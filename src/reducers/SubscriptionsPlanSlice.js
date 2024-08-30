import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/api";

//subscriber plans action
export const fetchSubscriptionPlans = createAsyncThunk(
  "fetchSubscriptionPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/all-plans");
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// slicer
const subscriptionPlans = createSlice({
  name: "subscriptionPlans",
  initialState: {
    loading: false,
    error: false,
    message: null,
    monthlyPlan: null,
    plans: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.plans = payload?.data;
        state.monthlyPlan = payload?.data[0]?.price;
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      });
  },
});

// Export actions and reducer
export default subscriptionPlans.reducer;

