import { createSlice } from "@reduxjs/toolkit";
import {
  InventoryCreateBikeInfo,
  InventoryCreateInventoryContract,
  InventoryCreateInventoryFoodPermit,
  InventoryCreateInventoryInsurance,
  InventoryCreateInventoryMulkiya,
  InventoryCreateSimInfo,
  InventoryDeleteContract,
  InventoryDeleteFoodPermit,
  InventoryDeleteInsurance,
  InventoryDeleteMulkiya,
  InventoryDeleteMultiple,
  InventoryGetById,
  InventoryGetByIdContract,
  InventoryGetByIdFoodPermit,
  InventoryGetByIdInsurance,
  InventoryGetByIdMulkiya,
  InventoryGetByIdSim,
  InventoryGetByStatusesBike,
  InventoryGetByStatusesSim,
  InventoryUpdateBikeInfo,
  InventoryUpdateInventoryContract,
  InventoryUpdateInventoryFoodPermit,
  InventoryUpdateInventoryInsurance,
  InventoryUpdateInventoryMulkiya,
  InventoryUpdateOtherDetails,
  InventoryUpdateSimInfo,
  InventoryUpdateStatusMultiple,
} from "./inventoryThunk";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    getByStatus: [],
    getByStatusSim: [],
    getById: {},
    getByIdSim: {},
    getByIdMulkiya: {},
    getByIdFoodPermit: {},
    getByIdInsurance: {},
    getByIdContract: {},
    loading: false,
    success: false,
    submitSuccess: false,
    deleteSuccess: false,
    error: null,
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
      // create Bike Info
      .addCase(InventoryCreateBikeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryCreateBikeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryCreateBikeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update Bike Info
      .addCase(InventoryUpdateBikeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryUpdateBikeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryUpdateBikeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create Inventory Mulkiya
      .addCase(InventoryCreateInventoryMulkiya.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryCreateInventoryMulkiya.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryCreateInventoryMulkiya.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update Inventory Mulkiya

      .addCase(InventoryUpdateInventoryMulkiya.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryUpdateInventoryMulkiya.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryUpdateInventoryMulkiya.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create Inventory Insurance
      .addCase(InventoryCreateInventoryInsurance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryCreateInventoryInsurance.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryCreateInventoryInsurance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update Inventory Insurance
      .addCase(InventoryUpdateInventoryInsurance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryUpdateInventoryInsurance.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryUpdateInventoryInsurance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create Inventory Contract
      .addCase(InventoryCreateInventoryContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryCreateInventoryContract.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryCreateInventoryContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update Inventory Contract
      .addCase(InventoryUpdateInventoryContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryUpdateInventoryContract.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryUpdateInventoryContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create Food Permit
      .addCase(InventoryCreateInventoryFoodPermit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        InventoryCreateInventoryFoodPermit.fulfilled,
        (state, action) => {
          state.loading = false;
          state.submitSuccess = true;
        }
      )
      .addCase(InventoryCreateInventoryFoodPermit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update Food Permit
      .addCase(InventoryUpdateInventoryFoodPermit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        InventoryUpdateInventoryFoodPermit.fulfilled,
        (state, action) => {
          state.loading = false;
          state.submitSuccess = true;
        }
      )
      .addCase(InventoryUpdateInventoryFoodPermit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update other details
      .addCase(InventoryUpdateOtherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryUpdateOtherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryUpdateOtherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get by status bike
      .addCase(InventoryGetByStatusesBike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryGetByStatusesBike.fulfilled, (state, action) => {
        state.loading = false;
        state.getByStatus = action.payload;
        state.success = true;
      })
      .addCase(InventoryGetByStatusesBike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get by status sim

      .addCase(InventoryGetByStatusesSim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryGetByStatusesSim.fulfilled, (state, action) => {
        state.loading = false;
        state.getByStatusSim = action.payload;
        state.success = true;
      })
      .addCase(InventoryGetByStatusesSim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get by id
      .addCase(InventoryGetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(InventoryGetById.fulfilled, (state, action) => {
        state.getById = action.payload;
        state.loading = false;
      })
      .addCase(InventoryGetById.rejected, (state) => {
        state.loading = false;
      })
      // get by id sim
      .addCase(InventoryGetByIdSim.pending, (state) => {
        state.loading = true;
      })
      .addCase(InventoryGetByIdSim.fulfilled, (state, action) => {
        state.getByIdSim = action.payload;
        state.loading = false;
      })
      .addCase(InventoryGetByIdSim.rejected, (state) => {
        state.loading = false;
      })
      // get by id mulkiya
      .addCase(InventoryGetByIdMulkiya.pending, (state) => {
        state.loading = true;
      })
      .addCase(InventoryGetByIdMulkiya.fulfilled, (state, action) => {
        state.getByIdMulkiya = action.payload;
        state.loading = false;
      })
      .addCase(InventoryGetByIdMulkiya.rejected, (state) => {
        state.loading = false;
      })

      // get by id fod permit
      .addCase(InventoryGetByIdFoodPermit.pending, (state) => {
        state.loading = true;
      })
      .addCase(InventoryGetByIdFoodPermit.fulfilled, (state, action) => {
        state.getByIdFoodPermit = action.payload;
        state.loading = false;
      })
      .addCase(InventoryGetByIdFoodPermit.rejected, (state) => {
        state.loading = false;
      })

      // get by id insurance
      .addCase(InventoryGetByIdInsurance.pending, (state) => {
        state.loading = true;
      })
      .addCase(InventoryGetByIdInsurance.fulfilled, (state, action) => {
        state.getByIdInsurance = action.payload;
        state.loading = false;
      })
      .addCase(InventoryGetByIdInsurance.rejected, (state) => {
        state.loading = false;
      })
      // get by id contract
      .addCase(InventoryGetByIdContract.pending, (state) => {
        state.loading = true;
      })
      .addCase(InventoryGetByIdContract.fulfilled, (state, action) => {
        state.getByIdContract = action.payload;
        state.loading = false;
      })
      .addCase(InventoryGetByIdContract.rejected, (state) => {
        state.loading = false;
      })

      // delete mulkiya
      .addCase(InventoryDeleteMulkiya.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryDeleteMulkiya.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryDeleteMulkiya.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete food
      .addCase(InventoryDeleteFoodPermit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryDeleteFoodPermit.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryDeleteFoodPermit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete insurance
      .addCase(InventoryDeleteInsurance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryDeleteInsurance.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryDeleteInsurance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete contract
      .addCase(InventoryDeleteContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryDeleteContract.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryDeleteContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // create sim Info
      .addCase(InventoryCreateSimInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryCreateSimInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryCreateSimInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update sim Info
      .addCase(InventoryUpdateSimInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryUpdateSimInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryUpdateSimInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete bulk
      .addCase(InventoryDeleteMultiple.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryDeleteMultiple.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryDeleteMultiple.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update status multiple
      .addCase(InventoryUpdateStatusMultiple.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InventoryUpdateStatusMultiple.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(InventoryUpdateStatusMultiple.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess } = inventorySlice.actions;
export default inventorySlice.reducer;
