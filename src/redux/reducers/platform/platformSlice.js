import { createSlice } from "@reduxjs/toolkit";
import {
  PlatformCreate,
  PlatformDelete,
  PlatformGetById,
  PlatformGetByStatus,
  PlatformUpdate,
} from "./platformThunk";

export const platformSlice = createSlice({
  name: "platform",
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
      .addCase(PlatformCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PlatformCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(PlatformCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(PlatformUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PlatformUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(PlatformUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(PlatformDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PlatformDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(PlatformDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by status
      .addCase(PlatformGetByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PlatformGetByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.getByStatus = action.payload;
        state.success = true;
      })
      .addCase(PlatformGetByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by id
      .addCase(PlatformGetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(PlatformGetById.fulfilled, (state, action) => {
        state.getById = action.payload;
        state.loading = false;
      })
      .addCase(PlatformGetById.rejected, (state) => {
        state.loading = false;
      });
    //   // updateCompany
    //   .addCase(updateCompany.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateCompany.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.submitSuccess = true;
    //   })
    //   .addCase(updateCompany.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   // get ID on Edit Click
    //   .addCase(getEditDetails.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.editDetails = action.payload;
    //   })
    //   .addCase(getEditDetails.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   // getCompanyByStatus
    //   .addCase(getCompanyByStatus.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getCompanyByStatus.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.getDataByStatuses = action.payload;
    //     state.success = true;
    //   })
    //   .addCase(getCompanyByStatus.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   // deleteCompanyById
    //   .addCase(deleteCompanyById.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteCompanyById.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.deleteSuccess = true;
    //     state.getDataById = action.payload;
    //   })
    //   .addCase(deleteCompanyById.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = platformSlice.actions;
export default platformSlice.reducer;
