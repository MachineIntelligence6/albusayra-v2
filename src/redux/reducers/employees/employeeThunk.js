import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const EmployeeGetByStatuses = createAsyncThunk(
  "applicant/EmployeeGetByStatuses",
  async (params, { rejectWithValue }) => {
    try {
      // Construct query string dynamically for multiple statuses and params
      const queryString = [
        ...params?.statuses?.map((status) => `statuses=${status}`), // Add each status as a separate query parameter
        params?.parentId ? `parentId=${params.parentId}` : "", // Add parentId if exists [Campaign ID]
        params?.filter ? `filter=${params.filter}` : "", // res Status
        params?.filter2 ? `filter2=${params.filter2}` : "", // search
        params?.SubParentId ? `SubParentId=${params.SubParentId}` : "", // country
        params?.SubParentId1 ? `SubParentId1=${params.SubParentId1}` : "", // state
        params?.SubParentId2 ? `SubParentId2=${params.SubParentId2}` : "", // city
        params?.desc ? `desc=${params.desc}` : false,
        params?.orderBy ? `orderBy=${params.orderBy}` : "",
      ]
        .filter((param) => param !== "") // Exclude empty params
        .join("&"); // Join with &

      // Make the API call with the dynamic query string
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.EmployeeGetByStatuses}?${queryString}`,
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

export const UpdateFinalGeneralInfo = createAsyncThunk(
  "platform/UpdateFinalGeneralInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalGeneralInfo}`,
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

export const UpdateFinalContactInfo = createAsyncThunk(
  "platform/UpdateFinalContactInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalContactInfo}`,
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

export const UpdateFinalEmiratesInfo = createAsyncThunk(
  "platform/UpdateFinalEmiratesInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalEmiratesInfo}`,
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

export const UpdateFinalLicenseInfo = createAsyncThunk(
  "platform/UpdateFinalLicenseInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalLicenseInfo}`,
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

export const UpdateFinalPassportInfo = createAsyncThunk(
  "platform/UpdateFinalPassportInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalPassportInfo}`,
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

export const UpdateFinalVisaInfo = createAsyncThunk(
  "platform/UpdateFinalVisaInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalVisaInfo}`,
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

export const UpdateFinalInsuranceInfo = createAsyncThunk(
  "platform/UpdateFinalInsuranceInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalInsuranceInfo}`,
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

export const UpdateFinalOtherDetailsInfo = createAsyncThunk(
  "platform/UpdateFinalOtherDetailsInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.UpdateFinalOtherDetailsInfo}`,
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

// Export API
export const ExportEmployeeByStatus = createAsyncThunk(
  "inventory/ExportEmployeeByStatus",
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
      let url = `${Api.API_URL}${Api.endpoints.ExportEmployeeByStatus}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;

      if (statuses && Array.isArray(statuses)) {
        statuses.forEach((status) => {
          url += `&statuses=${status}`;
        });
      }
      // Make API call to fetch data as a Blob
      const res = await axios.get(url, {
        ...Api.config(),
        responseType: "blob", // Set response type for binary data
      });

      if (res.status === 200) {
        response = res.data;
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
    return response;
  }
);
//Incomplete history table Api
export const EmployeeGetByIdEmiratesHistory = createAsyncThunk(
  "employee/EmployeeGetByIdEmiratesHistory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.EmployeeGetByIdEmiratesHistory}?id=${id}`,
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
export const EmployeeGetByIdLicenseHistory = createAsyncThunk(
  "employee/EmployeeGetByIdLicenseHistory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.EmployeeGetByIdLicenseHistory}?id=${id}`,
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
export const EmployeeGetByIdPassportHistory = createAsyncThunk(
  "employee/EmployeeGetByIdPassportHistory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.EmployeeGetByIdPassportHistory}?id=${id}`,
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
export const EmployeeGetByIdVisaHistory = createAsyncThunk(
  "employee/EmployeeGetByIdVisaHistory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.EmployeeGetByIdVisaHistory}?id=${id}`,
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
export const EmployeeGetByIdInsuranceHistory = createAsyncThunk(
  "employee/EmployeeGetByIdInsuranceHistory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.EmployeeGetByIdInsuranceHistory}?id=${id}`,
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
