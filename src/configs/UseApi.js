import authConfigs from "./authConfigs";

//URL setting (dev, staging, local)
const environment = "dev";

const BaseURL =
  environment === "dev"
    ? "https://dev-api.abds.channelhub.ai/"
    : environment === "staging"
    ? "https://staging-api.abds.channelhub.ai/"
    : environment === "local"
    ? "http://localhost/3000"
    : "https://dev-api.abds.channelhub.ai/";

export const API_URL = `${BaseURL}v1/`;
export const Api_Key = "SuperSecureJWTSecretKey@1234567890!@#$%^&*()";
export const userToken =
  typeof window !== "undefined" &&
  window.localStorage.getItem(authConfigs?.userToken);
const userString = JSON.parse(
  typeof window !== "undefined" &&
    window.localStorage.getItem(authConfigs?.userData)
);
export const UserData = userString ? JSON.parse(userString?.JsonString) : "";

// console.log("userToken", userToken);

export const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
      "X-Api-Key": Api_Key,
    },
  };
};

// console.log("userToken", userToken);

export const multiPartConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data",
      "X-Api-Key": Api_Key,
    },
  };
};

export const endpoints = {
  // Auth
  loginUser: "Users/Login",
  verifyOtp: "Users/UserCodeVerification",
  sendOtpAgainRequest: "Users/GenerateUserVerificationCode",
  forgotPassword: "Users/ForgetPassword",
  setNewPassword: "Users/ChangePassword",
  getCampaignStatusById: "Campaign/GetCampaignById",

  // DataBank
  getIndustriesByStatus: "Industry/GetByStatuses",
  getCountriesByStatus: "Generic/GetCountryDropdown",
  getStatesByStatus: "Generic/GetStateDropdownCountryWise",
  getCitiesByStatus: "Generic/GetCityDropdownStateWise",
  getCityByCountryId: "Generic/GetCityDropdownCountryWise",
  getByHeaderAndSectionAndKey: "Generic/GetByHeaderAndSectionAndKey",
  getGenderByStatus: "Generic/GetGenderDropdown",
  getPlatformDropdown: "Generic/GetPlatformDropdown",
  UpdateStatusMultiple: "Employee/UpdateStatusMultiple",
  GenericGetVendorDropdown: "Generic/GetVendorDropdown",
  GenericGetVendorContractDropdownVendorWise:
    "Generic/GetVendorContractDropdownVendorWise",
  GenericGetProductCategoryDropdown: "Generic/GetProductCategoryDropdown",
  GenericGetCompanyDropdown: "Generic/GetCompanyDropdown",
  GenericGetUserRoleDropdown: "Generic/GetUserRoleDropdown",
  GenericGetAdvancefilterDropdown: "Generic/GetAdvancefilterDropdown",

  // Company
  createCompany: "Company/Create",
  getCompanyByStatus: "Company/GetByStatuses",
  getCompanyById: "Company/GetById",
  updateCompany: "Company/Update",
  updateCompanyStatusOnly: "Company/UpdateStatus",
  deleteCompanyById: "Company/Delete",

  // Campaign
  createCampaign: "Campaign/Create",
  updateCampaign: "Campaign/Update",
  updateCampaignStatusOnly: "Campaign/UpdateStatus",
  getCampaignByStatus: "Campaign/GetByStatuses",
  getCampaignById: "Campaign/GetById",
  deleteCampaignById: "Campaign/Delete",
  ExportCampaignByStatus: "Campaign/ExportCampaignByStatus",

  // Employee -- Applicant
  registerEmployeeCampaign: "Employee/Create",
  getCampaignListByStatus: "Employee/GetByStatuses",
  ApplicantGetById: "Employee/GetById",
  changeUserStatus: "Employee/UpdateStatus",

  // Employee -- Final/Short
  CreateApplicantGeneraInfo: "Employee/CreateApplicant",
  UpdateApplicantGeneraInfo: "Employee/UpdateGeneraInfo",
  UpdateApplicantContactInfo: "Employee/UpdateContactInfo",
  UpdateApplicantEmiratesInfo: "Employee/UpdateEmiratesInfo",
  UpdateApplicantLicenseInfo: "Employee/UpdateLicenseInfo",
  UpdateApplicantPassportInfo: "Employee/UpdatePassportInfo",
  UpdateApplicantUpdateReferralInfo: "Employee/UpdateReferralInfo",
  ExportEmployeeByStatus: "Employee/ExportEmployeeByStatus",

  // Employee -- Incomplete/Active
  UpdateFinalGeneralInfo: "Employee/UpdateFinalGeneralInfo",
  UpdateFinalContactInfo: "Employee/UpdateFinalContactInfo",
  UpdateFinalEmiratesInfo: "Employee/UpdateFinalEmiratesInfo",
  UpdateFinalLicenseInfo: "Employee/UpdateFinalLicenseInfo",
  UpdateFinalPassportInfo: "Employee/UpdateFinalPassportInfo",
  UpdateFinalVisaInfo: "Employee/UpdateFinalVisaInfo",
  UpdateFinalInsuranceInfo: "Employee/UpdateFinalInsuranceInfo",
  UpdateFinalOtherDetailsInfo: "Employee/UpdateFinalOtherDetailsInfo",
  EmployeeGetByStatuses: "Employee/GetByStatuses",
  EmployeeGetByIdEmiratesHistory: "Employee/GetByIdEmiratesHistory",
  EmployeeGetByIdLicenseHistory: "Employee/GetByIdLicenseHistory",
  EmployeeGetByIdPassportHistory: "Employee/GetByIdPassportHistory",
  EmployeeGetByIdVisaHistory: "Employee/GetByIdVisaHistory",
  EmployeeGetByIdInsuranceHistory: "Employee/GetByIdInsuranceHistory",

  //platform
  PlatformCreate: "Platform/Create",
  PlatformUpdate: "Platform/Update",
  PlatformDelete: "Platform/Delete",
  PlatformGetByStatus: "Platform/GetByStatuses",
  PlatformGetById: "Platform/GetById",
  PlatformUpdateStatus: "Platform/UpdateStatus",

  //vendors
  VendorCreate: "Vendor/Create",
  VendorUpdate: "Vendor/Update",
  VendorDelete: "Vendor/Delete",
  VendorGetByStatus: "Vendor/GetByStatuses",
  VendorGetById: "Vendor/GetById",

  // Vendor Contract
  VendorContractCreate: "VendorContract/Create",
  VendorContractUpdate: "VendorContract/Update",
  VendorContractDelete: "VendorContract/Delete",
  VendorContractGetByStatus: "VendorContract/GetByStatuses",
  VendorContractGetById: "VendorContract/GetById",

  // Inventory
  InventoryCreateBikeInfo: "Inventory/CreateBikeInfo",
  InventoryCreateInventoryMulkiya: "Inventory/CreateInventoryMulkiya",
  InventoryCreateInventoryInsurance: "Inventory/CreateInventoryInsurance",
  InventoryCreateInventoryContract: "Inventory/CreateInventoryContract",
  InventoryCreateInventoryFoodPermit: "Inventory/CreateInventoryFoodPermit",
  InventoryUpdateOtherDetails: "Inventory/UpdateOtherDetails",
  InventoryGetByStatusesBike: "Inventory/GetByStatusesBike",
  InventoryGetByStatusesSim: "Inventory/GetByStatusesSim",
  InventoryGetById: "Inventory/GetById",
  InventoryGetByIdSim: "Inventory/GetByIdSim",
  InventoryUpdateBikeInfo: "Inventory/UpdateBikeInfo",
  // mulkiya:
  InventoryGetByIdMulkiya: "Inventory/GetByIdMulkiya",
  InventoryUpdateInventoryMulkiya: "Inventory/UpdateInventoryMulkiya",
  InventoryDeleteMulkiya: "Inventory/DeleteMulkiya",
  // food permit:
  InventoryGetByIdFoodPermit: "Inventory/GetByIdFoodPermit",
  InventoryUpdateInventoryFoodPermit: "Inventory/UpdateInventoryFoodPermit",
  InventoryDeleteFoodPermit: "Inventory/DeleteFoodPermit",
  // insurance:
  InventoryGetByIdInsurance: "Inventory/GetByIdInsurance",
  InventoryUpdateInventoryInsurance: "Inventory/UpdateInventoryInsurance",
  InventoryDeleteInsurance: "Inventory/DeleteInsurance",
  // contract:
  InventoryGetByIdContract: "Inventory/GetByIdContract",
  InventoryUpdateInventoryContract: "Inventory/UpdateInventoryContract",
  InventoryDeleteContract: "Inventory/DeleteContract",
  // sim:
  InventoryCreateSimInfo: "Inventory/CreateSimInfo",
  InventoryUpdateSimInfo: "Inventory/UpdateSimInfo",
  // export
  InventoryExportInventoryListBike: "Inventory/ExportInventoryListBike",
  InventoryExportInventoryListSim: "Inventory/ExportInventoryListSim",
  InventoryDownloadBikeInfoTemplate: "Inventory/DownloadBikeInfoTemplate",
  InventoryDownloadSimInfoTemplate: "Inventory/DownloadSimInfoTemplate",
  // upload
  InventoryUploadBulkBikeInfo: "Inventory/UploadBulkBikeInfo",
  InventoryUploadBulkSimInfo: "Inventory/UploadBulkSimInfo",
  // delete bulk
  InventoryDeleteMultiple: "Inventory/DeleteMultiple",
  InventoryUpdateStatusMultiple: "Inventory/UpdateStatusMultiple",
  // Inventory dashboard
  InventoryDashboardGetBikeCounters: "InventoryDashboard/GetBikeCounters",
  InventoryDashboardGetBikeByStatusVendorWise:
    "InventoryDashboard/GetBikeByStatusVendorWise",
  InventoryDashboardGetBikeByStatusCompanyWise:
    "InventoryDashboard/GetBikeByStatusCompanyWise",
  // Country
  CountriesCreate: "Countries/Create",
  CountriesUpdate: "Countries/Update",
  CountriesDelete: "Countries/Delete",
  CountriesGetByStatuses: "Countries/GetByStatuses",
  CountriesGetById: "Countries/GetById",
};
