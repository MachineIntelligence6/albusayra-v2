import authReducer from "./reducers/auth/loginSlice";
import companySlice from "./reducers/companies/companySlice";
import dataBankSlice from "./reducers/dataBank/dataBankSlice";
import campaignSlice from "./reducers/campaign/campaignSlice";
import platformSlice from "./reducers/platform/platformSlice";
import vendorSlice from "./reducers/vendor/vendorSlice";
import applicantSlice from "./reducers/applicants/applicantSlice";
import vendorContractSlice from "./reducers/vendorContract/vendorContractSlice";
import inventorySlice from "./reducers/inventory/inventorySlice";
import employeeSlice from "./reducers/employees/employeeSlice";
import InventoryDashboardSlice from "./reducers/inventoryDashboard/inventoryDashboardSlice";
import countrySlice from "./reducers/country/countrySlice";

const rootSlices = {
  authReducer,
  companySlice,
  campaignSlice,
  dataBankSlice,
  platformSlice,
  vendorSlice,
  vendorContractSlice,
  applicantSlice,
  inventorySlice,
  employeeSlice,
  InventoryDashboardSlice,
  countrySlice,
};

export default rootSlices;
