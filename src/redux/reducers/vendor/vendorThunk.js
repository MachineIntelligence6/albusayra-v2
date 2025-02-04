import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const VendorCreate = createAsyncThunk(
  "vendor/VendorCreate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.VendorCreate}`,
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
export const VendorUpdate = createAsyncThunk(
  "vendor/VendorUpdate",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.VendorUpdate}`,
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
export const VendorDelete = createAsyncThunk(
  "vendor/VendorDelete",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.VendorDelete}`,
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

// export const VendorGetByStatus = createAsyncThunk(
//   "vendor/VendorGetByStatus",
//   async ({
//     page,
//     pageLength,
//     filter,
//     filter2,
//     filter3,
//     desc,
//     orderBy,
//     statuses,
//     parentId,
//     SubParentId,
//     SubParentId1,
//     SubParentId2,
//   }) => {
//     let response;
//     try {
//       let url = `${Api.API_URL}${Api.endpoints.VendorGetByStatus}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;
//       if (statuses && Array.isArray(statuses)) {
//         statuses.forEach((status) => {
//           url += `&statuses=${status}`;
//         });
//       }
//       const res = await axios.get(url, Api.config());
//       if (res.status === 200) {
//         response = res.data?.result;
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error?.response?.data?.message);
//       }
//     }
//     return response;
//   }
// );

export const VendorGetByStatus = createAsyncThunk(
  "applicant/VendorGetByStatus",
  async (params, { rejectWithValue }) => {
    try {
      // Construct query string dynamically for multiple statuses
      const queryString = [
        ...(Array.isArray(params?.statuses) && params.statuses.length
          ? params.statuses.map((status) => `statuses=${status}`)
          : ["statuses=null"]),

        ...(Array.isArray(params?.parentId) && params.parentId.length
          ? params.parentId.map((id) => `parentId=${id}`)
          : ["parentId=null"]),

        ...(Array.isArray(params?.SubParentId) && params.SubParentId.length
          ? params.SubParentId.map((id) => `SubParentId=${id}`)
          : ["SubParentId=null"]),

        ...(Array.isArray(params?.SubParentId1) && params.SubParentId1.length
          ? params.SubParentId1.map((id) => `SubParentId1=${id}`)
          : ["SubParentId1=null"]),

        ...(Array.isArray(params?.SubParentId2) && params.SubParentId2.length
          ? params.SubParentId2.map((id) => `SubParentId2=${id}`)
          : ["SubParentId2=null"]),

        ...(Array.isArray(params?.filter) && params.filter.length
          ? params.filter.map((id) => `filter=${id}`)
          : ["filter=null"]),

        `filter2=${params?.filter2 ?? ""}`,
        `filter3=${params?.filter3 ?? ""}`,
        `desc=${params?.desc ?? ""}`,
        `orderBy=${params?.orderBy ?? ""}`,
        `page=${params?.page ?? ""}`,
        `pageLength=${params?.pageLength ?? ""}`,
      ]
        .filter(Boolean) // Ensure no undefined values
        .join("&"); // Join with &

      // Make the API call with the dynamic query string
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.VendorGetByStatus}?${queryString}`,
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

export const VendorGetById = createAsyncThunk(
  "vendor/VendorGetById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.VendorGetById}?id=${id}`,
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
