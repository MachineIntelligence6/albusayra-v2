import { createSlice } from "@reduxjs/toolkit";
import {
  EmployeeGetByStatuses,
  UpdateFinalGeneralInfo,
  UpdateFinalContactInfo,
  UpdateFinalEmiratesInfo,
  UpdateFinalLicenseInfo,
  UpdateFinalPassportInfo,
  UpdateFinalVisaInfo,
  UpdateFinalInsuranceInfo,
  UpdateFinalOtherDetailsInfo,
  EmployeeGetByIdEmiratesHistory,
  EmployeeGetByIdLicenseHistory,
  EmployeeGetByIdPassportHistory,
  EmployeeGetByIdVisaHistory,
  EmployeeGetByIdInsuranceHistory,
} from "./employeeThunk";

export const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: {
    GetByStatusesData: [],
    GetByIdEmirates: [],
    GetByIdLicense: [],
    GetByIdPassport: [],
    GetByIdVisa: [],
    GetByIdInsurance: [],
    proceedDetails: null,
    submitSuccess: false,
    loading: false,
    success: false,
  },
  reducers: {
    updateEmployeeSuccess: (state) => {
      state.loading = false;
      state.success = false;
      state.submitSuccess = false;
      state.proceedDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // EmployeeGetByStatuses
      .addCase(EmployeeGetByStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EmployeeGetByStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.GetByStatusesData = action.payload;
        state.success = true;
      })
      .addCase(EmployeeGetByStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalGeneralInfo
      .addCase(UpdateFinalGeneralInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalGeneralInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalGeneralInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalContactInfo
      .addCase(UpdateFinalContactInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalEmiratesInfo
      .addCase(UpdateFinalEmiratesInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalEmiratesInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalEmiratesInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalLicenseInfo
      .addCase(UpdateFinalLicenseInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalLicenseInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalLicenseInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalPassportInfo
      .addCase(UpdateFinalPassportInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalPassportInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalPassportInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalVisaInfo
      .addCase(UpdateFinalVisaInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalVisaInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalVisaInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalInsuranceInfo
      .addCase(UpdateFinalInsuranceInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalInsuranceInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalInsuranceInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UpdateFinalOtherDetailsInfo
      .addCase(UpdateFinalOtherDetailsInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateFinalOtherDetailsInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(UpdateFinalOtherDetailsInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(EmployeeGetByIdEmiratesHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EmployeeGetByIdEmiratesHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.GetByIdEmirates = action.payload;
        state.success = true;
      })
      .addCase(EmployeeGetByIdEmiratesHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(EmployeeGetByIdLicenseHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EmployeeGetByIdLicenseHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.GetByIdLicense = action.payload;
        state.success = true;
      })
      .addCase(EmployeeGetByIdLicenseHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(EmployeeGetByIdPassportHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EmployeeGetByIdPassportHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.GetByIdPassport = action.payload;
        state.success = true;
      })
      .addCase(EmployeeGetByIdPassportHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(EmployeeGetByIdVisaHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EmployeeGetByIdVisaHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.GetByIdVisa = action.payload;
        state.success = true;
      })
      .addCase(EmployeeGetByIdVisaHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(EmployeeGetByIdInsuranceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EmployeeGetByIdInsuranceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.GetByIdInsurance = action.payload;
        state.success = true;
      })
      .addCase(EmployeeGetByIdInsuranceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateEmployeeSuccess } = employeeSlice.actions;
export default employeeSlice.reducer;
