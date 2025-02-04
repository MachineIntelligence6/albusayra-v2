import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Api from "@/configs/UseApi";
import { toast } from "react-hot-toast";

export const InventoryCreateBikeInfo = createAsyncThunk(
  "inventory/InventoryCreateBikeInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryCreateBikeInfo}`,
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
export const InventoryUpdateBikeInfo = createAsyncThunk(
  "inventory/InventoryUpdateBikeInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateBikeInfo}`,
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
export const InventoryCreateInventoryMulkiya = createAsyncThunk(
  "inventory/InventoryCreateInventoryMulkiya",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryCreateInventoryMulkiya}`,
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
export const InventoryUpdateInventoryMulkiya = createAsyncThunk(
  "inventory/InventoryUpdateInventoryMulkiya",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateInventoryMulkiya}`,
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

export const InventoryCreateInventoryInsurance = createAsyncThunk(
  "inventory/InventoryCreateInventoryInsurance",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryCreateInventoryInsurance}`,
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
export const InventoryUpdateInventoryInsurance = createAsyncThunk(
  "inventory/InventoryUpdateInventoryInsurance",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateInventoryInsurance}`,
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
export const InventoryCreateInventoryContract = createAsyncThunk(
  "inventory/InventoryCreateInventoryContract",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryCreateInventoryContract}`,
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
export const InventoryUpdateInventoryContract = createAsyncThunk(
  "inventory/InventoryUpdateInventoryContract",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateInventoryContract}`,
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
export const InventoryCreateInventoryFoodPermit = createAsyncThunk(
  "inventory/InventoryCreateInventoryFoodPermit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryCreateInventoryFoodPermit}`,
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
export const InventoryUpdateInventoryFoodPermit = createAsyncThunk(
  "inventory/InventoryUpdateInventoryFoodPermit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateInventoryFoodPermit}`,
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
export const InventoryUpdateOtherDetails = createAsyncThunk(
  "inventory/InventoryUpdateOtherDetails",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateOtherDetails}`,
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
// export const InventoryGetByStatusesBike = createAsyncThunk(
//   "inventory/InventoryGetByStatusesBike",
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
//       let url = `${Api.API_URL}${Api.endpoints.InventoryGetByStatusesBike}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;
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

export const InventoryGetByStatusesBike = createAsyncThunk(
  "applicant/InventoryGetByStatusesBike",
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

        // ...(Array.isArray(params?.filter2) && params.filter2.length
        //   ? params.filter2.map((id) => `filter2=${id}`)
        //   : ["filter2=null"]),

        // ...(Array.isArray(params?.filter3) && params.filter3.length
        //   ? params.filter3.map((id) => `filter3=${id}`)
        //   : ["filter3=null"]),

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
        `${Api.API_URL}${Api?.endpoints?.InventoryGetByStatusesBike}?${queryString}`,
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

export const InventoryGetByStatusesSim = createAsyncThunk(
  "applicant/InventoryGetByStatusesSim",
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

        // ...(Array.isArray(params?.filter2) && params.filter2.length
        //   ? params.filter2.map((id) => `filter2=${id}`)
        //   : ["filter2=null"]),

        // ...(Array.isArray(params?.filter3) && params.filter3.length
        //   ? params.filter3.map((id) => `filter3=${id}`)
        //   : ["filter3=null"]),

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
        `${Api.API_URL}${Api?.endpoints?.InventoryGetByStatusesSim}?${queryString}`,
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

// export const InventoryGetByStatusesSim = createAsyncThunk(
//   "inventory/InventoryGetByStatusesSim",
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
//       let url = `${Api.API_URL}${Api.endpoints.InventoryGetByStatusesSim}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;
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

export const InventoryGetById = createAsyncThunk(
  "inventory/InventoryGetById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.InventoryGetById}?id=${id}`,
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
export const InventoryGetByIdSim = createAsyncThunk(
  "inventory/InventoryGetByIdSim",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.InventoryGetByIdSim}?id=${id}`,
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
// mulkiya section
export const InventoryGetByIdMulkiya = createAsyncThunk(
  "inventory/InventoryGetByIdMulkiya",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.InventoryGetByIdMulkiya}?id=${id}`,
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
export const InventoryDeleteMulkiya = createAsyncThunk(
  "inventory/InventoryDeleteMulkiya",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryDeleteMulkiya}`,
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
// food permit section
export const InventoryGetByIdFoodPermit = createAsyncThunk(
  "inventory/InventoryGetByIdFoodPermit",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.InventoryGetByIdFoodPermit}?id=${id}`,
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
export const InventoryDeleteFoodPermit = createAsyncThunk(
  "inventory/InventoryDeleteFoodPermit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryDeleteFoodPermit}`,
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
// insurance section
export const InventoryGetByIdInsurance = createAsyncThunk(
  "inventory/InventoryGetByIdInsurance",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.InventoryGetByIdInsurance}?id=${id}`,
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
export const InventoryDeleteInsurance = createAsyncThunk(
  "inventory/InventoryDeleteInsurance",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryDeleteInsurance}`,
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
// contract section
export const InventoryGetByIdContract = createAsyncThunk(
  "inventory/InventoryGetByIdContract",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${Api.API_URL}${Api.endpoints.InventoryGetByIdContract}?id=${id}`,
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
export const InventoryDeleteContract = createAsyncThunk(
  "inventory/InventoryDeleteContract",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryDeleteContract}`,
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
export const InventoryCreateSimInfo = createAsyncThunk(
  "inventory/InventoryCreateSimInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryCreateSimInfo}`,
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
export const InventoryUpdateSimInfo = createAsyncThunk(
  "inventory/InventoryUpdateSimInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateSimInfo}`,
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

export const InventoryExportInventoryListBike = createAsyncThunk(
  "inventory/InventoryExportInventoryListBike",
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
      let url = `${Api.API_URL}${Api.endpoints.InventoryExportInventoryListBike}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;

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
export const InventoryExportInventoryListSim = createAsyncThunk(
  "inventory/InventoryExportInventoryListSim",
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
      let url = `${Api.API_URL}${Api.endpoints.InventoryExportInventoryListSim}?page=${page}&pageLength=${pageLength}&filter=${filter}&filter2=${filter2}&filter3=${filter3}&desc=${desc}&orderBy=${orderBy}&parentId=${parentId}&SubParentId=${SubParentId}&SubParentId1=${SubParentId1}&SubParentId2=${SubParentId2}`;

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
export const InventoryDownloadBikeInfoTemplate = createAsyncThunk(
  "inventory/InventoryDownloadBikeInfoTemplate",
  async () => {
    let response;
    try {
      let url = `${Api.API_URL}${Api.endpoints.InventoryDownloadBikeInfoTemplate}`;
      const res = await axios.get(url, {
        ...Api.config(),
        responseType: "blob",
      });

      if (res.status === 200) {
        response = res.data;
      }
    } catch (err) {
      const message = err?.message || "Something went wrong!";
      toast.error(message);
    }
    return response;
  }
);
export const InventoryDownloadSimInfoTemplate = createAsyncThunk(
  "inventory/InventoryDownloadSimInfoTemplate",
  async () => {
    let response;
    try {
      let url = `${Api.API_URL}${Api.endpoints.InventoryDownloadSimInfoTemplate}`;

      const res = await axios.get(url, {
        ...Api.config(),
        responseType: "blob",
      });

      if (res.status === 200) {
        response = res.data;
      }
    } catch (err) {
      const message = err?.message || "Something went wrong!";
      toast.error(message);
    }
    return response;
  }
);
export const InventoryUploadBulkBikeInfo = createAsyncThunk(
  "inventory/InventoryUploadBulkBikeInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUploadBulkBikeInfo}`,
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
export const InventoryUploadBulkSimInfo = createAsyncThunk(
  "inventory/InventoryUploadBulkSimInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUploadBulkSimInfo}`,
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
// delete bulk
export const InventoryDeleteMultiple = createAsyncThunk(
  "inventory/InventoryDeleteMultiple",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryDeleteMultiple}`,
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
// update status multiple
export const InventoryUpdateStatusMultiple = createAsyncThunk(
  "inventory/InventoryUpdateStatusMultiple",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${Api.API_URL}${Api.endpoints.InventoryUpdateStatusMultiple}`,
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
