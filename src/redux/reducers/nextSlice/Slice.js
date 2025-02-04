import { createSlice } from "@reduxjs/toolkit";
import { verifyOtp } from "./Thunk";

export const companySlice = createSlice({
  name: "companySlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateSuccess: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSuccess = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = companySlice.actions;
export default companySlice.reducer;
