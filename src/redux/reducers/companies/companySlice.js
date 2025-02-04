import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  getCompanyByStatus,
  getEditDetails,
  deleteCompanyById,
  updateCompany,
  getCompanyById,
} from "./companyThunk";

export const companySlice = createSlice({
  name: "companySlice",
  initialState: {
    getDataByStatuses: [],
    getDataById: [],
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
      state.editDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createCompany
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateCompany
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(updateCompany.rejected, (state, action) => {
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

      // getCompanyByStatus
      .addCase(getCompanyByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.getDataByStatuses = action.payload;
        state.success = true;
      })
      .addCase(getCompanyByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCompanyById
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.getDataById = action.payload;
        state.success = true;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteCompanyById
      .addCase(deleteCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = companySlice.actions;
export default companySlice.reducer;
