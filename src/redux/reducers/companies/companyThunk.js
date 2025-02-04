import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.createCompany}`,
        data,
        Api.multiPartConfig()
      );
      return response.data?.result;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Create Company failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Create Company failed"
      );
    }
  }
);

export const getCompanyByStatus = createAsyncThunk(
  "companies/getCompanyByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCompanyByStatus}?page=${data?.page}&pageLength=${data?.pageLength}&statuses=1&statuses=2`,
        Api.config()
      );
      return response.data?.result;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Get Company Data failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Get Company Data failed"
      );
    }
  }
);

export const getCompanyById = createAsyncThunk(
  "companies/getCompanyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCompanyById}?id=${id}`,
        Api.config()
      );
      return response.data?.result;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Get Company Data failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Get Company Data failed"
      );
    }
  }
);

export const getEditDetails = createAsyncThunk(
  "companies/getEditDetails",
  async (details) => {
    return details;
  }
);

export const deleteCompanyById = createAsyncThunk(
  "companies/deleteCompanyById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.deleteCompanyById}`,
        data,
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

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.updateCompany}`,
        data,
        Api.multiPartConfig()
      );
      return response.data?.result;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Create Company failed";
      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || error.message || "Create Company failed"
      );
    }
  }
);

export const updateCompanyStatusOnly = createAsyncThunk(
  "companies/updateCompanyStatusOnly",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.updateCompanyStatusOnly}`,
        data,
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
