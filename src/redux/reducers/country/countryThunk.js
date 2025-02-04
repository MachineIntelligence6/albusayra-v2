import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const CountriesCreate = createAsyncThunk(
  "country/CountriesCreate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.CountriesCreate}`,
        data,
        Api.multiPartConfig()
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
export const CountriesUpdate = createAsyncThunk(
  "country/CountriesUpdate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.CountriesUpdate}`,
        data,
        Api.multiPartConfig()
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
export const CountriesDelete = createAsyncThunk(
  "country/CountriesDelete",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.CountriesDelete}`,
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
export const CountriesGetByStatuses = createAsyncThunk(
  "country/CountriesGetByStatuses",
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
    SubParentId,
    SubParentId1,
    SubParentId2,
  }) => {
    let response;
    try {
      let url = `${Api.API_URL}${Api.endpoints.CountriesGetByStatuses}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;
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
export const CountriesGetById = createAsyncThunk(
  "country/CountriesGetById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.CountriesGetById}?id=${id}`,
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
