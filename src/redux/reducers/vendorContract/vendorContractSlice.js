import { createSlice } from "@reduxjs/toolkit";
import {
  VendorContractCreate,
  VendorContractDelete,
  VendorContractGetById,
  VendorContractGetByStatus,
  VendorContractUpdate,
} from "./vendorContractThunk";

export const vendorContractSlice = createSlice({
  name: "vendorContract",
  initialState: {
    getByStatus: [],
    getById: {},
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
      .addCase(VendorContractCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorContractCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(VendorContractCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(VendorContractUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorContractUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(VendorContractUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(VendorContractDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorContractDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(VendorContractDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by status
      .addCase(VendorContractGetByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VendorContractGetByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.getByStatus = action.payload;
        state.success = true;
      })
      .addCase(VendorContractGetByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by id
      .addCase(VendorContractGetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(VendorContractGetById.fulfilled, (state, action) => {
        state.getById = action.payload;
        state.loading = false;
      })
      .addCase(VendorContractGetById.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = vendorContractSlice.actions;
export default vendorContractSlice.reducer;
