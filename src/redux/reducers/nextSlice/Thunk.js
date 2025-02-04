import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const verifyOtp = createAsyncThunk(
  "companies/verifyOtp",
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
