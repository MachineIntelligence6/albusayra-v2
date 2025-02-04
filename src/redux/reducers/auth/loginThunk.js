import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

// Async Thunks for Auth
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.loginUser}`,
        credentials,
        Api.config()
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      console.log("errorMessage", errorMessage);
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Login failed"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.verifyOtp}`,
        params,
        Api.config()
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Verification failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Verification failed"
      );
    }
  }
);

export const sendOtpAgainRequest = createAsyncThunk(
  "auth/sendOtpAgainRequest",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.sendOtpAgainRequest}`,
        params,
        Api.config()
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Verification failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Verification failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.forgotPassword}`,
        params,
        Api.multiPartConfig()
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Email Sending failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Email Sending failed"
      );
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.setNewPassword}`,
        params,
        Api.multiPartConfig()
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Email Sending failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Email Sending failed"
      );
    }
  }
);

export const getCampaignStatusById = createAsyncThunk(
  "campaign/getCampaignStatusById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCampaignStatusById}?id=${id}`,
        Api.config()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);
