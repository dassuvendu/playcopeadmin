import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/api";

export const fetchUsersList = createAsyncThunk(
  "fetchUsersList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users-list");
      const result = await response.data;
      // console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "updateUserStatus",
  async ({ user_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/admin/manageuser", {
        user_id: user_id,
      });
      if (response?.data?.status_code === 200) {
        const result = await response.data;
        dispatch(fetchUsersList());
        return result;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// slicer
const usersList = createSlice({
  name: "usersList",
  initialState: {
    loading: false,
    error: false,
    message: null,
    users: [],
    isActive: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload.data;
      })
      .addCase(fetchUsersList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updateUserStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : "Something went wrong. Try again later.";
      });
  },
});

export default usersList.reducer;
