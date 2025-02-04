import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const getIndustriesByStatus = createAsyncThunk(
  "generic/getIndustriesByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getIndustriesByStatus}?page=${data?.page}&pageLength=${data?.pageLength}&statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getCountriesByStatus = createAsyncThunk(
  "generic/getCountriesByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCountriesByStatus}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getStatesByStatus = createAsyncThunk(
  "generic/getStatesByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getStatesByStatus}?statuses=${data.statuses}&parentId=${data?.parentId}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getCitiesByStatus = createAsyncThunk(
  "generic/getCitiesByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCitiesByStatus}?statuses=${data.statuses}&parentId=${data?.parentId}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getCityByCountryId = createAsyncThunk(
  "generic/getCityByCountryId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCityByCountryId}?statuses=${data.statuses}&parentId=${data?.parentId}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getGenderByStatus = createAsyncThunk(
  "generic/getGenderByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getGenderByStatus}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getByHeaderAndSectionAndKey = createAsyncThunk(
  "generic/getByHeaderAndSectionAndKey",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getByHeaderAndSectionAndKey}?filter=AppSetting&filter2=${data?.sectionName}&filter3=${data?.sectionValue}&statuses=1`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getByHeaderMaritalStatus = createAsyncThunk(
  "generic/getByHeaderMaritalStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getByHeaderAndSectionAndKey}?filter=AppSetting&filter2=${data?.sectionName}&filter3=${data?.sectionValue}&statuses=1`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getByHeaderReligion = createAsyncThunk(
  "generic/getByHeaderReligion",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getByHeaderAndSectionAndKey}?filter=AppSetting&filter2=${data?.sectionName}&filter3=${data?.sectionValue}&statuses=1`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getByHeaderVisaType = createAsyncThunk(
  "generic/getByHeaderVisaType",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getByHeaderAndSectionAndKey}?filter=AppSetting&filter2=${data?.sectionName}&filter3=${data?.sectionValue}&statuses=1`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getByHeaderEMPOwnership = createAsyncThunk(
  "generic/getByHeaderEMPOwnership",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getByHeaderAndSectionAndKey}?filter=AppSetting&filter2=${data?.sectionName}&filter3=${data?.sectionValue}&statuses=1`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getCompanyByStatus = createAsyncThunk(
  "generic/getCompanyByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCompanyByStatus}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const getCampaignsOptions = createAsyncThunk(
  "generic/getCampaignsOptions",
  async (params, { rejectWithValue }) => {
    try {
      // Build query string dynamically
      const queryString = [
        // Handle multiple statuses
        ...(Array.isArray(params?.statuses)
          ? params.statuses.map((status) => `statuses=${status}`)
          : []),
        // Optional parameters
        params?.page && `page=${params.page}`,
        params?.pageLength && `pageLength=${params.pageLength}`,
        params?.filter2 && `filter2=${params.filter2}`,
      ]
        .filter(Boolean) // Remove falsy values
        .join("&");

      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCampaignByStatus}?${queryString}`,
        Api.config()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed";
      console.error("Error fetching campaigns:", errorMessage);

      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || errorMessage || "Failed to fetch campaigns"
      );
    }
  }
);

export const getCampaignsInFilter = createAsyncThunk(
  "generic/getCampaignsInFilter",
  async (params, { rejectWithValue }) => {
    try {
      // Build query string dynamically
      const queryString = [
        // Handle multiple statuses
        ...(Array.isArray(params?.statuses)
          ? params.statuses.map((status) => `statuses=${status}`)
          : []),
        // Optional parameters
        params?.page && `page=${params.page}`,
        params?.pageLength && `pageLength=${params.pageLength}`,
        params?.filter2 && `filter2=${params.filter2}`,
      ]
        .filter(Boolean) // Remove falsy values
        .join("&");

      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCampaignByStatus}?${queryString}`,
        Api.config()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed";
      console.error("Error fetching campaigns:", errorMessage);

      toast.error(errorMessage);
      return rejectWithValue(
        error.response?.data || errorMessage || "Failed to fetch campaigns"
      );
    }
  }
);

export const getPlatformDropdown = createAsyncThunk(
  "generic/getPlatformDropdown",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getPlatformDropdown}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const UpdateStatusMultiple = createAsyncThunk(
  "generic/UpdateStatusMultiple",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateStatusMultiple}`,
        data,
        Api.config()
      );
      if (response?.data?.code === 200) {
        toast.success("Status Changed Successfully");
      }
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const GenericGetVendorDropdown = createAsyncThunk(
  "generic/GenericGetVendorDropdown",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.GenericGetVendorDropdown}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);
export const GenericGetVendorContractDropdownVendorWise = createAsyncThunk(
  "generic/GenericGetVendorContractDropdownVendorWise",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.GenericGetVendorContractDropdownVendorWise}?parentId=${data?.parentId}&statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);
export const GenericGetProductCategoryDropdown = createAsyncThunk(
  "generic/GenericGetProductCategoryDropdown",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.GenericGetProductCategoryDropdown}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const GenericGetCompanyDropdown = createAsyncThunk(
  "generic/GenericGetCompanyDropdown",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.GenericGetCompanyDropdown}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const GenericGetUserRoleDropdown = createAsyncThunk(
  "generic/GenericGetUserRoleDropdown",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.GenericGetUserRoleDropdown}?statuses=${data?.statuses}`,
        Api.config()
      );
      return response.data?.result?.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const GenericGetAdvancefilterDropdown = createAsyncThunk(
  "generic/GenericGetAdvancefilterDropdown",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.GenericGetAdvancefilterDropdown}`,
        Api.config()
      );

      return response.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

// export const GenericGetAdvancefilterDropdown = createAsyncThunk(
//   "generic/GenericGetAdvancefilterDropdown",
//   async (params, { rejectWithValue }) => {
//     try {
//       // Construct query string dynamically for multiple statuses
//       const queryString = [
//         // Send all params as a separate query parameter
//         ...(params?.statuses?.map((status) => `statuses=${status}`) || []),
//         ...(params?.parentId?.map((id) => `parentId=${id}`) || []),
//         ...(params?.SubParentId?.map((id) => `SubParentId=${id}`) || []),
//         ...(params?.SubParentId1?.map((id) => `SubParentId1=${id}`) || []),
//         ...(params?.SubParentId2?.map((id) => `SubParentId2=${id}`) || []),
//         ...(params?.filter?.map((id) => `filter=${id}`) || []),
//         ...(params?.filter2?.map((id) => `filter2=${id}`) || []),
//       ]
//         .filter(Boolean) // Remove falsy values (e.g., null, undefined, empty string)
//         .join("&"); // Join with &

//       // Make the API call with the dynamic query string
//       const response = await axios.get(
//         `${Api.API_URL}${Api?.endpoints?.GenericGetAdvancefilterDropdown}?${queryString}`,
//         Api.config()
//       );
//       return response?.data?.result;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Failed";
//       toast.error(errorMessage);
//       return rejectWithValue(error.response?.data || error.message || "Failed");
//     }
//   }
// );
