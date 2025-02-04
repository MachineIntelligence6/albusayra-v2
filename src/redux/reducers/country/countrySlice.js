import { createSlice } from "@reduxjs/toolkit";
import {
  CountriesCreate,
  CountriesDelete,
  CountriesGetById,
  CountriesGetByStatuses,
  CountriesUpdate,
} from "./countryThunk";

export const countrySlice = createSlice({
  name: "country",
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
    },
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(CountriesCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CountriesCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(CountriesCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(CountriesUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CountriesUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(CountriesUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(CountriesDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CountriesDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(CountriesDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by status
      .addCase(CountriesGetByStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CountriesGetByStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.getByStatus = action.payload;
        state.success = true;
      })
      .addCase(CountriesGetByStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by id
      .addCase(CountriesGetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(CountriesGetById.fulfilled, (state, action) => {
        state.getById = action.payload;
        state.loading = false;
      })
      .addCase(CountriesGetById.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = countrySlice.actions;
export default countrySlice.reducer;
