import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  getCampaignStatusById,
  loginUser,
  setNewPassword,
  verifyOtp,
} from "./loginThunk";
import { jwtDecode } from "jwt-decode";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    token: null,
    loading: false,
    loginSuccess: false,
    otpSuccess: false,
    resetSuccess: false,
    error: null,
    campaignDataById: [],
  },
  reducers: {
    updateSuccess: (state) => {
      state.loginSuccess = false;
      state.otpSuccess = false;
      state.resetSuccess = false;
    },
    updateSuccessCampaign: (state) => {
      state.campaignDataById = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginSuccess = true;

        const accessToken = action?.payload?.result?.accessToken;
        const decodedToken = jwtDecode(accessToken);
        typeof localStorage !== "undefined" &&
          localStorage.setItem(
            "userType",
            action?.payload?.model?.userType?.userType
          );
        state.user = decodedToken;
        state.token = accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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
      })

      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // setNewPassword
      .addCase(setNewPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCampaignStatusById
      .addCase(getCampaignStatusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignStatusById.fulfilled, (state, action) => {
        state.loading = false;
        state.campaignDataById = action.payload;
        state.success = true;
      })
      .addCase(getCampaignStatusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess, updateSuccessCampaign } = authSlice.actions;
export default authSlice.reducer;
