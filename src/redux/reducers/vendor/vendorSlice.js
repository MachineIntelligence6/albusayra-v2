import { createSlice } from "@reduxjs/toolkit";
import {
  VendorCreate,
  VendorDelete,
  VendorGetById,
  VendorGetByStatus,
  VendorUpdate,
} from "./vendorThunk";

export const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    getByStatus: [],
    getById: [],
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
      // create
      .addCase(VendorCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(VendorCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(VendorUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(VendorUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(VendorDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(VendorDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by status
      .addCase(VendorGetByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorGetByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.getByStatus = action.payload;
        state.success = true;
      })
      .addCase(VendorGetByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by id
      .addCase(VendorGetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(VendorGetById.fulfilled, (state, action) => {
        state.getById = action.payload;
        state.loading = false;
      })
      .addCase(VendorGetById.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = vendorSlice.actions;
export default vendorSlice.reducer;
