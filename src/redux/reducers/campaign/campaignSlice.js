import { createSlice } from "@reduxjs/toolkit";
import {
  createCampaign,
  deleteCampaignById,
  getCampaignById,
  getCampaignByStatus,
  getEditDetails,
  getCampaignListByStatus,
  registerEmployeeCampaign,
  updateCampaign,
  updateCampaignStatusOnly,
  changeUserStatus,
  getFilteredCampaignsByEmployee,
} from "./campaignThunk";

export const campaignSlice = createSlice({
  name: "campaignSlice",
  initialState: {
    getCampaignsByStatuses: [],
    getCampaignDataById: [],
    getListByStatus: [],
    loading: false,
    success: false,
    submitSuccess: false,
    statusChangeSuccess: false,
    deleteSuccess: false,
    error: null,
    editDetails: null,
  },
  reducers: {
    updateSuccess: (state) => {
      state.loading = false;
      state.success = false;
      state.submitSuccess = false;
      state.statusChangeSuccess = false;
      state.deleteSuccess = false;
      state.error = null;
      state.editDetails = null;
      state.getCampaignDataById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createCampaign
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get ID on Edit Click
      .addCase(getEditDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.editDetails = action.payload;
      })
      .addCase(getEditDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateCampaign
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateCampaignStatusOnly
      .addCase(updateCampaignStatusOnly.pending, (state) => {
        state.error = null;
      })
      .addCase(updateCampaignStatusOnly.fulfilled, (state, action) => {
        state.statusChangeSuccess = true;
      })
      .addCase(updateCampaignStatusOnly.rejected, (state, action) => {
        state.error = action.payload;
      })

      // getCampaignByStatus
      .addCase(getCampaignByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.getCampaignsByStatuses = action.payload;
        state.success = true;
      })
      .addCase(getCampaignByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCampaignById
      .addCase(getCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.getCampaignDataById = action.payload;
        state.success = true;
      })
      .addCase(getCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteCampaignById
      .addCase(deleteCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // registerEmployeeCampaign
      .addCase(registerEmployeeCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmployeeCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(registerEmployeeCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCampaignListByStatus
      .addCase(getCampaignListByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignListByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.getListByStatus = action.payload;
        state.success = true;
      })
      .addCase(getCampaignListByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // // getFilteredCampaignsByEmployee
      // .addCase(getFilteredCampaignsByEmployee.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getFilteredCampaignsByEmployee.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.getListByStatus = action.payload;
      //   state.success = true;
      // })
      // .addCase(getFilteredCampaignsByEmployee.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      // changeUserStatus
      .addCase(changeUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(changeUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = campaignSlice.actions;
export default campaignSlice.reducer;
