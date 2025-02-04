import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const VendorContractCreate = createAsyncThunk(
  "vendorContract/VendorContractCreate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.VendorContractCreate}`,
        data,
        Api.config()
      );

      if (res.status === 200 && res.data?.code === 200) {
        // toast.success(res.data?.message);
        return res.data; // Return the response data if successful
      } else {
        toast.error(res.data?.message || "An error occurred.");
        return rejectWithValue(res.data?.message); // Reject with a message
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue(message); // Reject with error message
    }
  }
);
export const VendorContractUpdate = createAsyncThunk(
  "vendorContract/VendorContractUpdate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.VendorContractUpdate}`,
        data,
        Api.config()
      );

      if (res.status === 200 && res.data?.code === 200) {
        // toast.success(res.data?.message);
        return res.data; // Return the response data if successful
      } else {
        toast.error(res.data?.message || "An error occurred.");
        return rejectWithValue(res.data?.message); // Reject with a message
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue(message); // Reject with error message
    }
  }
);
export const VendorContractDelete = createAsyncThunk(
  "vendorContract/VendorContractDelete",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.VendorContractDelete}`,
        data,
        Api.config()
      );

      if (res.status === 200 && res.data?.code === 200) {
        // toast.success(res.data?.message);
        return res.data; // Return the response data if successful
      } else {
        toast.error(res.data?.message || "An error occurred.");
        return rejectWithValue(res.data?.message); // Reject with a message
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue(message); // Reject with error message
    }
  }
);
export const VendorContractGetByStatus = createAsyncThunk(
  "vendorContract/VendorContractGetByStatus",
  async ({
    page,
    pageLength,
    filter,
    filter2,
    filter3,
    desc,
    orderBy,
    statuses,
    parentId,
  }) => {
    let response;
    try {
      let url = `${Api.API_URL}${Api.endpoints.VendorContractGetByStatus}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}`;
      if (statuses && Array.isArray(statuses)) {
        statuses.forEach((status) => {
          url += `&statuses=${status}`;
        });
      }
      const res = await axios.get(url, Api.config());
      if (res.status === 200) {
        response = res.data?.result;
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
    return response;
  }
);
export const VendorContractGetById = createAsyncThunk(
  "vendorContract/VendorContractGetById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.VendorContractGetById}?id=${id}`,
        Api.config()
      );

      if (res.status === 200) {
        return res.data?.result;
      } else {
        return rejectWithValue("Error fetching area.");
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
