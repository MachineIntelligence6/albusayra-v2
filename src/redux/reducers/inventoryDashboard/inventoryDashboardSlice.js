import { createSlice } from "@reduxjs/toolkit";
import {
  InventoryDashboardGetBikeByStatusCompanyWise,
  InventoryDashboardGetBikeByStatusVendorWise,
  InventoryDashboardGetBikeCounters,
} from "./inventoryDashboardThunk";

export const InventoryDashboardSlice = createSlice({
  name: "InventoryDashboard",
  initialState: {
    getByStatus: [],
    getById: [],
    dashboardBikeCounter: {},
    getByStatusDashboardVendor: [],
    getByStatusDashboardCompany: [],
    loading: false,
    success: false,
    submitSuccess: false,
    deleteSuccess: false,
    error: null,
    editDetails: null,
  },
  reducers: {
    updateSuccess: (state) => {
      state.loading = false;
      state.success = false;
      state.submitSuccess = false;
      state.deleteSuccess = false;
      state.error = null;
      state.editDetails = null;
      state.getDataById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get by status dashboard Bike
      .addCase(InventoryDashboardGetBikeCounters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryDashboardGetBikeCounters.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardBikeCounter = action.payload;
        state.success = true;
      })
      .addCase(InventoryDashboardGetBikeCounters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by status vendor wise Bike
      .addCase(InventoryDashboardGetBikeByStatusVendorWise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        InventoryDashboardGetBikeByStatusVendorWise.fulfilled,
        (state, action) => {
          state.loading = false;
          state.getByStatusDashboardVendor = action.payload;
          state.success = true;
        }
      )
      .addCase(
        InventoryDashboardGetBikeByStatusVendorWise.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // get by status company wise Bike
      .addCase(
        InventoryDashboardGetBikeByStatusCompanyWise.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        InventoryDashboardGetBikeByStatusCompanyWise.fulfilled,
        (state, action) => {
          state.loading = false;
          state.getByStatusDashboardCompany = action.payload;
          state.success = true;
        }
      )
      .addCase(
        InventoryDashboardGetBikeByStatusCompanyWise.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

// Export Actions and Reducer
export const { updateSuccess } = InventoryDashboardSlice.actions;
export default InventoryDashboardSlice.reducer;
