"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormTab from "./FormTab";
import { inventoryFormTab } from "@/utils/hard-data/inventoryFormTab";
import CustomButton from "@/components/shared-components/CustomButton";
import { ArrowBack, Close } from "@mui/icons-material";
import { Backpack, Check, CircleX } from "lucide-react";
import BikeInfoForm from "./BikeInfoForm";
import BikeMulkiyaForm from "./BikeMulkiyaForm";
import BikeInsuranceForm from "./BikeInsuranceForm";
import BikeContract from "./BikeContract";
import BikeFoodPermitForm from "./BikeFoodPermitForm";
import OtherDetailsForm from "./OtherDetailsForm";
import { useRouter } from "next/navigation";
import {
  GenericGetVendorContractDropdownVendorWise,
  GenericGetVendorDropdown,
  getByHeaderAndSectionAndKey,
  getCitiesByStatus,
  getCountriesByStatus,
  getPlatformDropdown,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import { useDispatch, useSelector } from "react-redux";

const AddInventorForm = ({
  formtabs,
  onClickTab,
  selectedTab,
  formMethods,
  onSubmit,
  handleNextClick,
  handleBackClick,
  editData,
  editMode,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [bikeTypeOptions, setBikeTypeOptions] = useState([]);
  const [filteredVendorOptions, setFilteredVendorOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);
  // Capture selected vendor from BikeInfoForm
  const selectedVendor = formMethods.watch("bikeInfo.vendorName");

  useEffect(() => {
    // Filter vendorOptions based on selectedVendor
    if (selectedVendor) {
      const filteredOptions = vendorOptions.filter(
        (vendor) => vendor.value === selectedVendor
      );
      setFilteredVendorOptions(filteredOptions);
    }
  }, [selectedVendor, vendorOptions]);

  const {
    platformOptionsData,
    getCountryByStatuses: countryData,
    getStateByStatuses: stateData,
    getCityByStatuses: cityData,
    vendorOptionsData: venderData,
    getGenericDropdowns: bikeTypeData,
    contractOptionsData: contractData,
  } = useSelector((state) => state?.dataBankSlice);

  // edit data country,state,city
  useEffect(() => {
    if (editData && editMode) {
      formMethods.setValue("regCountry", editData?.countryId || "");
      formMethods.setValue("regState", editData?.stateId || "");
      formMethods.setValue("regCity", editData?.city?.id || "");

      if (editData?.countryId) {
        dispatch(
          getStatesByStatus({
            statuses: 1,
            parentId: editData?.countryId,
          })
        );
      }
      if (editData?.stateId) {
        dispatch(
          getCitiesByStatus({ statuses: 1, parentId: editData.stateId })
        );
      }
    }
  }, [editData, formMethods, editMode, dispatch]);
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    dispatch(GenericGetVendorDropdown(params));
  }, [dispatch]);
  useEffect(() => {
    const params = { parentId: selectedVendor, statuses: 1 };
    if (selectedVendor) {
      dispatch(GenericGetVendorContractDropdownVendorWise(params));
    }
  }, [dispatch, selectedVendor]);
  useEffect(() => {
    dispatch(getCountriesByStatus({ page: 1, pageLength: 1000, statuses: 1 }));
    const sectionName = "Inventory";
    const sectionValue = "BikeType";
    dispatch(
      getByHeaderAndSectionAndKey({
        sectionName: sectionName, // Section name for filter2
        sectionValue: sectionValue, // Section value for filter3
      })
    );
    dispatch(getPlatformDropdown({ page: 1, pageLength: 1000, statuses: 1 }));
  }, [dispatch]);
  // Update country options
  useEffect(() => {
    if (countryData?.length > 0) {
      const formattedOptions = countryData.map((country) => ({
        value: country.id,
        label: country.countryName,
      }));
      setCountryOptions(formattedOptions);
    }
  }, [countryData]);
  // Bike type options
  useEffect(() => {
    if (bikeTypeData?.length > 0) {
      const formattedOptions = bikeTypeData.map((platform) => ({
        value: platform.value,
        label: platform.value,
      }));
      setBikeTypeOptions(formattedOptions);
    }
  }, [bikeTypeData]);
  // Fetch states based on selected country
  const handleCountryChange = (countryId) => {
    dispatch(
      getStatesByStatus({
        statuses: 1,
        parentId: countryId,
      })
    );
    formMethods.setValue("state", ""); // Reset state selection
    formMethods.setValue("city", ""); // Reset city selection
  };
  // Update state options
  useEffect(() => {
    if (stateData?.length > 0) {
      const formattedOptions = stateData.map((state) => ({
        value: state.id,
        label: state.stateName,
      }));
      setStateOptions(formattedOptions);
    }
  }, [stateData]);
  // Update city options
  useEffect(() => {
    if (cityData?.length > 0) {
      const formattedOptions = cityData.map((city) => ({
        value: city.id,
        label: city.cityName,
      }));
      setCityOptions(formattedOptions);
    }
  }, [cityData]);
  // Fetch cities based on selected state
  const handleStateChange = (stateId) => {
    dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
    formMethods.setValue("city", ""); // Reset city selection
  };
  useEffect(() => {
    if (venderData?.length > 0) {
      const formattedOptions = venderData?.map((platform) => ({
        value: platform.id,
        label: platform.vendorName,
      }));
      setVendorOptions(formattedOptions);
    }
  }, [venderData]);
  useEffect(() => {
    if (contractData?.length > 0) {
      const formattedOptions = contractData?.map((platform) => ({
        value: platform.id,
        label: platform.contractName,
      }));
      setContractOptions(formattedOptions);
    }
  }, [contractData]);
  // Update platform options
  useEffect(() => {
    if (platformOptionsData?.length > 0) {
      const formattedOptions = platformOptionsData.map((platform) => ({
        value: platform.id,
        label: platform.platformName,
      }));
      setPlatformOptions(formattedOptions);
    }
  }, [platformOptionsData]);
  return (
    <Box component="form" onSubmit={formMethods.handleSubmit(onSubmit)}>
      <Box
        component="div"
        sx={{
          display: "flex",
          gap: 2,
          borderBottom: "1px solid #2F2B3D40",
          pb: 2,
          pt: 4,
        }}
      >
        {formtabs?.length &&
          formtabs.map((tab) => (
            <FormTab
              key={tab.id}
              tab={tab}
              // onClickTab={onClickTab}
            />
          ))}
      </Box>
      {/* *****************************(Forms view)***************************************************************************************** */}
      <Box sx={{ width: "100%", my: 5 }}>
        {formtabs?.map((item) => {
          if (!item.isActive) return null;

          switch (item.text) {
            case "Bike Info":
              return (
                <BikeInfoForm
                  key={item.id}
                  control={formMethods?.control}
                  options={{
                    vendorOptions,
                    countryOptions,
                    stateOptions,
                    cityOptions,
                    bikeTypeOptions,
                  }}
                  onCountryChange={handleCountryChange}
                  onStateChange={handleStateChange}
                />
              );
            case "Bike Mulikya":
              return (
                <BikeMulkiyaForm key={item.id} control={formMethods?.control} />
              );
            case "Bike Insurance":
              return (
                <BikeInsuranceForm
                  key={item.id}
                  control={formMethods?.control}
                />
              );
            case "Bike Contract":
              return (
                <BikeContract
                  key={item.id}
                  control={formMethods?.control}
                  options={{
                    vendorOptions: filteredVendorOptions, // Pass filtered options
                    contractOptions,
                  }}
                />
              );
            case "Bike Food Permit":
              return (
                <BikeFoodPermitForm
                  key={item.id}
                  control={formMethods?.control}
                />
              );
            case "Other Details":
              return (
                <OtherDetailsForm
                  key={item.id}
                  control={formMethods?.control}
                  options={{
                    platformOptions,
                  }}
                />
              );
            default:
              return null;
          }
        })}
      </Box>
      {/* *************************************************(Actions)************************************************************************************ */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #2F2B3D40",
          pt: 2,
          pb: 4,
        }}
      >
        <CustomButton
          variant="outlined"
          bgColor="danger"
          startIcon={<CircleX size={20} />}
          onClick={() => router.push("/admin/inventory/inventory-list")}
        >
          Cancel
        </CustomButton>
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {selectedTab?.text !== "Bike Info" && (
            <CustomButton
              disabled={editMode ? true : false}
              startIcon={<ArrowBack size={20} />}
              bgColor="muted"
              onClick={handleBackClick}
            >
              Back
            </CustomButton>
          )}
          <CustomButton
            type="submit"
            endIcon={<Check size={20} />}
            onClick={handleNextClick}
          >
            {selectedTab?.text === "Other Details" ? "Save" : "Next"}
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddInventorForm;
