import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const getProceedDetails = createAsyncThunk(
  "applicant/getProceedDetails",
  async (details) => {
    return details;
  }
);

// export const getCampaignListByStatus = createAsyncThunk(
//   "applicant/getCampaignListByStatus",
//   async (params, { rejectWithValue }) => {
//     try {
//       // Construct query string dynamically for multiple statuses and params
//       const queryString = [
//         ...params?.statuses?.map((status) => `statuses=${status}`), // Add each status as a separate query parameter
//         params?.page ? `page=${params.page}` : "",
//         params?.pageLength ? `pageLength=${params.pageLength}` : "",

//         params?.parentId ? `parentId=${params.parentId}` : "", // Add parentId if exists [Campaign ID]
//         params?.filter ? `filter=${params.filter}` : "", // res Status
//         params?.filter2 ? `filter2=${params.filter2}` : "", // search
//         params?.SubParentId ? `SubParentId=${params.SubParentId}` : "", // country
//         params?.SubParentId1 ? `SubParentId1=${params.SubParentId1}` : "", // state
//         params?.SubParentId2 ? `SubParentId2=${params.SubParentId2}` : "", // city
//         params?.desc ? `desc=${params.desc}` : false,
//         params?.orderBy ? `orderBy=${params.orderBy}` : "",
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
  "applicant/getCampaignListByStatus",
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
        `desc=${params?.desc ?? ""}`,
        `orderBy=${params?.orderBy ?? ""}`,
        `page=${params?.page ?? ""}`,
        `pageLength=${params?.pageLength ?? ""}`,
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
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const ApplicantGetById = createAsyncThunk(
  "platform/ApplicantGetById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.ApplicantGetById}?id=${id}`,
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

// Add Applicant
export const CreateApplicantGeneraInfo = createAsyncThunk(
  "applicant/CreateApplicantGeneraInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.CreateApplicantGeneraInfo}`,
        data,
        Api.multiPartConfig()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error("Please fill all the required fields");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const UpdateApplicantGeneraInfo = createAsyncThunk(
  "applicant/UpdateApplicantGeneraInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateApplicantGeneraInfo}`,
        data,
        Api.multiPartConfig()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error("Please fill all the required fields");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const UpdateApplicantContactInfo = createAsyncThunk(
  "applicant/UpdateApplicantContactInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateApplicantContactInfo}`,
        data,
        Api.config()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error("Please fill all the required fields");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const UpdateApplicantEmiratesInfo = createAsyncThunk(
  "applicant/UpdateApplicantEmiratesInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateApplicantEmiratesInfo}`,
        data,
        Api.multiPartConfig()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error("Please fill all the required fields");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const UpdateApplicantLicenseInfo = createAsyncThunk(
  "applicant/UpdateApplicantLicenseInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateApplicantLicenseInfo}`,
        data,
        Api.multiPartConfig()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error("Please fill all the required fields");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const UpdateApplicantPassportInfo = createAsyncThunk(
  "applicant/UpdateApplicantPassportInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateApplicantPassportInfo}`,
        data,
        Api.multiPartConfig()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error("Please fill all the required fields");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const UpdateApplicantUpdateReferralInfo = createAsyncThunk(
  "applicant/UpdateApplicantUpdateReferralInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateApplicantUpdateReferralInfo}`,
        data,
        Api.config()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error("Please fill all the required fields");
      return rejectWithValue(error.response?.data || error.message || "Failed");
    }
  }
);

export const ReferralInfoMultiPart = createAsyncThunk(
  "applicant/ReferralInfoMultiPart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api.API_URL}${Api?.endpoints?.UpdateApplicantUpdateReferralInfo}`,
        data,
        Api.multiPartConfig()
      );
      return response?.data?.result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed";
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || error.message || "Failed");
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
