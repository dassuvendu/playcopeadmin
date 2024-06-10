import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import errorHandler from '../store/errorHandler';
import api from '../store/api';

// Add Coupon | Mehtod: POST
export const addCoupon = createAsyncThunk(
    'coupon/addCoupon',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('admin/add-coupon', userInput);
            if (response?.data?.status_code === 200) {
                return response.data.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
);

// Get Coupon List | Mehtod: GET
export const getCouponList = createAsyncThunk(
    'coupon/Coupon-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('admin/coupon-list');
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

// Update Status | Mehtod: POST
export const updateStatus = createAsyncThunk(
    'coupon/updateStatus',
    async ({ coupon_id }, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.post('admin/change-coupon-status', { coupon_id: coupon_id, });
            if (response?.data?.status_code === 200) {
                dispatch(getCouponList());
                return response.data.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
);

// Delete Coupons | Method: POST
export const deleteCoupon = createAsyncThunk(
    'coupon/delete-coupon',
    async (coupon_id, { rejectWithValue, dispatch }) => {
        try {
            console.log("coupon_id", coupon_id)
            const response = await api.post('admin/delete-coupon', {
                coupon_id: coupon_id,
            });
            if (response?.data?.status_code === 200) {
                dispatch(getCouponList());
                return response.data.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
);

const initialState = {
    message: null,
    error: null,
    isLoading: false,
    addCoupon: [],
    coupons: [],
};

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCoupon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCoupon.fulfilled, (state, { payload }) => {
                state.addCoupon = payload;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(addCoupon.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })

            .addCase(getCouponList.pending, (state) => {
                state.isLoading = true;
                state.message = null;
                state.error = null;
            })
            .addCase(getCouponList.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.coupons = payload.results;
            })
            .addCase(getCouponList.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = false;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })

            .addCase(updateStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateStatus.fulfilled, (state) => {
                state.isLoading = false;
                state.error = false;
            })
            .addCase(updateStatus.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })

            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCoupon.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = false;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })
            .addCase(deleteCoupon.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })

    }
})

export default couponSlice.reducer;