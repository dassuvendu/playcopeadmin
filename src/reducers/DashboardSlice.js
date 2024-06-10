import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../store/api";
import errorHandler from "../store/errorHandler";
// subscriber action

export const fetchTotalSubscriber = createAsyncThunk(
  "fetchTotalSubscriber",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users-subscription-count");
      const result = await response.data;
      return result;
    } catch (error) {
      // let errors = errorHandler(error);
      return rejectWithValue(errors);
    }
  }
);
const totalSubscriber = createSlice({
  name: "totalSubscriber",
  initialState: {
    subscriberCount: null,
    userCount: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchTotalSubscriber.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTotalSubscriber.fulfilled, (state, { payload }) => {
        state.subscriberCount = payload.subscription_count;
        state.userCount = payload.user_count;
        state.loading = false;
      })

      .addCase(fetchTotalSubscriber.rejected, (state, { payload }) => {
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      });
  },
});

// Export actions and reducer
export default totalSubscriber.reducer;
