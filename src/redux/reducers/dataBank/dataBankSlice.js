import { createSlice } from "@reduxjs/toolkit";
import {
  GenericGetCompanyDropdown,
  GenericGetProductCategoryDropdown,
  GenericGetVendorContractDropdownVendorWise,
  GenericGetVendorDropdown,
  getByHeaderAndSectionAndKey,
  getByHeaderEMPOwnership,
  getByHeaderMaritalStatus,
  getByHeaderReligion,
  getByHeaderVisaType,
  getCampaignsInFilter,
  getCampaignsOptions,
  getCitiesByStatus,
  getCityByCountryId,
  getCompanyByStatus,
  getCountriesByStatus,
  getGenderByStatus,
  getIndustriesByStatus,
  getPlatformDropdown,
  GenericGetUserRoleDropdown,
  getStatesByStatus,
  UpdateStatusMultiple,
  GenericGetAdvancefilterDropdown,
} from "./dataBankThunk";

export const dataBankSlice = createSlice({
  name: "dataBankSlice",
  initialState: {
    getIndustryByStatuses: [],
    getCountryByStatuses: [],
    getStateByStatuses: [],
    getCityByStatuses: [],
    getCityByCountry: [],
    getGenericDropdowns: [],
    genderOptionsData: [],
    campaignOptionsData: [],
    campaignFilterData: [],
    platformOptionsData: [],
    statusChangeSuccessBulk: false,
    vendorOptionsData: [],
    contractOptionsData: [],
    productCategoryData: [],
    maritalStatusData: [],
    religionData: [],
    visaTypeData: [],
    EMPOwnershipData: [],
    companyData: [],
    getCompanyDropdownData: [],
    getUserRolesData: [],
    advanceFilterDropdownData: [],
    loadingFields: false,
    success: false,
    error: null,
  },
  reducers: {
    updateSuccess: (state) => {
      state.statusChangeSuccessBulk = false;
      state.loadingFields = false;
      state.success = false;
      state.error = null;
    },
    updateSuccessBank: (state) => {
      state.statusChangeSuccessBulk = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // getIndustriesByStatus
      .addCase(getIndustriesByStatus.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getIndustriesByStatus.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getIndustryByStatuses = action.payload;
        state.success = true;
      })
      .addCase(getIndustriesByStatus.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getCountriesByStatus
      .addCase(getCountriesByStatus.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getCountriesByStatus.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getCountryByStatuses = action.payload;
        state.success = true;
      })
      .addCase(getCountriesByStatus.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getStatesByStatus
      .addCase(getStatesByStatus.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getStatesByStatus.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getStateByStatuses = action.payload;
        state.success = true;
      })
      .addCase(getStatesByStatus.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getCitiesByStatus
      .addCase(getCitiesByStatus.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getCitiesByStatus.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getCityByStatuses = action.payload;
        state.success = true;
      })
      .addCase(getCitiesByStatus.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getCityByCountryId
      .addCase(getCityByCountryId.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getCityByCountryId.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getCityByCountry = action.payload;
        state.success = true;
      })
      .addCase(getCityByCountryId.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getByHeaderAndSectionAndKey
      .addCase(getByHeaderAndSectionAndKey.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getByHeaderAndSectionAndKey.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getGenericDropdowns = action.payload;
        state.success = true;
      })
      .addCase(getByHeaderAndSectionAndKey.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getByHeaderMaritalStatus
      .addCase(getByHeaderMaritalStatus.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getByHeaderMaritalStatus.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.maritalStatusData = action.payload;
        state.success = true;
      })
      .addCase(getByHeaderMaritalStatus.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getByHeaderReligion
      .addCase(getByHeaderReligion.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getByHeaderReligion.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.religionData = action.payload;
        state.success = true;
      })
      .addCase(getByHeaderReligion.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getByHeaderVisaType
      .addCase(getByHeaderVisaType.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getByHeaderVisaType.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.visaTypeData = action.payload;
        state.success = true;
      })
      .addCase(getByHeaderVisaType.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getByHeaderEMPOwnership
      .addCase(getByHeaderEMPOwnership.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getByHeaderEMPOwnership.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.EMPOwnershipData = action.payload;
        state.success = true;
      })
      .addCase(getByHeaderEMPOwnership.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getGenderByStatus
      .addCase(getGenderByStatus.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getGenderByStatus.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.genderOptionsData = action.payload;
        state.success = true;
      })
      .addCase(getGenderByStatus.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getCompanyByStatus
      .addCase(getCompanyByStatus.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getCompanyByStatus.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.companyData = action.payload;
        state.success = true;
      })
      .addCase(getCompanyByStatus.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getCampaignsOptions
      .addCase(getCampaignsOptions.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getCampaignsOptions.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.campaignOptionsData = action.payload;
        state.success = true;
      })
      .addCase(getCampaignsOptions.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getCampaignsInFilter
      .addCase(getCampaignsInFilter.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getCampaignsInFilter.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.campaignFilterData = action.payload;
        state.success = true;
      })
      .addCase(getCampaignsInFilter.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // getPlatformDropdown
      .addCase(getPlatformDropdown.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(getPlatformDropdown.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.platformOptionsData = action.payload;
        state.success = true;
      })
      .addCase(getPlatformDropdown.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getVendorDropdown
      .addCase(GenericGetVendorDropdown.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GenericGetVendorDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorOptionsData = action.payload;
        state.success = true;
      })
      .addCase(GenericGetVendorDropdown.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getVendorDropdown
      .addCase(GenericGetVendorContractDropdownVendorWise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        GenericGetVendorContractDropdownVendorWise.fulfilled,
        (state, action) => {
          state.loading = false;
          state.contractOptionsData = action.payload;
          state.success = true;
        }
      )
      .addCase(
        GenericGetVendorContractDropdownVendorWise.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // getProductCategoryDropdown
      .addCase(GenericGetProductCategoryDropdown.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GenericGetProductCategoryDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategoryData = action.payload;
        state.success = true;
      })
      .addCase(GenericGetProductCategoryDropdown.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // UpdateStatusMultiple
      .addCase(UpdateStatusMultiple.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(UpdateStatusMultiple.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.statusChangeSuccessBulk = true;
      })
      .addCase(UpdateStatusMultiple.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // get Generic Get Company Dropdown
      .addCase(GenericGetCompanyDropdown.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(GenericGetCompanyDropdown.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getCompanyDropdownData = action.payload;
        state.success = true;
      })
      .addCase(GenericGetCompanyDropdown.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // get GenericGetUserRoleDropdown
      .addCase(GenericGetUserRoleDropdown.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(GenericGetUserRoleDropdown.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.getUserRolesData = action.payload;
        state.success = true;
      })
      .addCase(GenericGetUserRoleDropdown.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      })

      // get GenericGetAdvancefilterDropdown
      .addCase(GenericGetAdvancefilterDropdown.pending, (state) => {
        state.loadingFields = true;
        state.error = null;
      })
      .addCase(GenericGetAdvancefilterDropdown.fulfilled, (state, action) => {
        state.loadingFields = false;
        state.advanceFilterDropdownData = action.payload;
        state.success = true;
      })
      .addCase(GenericGetAdvancefilterDropdown.rejected, (state, action) => {
        state.loadingFields = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { updateSuccess, updateSuccessBank } = dataBankSlice.actions;
export default dataBankSlice.reducer;
