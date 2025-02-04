import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.createCampaign}`,
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

export const getCampaignByStatus = createAsyncThunk(
  "campaign/getCampaignByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCampaignByStatus}?page=${data?.page}&pageLength=${data?.pageLength}&desc=false&orderBy=status&statuses=1&statuses=2`,
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

export const getCampaignById = createAsyncThunk(
  "campaign/getCampaignById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCampaignById}?id=${id}`,
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

export const deleteCampaignById = createAsyncThunk(
  "campaign/deleteCampaignById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.deleteCampaignById}`,
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

export const getEditDetails = createAsyncThunk(
  "campaign/getEditDetails",
  async (details) => {
    return details;
  }
);

export const updateCampaign = createAsyncThunk(
  "campaign/updateCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.updateCampaign}`,
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

export const updateCampaignStatusOnly = createAsyncThunk(
  "campaign/updateCampaignStatusOnly",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.updateCampaignStatusOnly}`,
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

export const registerEmployeeCampaign = createAsyncThunk(
  "campaign/registerEmployeeCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.registerEmployeeCampaign}`,
        data,
        Api.config()
      );
      if (response?.data?.code === 200) {
        toast.success("Registered Successfully");
      }
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "campaign/changeUserStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.changeUserStatus}`,
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

// export const getCampaignListByStatus = createAsyncThunk(
//   "campaign/getCampaignListByStatus",
//   async (params, { rejectWithValue }) => {
//     try {
//       // Construct query string dynamically for multiple statuses
//       const queryString = [
//         ...params?.statuses?.map((status) => `statuses=${status}`), // Add each status as a separate query parameter
//         params?.parentId ? `parentId=${params.parentId}` : "", // Add parentId if exists
//         params?.filter ? `filter=${params.filter}` : "",
//         params?.filter2 ? `filter2=${params.filter2}` : "",
//         params?.SubParentId ? `SubParentId=${params.SubParentId}` : "",
//         params?.SubParentId1 ? `SubParentId1=${params.SubParentId1}` : "",
//         params?.SubParentId2 ? `SubParentId2=${params.SubParentId2}` : "",
//       ]
//         .filter((param) => param !== "") // Exclude empty params
//         .join("&"); // Join with &

//       // Make the API call with the dynamic query string
//       const response = await axios.get(
//         `${Api.API_URL}${Api?.endpoints?.getCampaignListByStatus}?${queryString}`,
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

export const getCampaignListByStatus = createAsyncThunk(
  "generic/getCampaignListByStatus",
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

        `filter2=${params?.filter2 ?? ""}`,
        `page=${params?.page ?? ""}`,
        `pageLength=${params?.pageLength ?? ""}`,
        `desc=${params?.desc ?? ""}`,
        `orderBy=${params?.orderBy ?? ""}`,
      ]
        .filter(Boolean) // Ensure no undefined values
        .join("&"); // Join with &

      // Make the API call with the dynamic query string
      const response = await axios.get(
        `${Api.API_URL}${Api?.endpoints?.getCampaignListByStatus}?${queryString}`,
        Api.config()
      );

      return response?.data?.result;
    } catch (error) {
      console.error("API Call Failed: ", error);
      toast.error(error.response?.data?.message || "Failed");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

// export const getCampaignListByStatus = createAsyncThunk(
//   "generic/getCampaignListByStatus",
//   async (params, { rejectWithValue }) => {
//     try {
//       // Construct query string dynamically, excluding null or undefined params
//       const queryParams = new URLSearchParams();

//       if (Array.isArray(params?.statuses) && params.statuses.length) {
//         params.statuses.forEach((status) =>
//           queryParams.append("statuses", status)
//         );
//       }

//       if (Array.isArray(params?.parentId) && params.parentId.length) {
//         params.parentId.forEach((id) => queryParams.append("parentId", id));
//       }

//       if (Array.isArray(params?.SubParentId) && params.SubParentId.length) {
//         params.SubParentId.forEach((id) =>
//           queryParams.append("SubParentId", id)
//         );
//       }

//       if (Array.isArray(params?.SubParentId1) && params.SubParentId1.length) {
//         params.SubParentId1.forEach((id) =>
//           queryParams.append("SubParentId1", id)
//         );
//       }

//       if (Array.isArray(params?.SubParentId2) && params.SubParentId2.length) {
//         params.SubParentId2.forEach((id) =>
//           queryParams.append("SubParentId2", id)
//         );
//       }

//       // Add non-array parameters only if they are NOT null/undefined/empty
//       if (params?.filter2) queryParams.append("filter2", params.filter2);
//       if (params?.page) queryParams.append("page", params.page);
//       if (params?.pageLength)
//         queryParams.append("pageLength", params.pageLength);
//       if (params?.desc) queryParams.append("desc", params.desc);
//       if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

//       // Convert queryParams to a string for the API request
//       const queryString = queryParams.toString();

//       // Make the API call with the dynamic query string
//       const response = await axios.get(
//         `${Api.API_URL}${Api?.endpoints?.getCampaignListByStatus}?${queryString}`,
//         Api.config()
//       );

//       return response?.data?.result;
//     } catch (error) {
//       console.error("API Call Failed: ", error);
//       toast.error(error.response?.data?.message || "Failed");
//       return rejectWithValue(error.response?.data || error.message || "Failed");
//     }
//   }
// );

// Export API
export const ExportCampaignByStatus = createAsyncThunk(
  "campaign/ExportCampaignByStatus",
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
      let url = `${Api.API_URL}${Api.endpoints.ExportCampaignByStatus}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;

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
