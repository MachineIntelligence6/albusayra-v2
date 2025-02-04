import { createSlice } from "@reduxjs/toolkit";
import {
  ApplicantGetById,
  getCampaignListByStatus,
  getProceedDetails,
  CreateApplicantGeneraInfo,
  UpdateApplicantGeneraInfo,
  UpdateApplicantContactInfo,
  UpdateApplicantEmiratesInfo,
  UpdateApplicantLicenseInfo,
  UpdateApplicantPassportInfo,
  UpdateApplicantUpdateReferralInfo,
} from "./applicantThunk";

export const applicantSlice = createSlice({
  name: "applicantSlice",
  initialState: {
    getListByStatus: [],
    createGeneralInfo: null,
    proceedDetails: null,
    loading: false,
    success: false,
    submitApplicantSuccess: false,
  },
  reducers: {
    updateEmployeeSuccess: (state) => {
      state.loading = false;
      state.success = false;
      state.submitApplicantSuccess = false;
    },
    resetModal: (state) => {
      state.proceedDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get ID on Edit Click
      // .addCase(getProceedDetails.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.proceedDetails = action.payload;
      // })
      // .addCase(getProceedDetails.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      .addCase(ApplicantGetById.fulfilled, (state, action) => {
        state.loading = false;
        state.proceedDetails = action.payload;
      })
      .addCase(ApplicantGetById.rejected, (state, action) => {
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

      // CreateApplicantGeneraInfo
      .addCase(CreateApplicantGeneraInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateApplicantGeneraInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.createGeneralInfo = action.payload;
        // state.proceedDetails = null;
        state.submitApplicantSuccess = true;
      })
      .addCase(CreateApplicantGeneraInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateApplicantGeneraInfo
      .addCase(UpdateApplicantGeneraInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateApplicantGeneraInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.createGeneralInfo = action.payload;
        state.submitApplicantSuccess = true;
      })
      .addCase(UpdateApplicantGeneraInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateApplicantContactInfo
      .addCase(UpdateApplicantContactInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateApplicantContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitApplicantSuccess = true;
      })
      .addCase(UpdateApplicantContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateApplicantEmiratesInfo
      .addCase(UpdateApplicantEmiratesInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateApplicantEmiratesInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitApplicantSuccess = true;
      })
      .addCase(UpdateApplicantEmiratesInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateApplicantLicenseInfo
      .addCase(UpdateApplicantLicenseInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateApplicantLicenseInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitApplicantSuccess = true;
      })
      .addCase(UpdateApplicantLicenseInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateApplicantPassportInfo
      .addCase(UpdateApplicantPassportInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateApplicantPassportInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitApplicantSuccess = true;
      })
      .addCase(UpdateApplicantPassportInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateApplicantUpdateReferralInfo
      .addCase(UpdateApplicantUpdateReferralInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateApplicantUpdateReferralInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitApplicantSuccess = true;
      })
      .addCase(UpdateApplicantUpdateReferralInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateEmployeeSuccess, resetModal } = applicantSlice.actions;
export default applicantSlice.reducer;
