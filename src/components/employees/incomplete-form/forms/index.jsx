"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormTab from "./FormTab";
import CustomButton from "@/components/shared-components/CustomButton";
import { ArrowBack } from "@mui/icons-material";
import { Check, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  GenericGetVendorDropdown,
  getByHeaderEMPOwnership,
  getByHeaderMaritalStatus,
  getByHeaderReligion,
  getByHeaderVisaType,
  getCityByCountryId,
  getCompanyByStatus,
  getCountriesByStatus,
  getGenderByStatus,
  GenericGetCompanyDropdown,
} from "@/redux/reducers/dataBank/dataBankThunk";
import { useDispatch, useSelector } from "react-redux";
import ContactResidence from "./ContactResidence";
import BasicInfo from "./BasicInfo";
import EmiratesId from "./EmiratesId";
import DrivingLicense from "./DrivingLicense";
import Passport from "./Passport";
import Visa from "./Visa";
import Insurance from "./Insurance";
import OtherDetails from "./OtherDetails";
import { getCompanyById } from "@/redux/reducers/companies/companyThunk";

const AddInCompleteEmployeeForm = ({
  formtabs,
  onClickTab,
  selectedTab,
  formMethods,
  onSubmit,
  handleNextClick,
  handleBackClick,
  editData,
  editMode,
  tabParam,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [maritalStatusOptions, setMaritalStatusOptions] = useState([]);
  const [religionOptions, setReligionOptions] = useState([]);
  const [visaTypeOptions, setVisaTypeOptions] = useState([]);
  const [EMPOwnership, setEMPOwnership] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [companyLocationOptions, setCompanyLocationOptions] = useState([]);
  const {
    getCountryByStatuses: countryData,
    getCityByCountry: cityData,
    genderOptionsData: genderData,
    vendorOptionsData: vendorData,
    maritalStatusData,
    religionData,
    visaTypeData,
    EMPOwnershipData,
    getCompanyDropdownData,
  } = useSelector((state) => state?.dataBankSlice);
  const { getDataById } = useSelector((state) => state.companySlice);

  // All DropDowns
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    dispatch(getCountriesByStatus(params));
    dispatch(getGenderByStatus(params));
    // dispatch(getCompanyByStatus(params));
    dispatch(GenericGetVendorDropdown(params));
    dispatch(GenericGetCompanyDropdown(params));
  }, [dispatch]);

  // GenericHeaderAndSectionAndKey
  useEffect(() => {
    const sectionName = "Employee";
    const sectionValueMaritalStatus = "MaritalStatus";
    const sectionValueReligion = "Religion";
    const sectionValueVisaType = "VisaType";
    const sectionValueEMPOwnership = "EMPOwnership";

    dispatch(
      getByHeaderMaritalStatus({
        sectionName: sectionName,
        sectionValue: sectionValueMaritalStatus,
      })
    );

    dispatch(
      getByHeaderReligion({
        sectionName: sectionName,
        sectionValue: sectionValueReligion,
      })
    );

    dispatch(
      getByHeaderVisaType({
        sectionName: sectionName,
        sectionValue: sectionValueVisaType,
      })
    );

    dispatch(
      getByHeaderEMPOwnership({
        sectionName: sectionName,
        sectionValue: sectionValueEMPOwnership,
      })
    );
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

  // Update gender options
  useEffect(() => {
    if (genderData?.length > 0) {
      const formattedOptions = genderData.map((gender) => ({
        value: gender.id,
        label: gender.genderName,
      }));
      setGenderOptions(formattedOptions);
    }
  }, [genderData]);

  // Update Marital Status options
  useEffect(() => {
    if (maritalStatusData?.length > 0) {
      const formattedOptions = maritalStatusData.map((maritalStatus) => ({
        value: maritalStatus?.value,
        label: maritalStatus?.value,
      }));
      setMaritalStatusOptions(formattedOptions);
    }
  }, [maritalStatusData]);

  // Update Religions options
  useEffect(() => {
    if (religionData?.length > 0) {
      const formattedOptions = religionData.map((religion) => ({
        value: religion?.value,
        label: religion?.value,
      }));
      setReligionOptions(formattedOptions);
    }
  }, [religionData]);

  // Update Visa Type options
  useEffect(() => {
    if (visaTypeData?.length > 0) {
      const formattedOptions = visaTypeData.map((visaType) => ({
        value: visaType?.value,
        label: visaType?.value,
      }));
      setVisaTypeOptions(formattedOptions);
    }
  }, [visaTypeData]);

  // Update EMPOwnership options
  useEffect(() => {
    if (EMPOwnershipData?.length > 0) {
      const formattedOptions = EMPOwnershipData.map((EMPOwnership) => ({
        value: EMPOwnership?.value,
        label: EMPOwnership?.value,
      }));
      setEMPOwnership(formattedOptions);
    }
  }, [EMPOwnershipData]);

  // Update company options
  useEffect(() => {
    if (getCompanyDropdownData?.length > 0) {
      const formattedOptions = getCompanyDropdownData.map((company) => ({
        value: company?.id,
        label: company?.companyName,
      }));
      setCompanyName(formattedOptions);
    }
  }, [getCompanyDropdownData]);

  // Update vendor options
  useEffect(() => {
    if (vendorData?.length > 0) {
      const formattedOptions = vendorData.map((vendor) => ({
        value: vendor?.id,
        label: vendor?.vendorName,
      }));
      setVendorOptions(formattedOptions);
    }
  }, [vendorData]);
  // Update company location options

  useEffect(() => {
    if (getDataById?.listCompanyLocation?.length > 0) {
      const formattedOptions = getDataById.listCompanyLocation?.map((val) => ({
        value: val?.id,
        label: val?.city?.cityName,
      }));
      setCompanyLocationOptions(formattedOptions);
    }
  }, [getDataById]);

  const handleCountryChange = (countryId) => {
    dispatch(
      getCityByCountryId({
        statuses: 1,
        parentId: countryId,
      })
    );
  };
  const handleCompanyChange = (companyId) => {
    dispatch(getCompanyById(companyId));
  };
  useEffect(() => {
    if (editData && editMode) {
      formMethods.setValue("city", editData?.emergencyCityId || "");
      formMethods.setValue(
        "companyLocation",
        editData?.companyLocationId || ""
      );
      if (editData?.emergencyCityId) {
        dispatch(
          getCityByCountryId({
            statuses: 1,
            parentId: editData.emergencyCountryId,
          })
        );
      }
      if (editData?.companyId) {
        dispatch(getCompanyById(editData?.companyId));
      }
    }
  }, [editData, formMethods, editMode, dispatch]);
  const handleClick = (tab) => {
    if (!tabParam) {
      onClickTab(tab);
    }
  };
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
            <FormTab key={tab.id} tab={tab} onClickTab={handleClick} />
          ))}
      </Box>
      {/* *****************************(Forms view)***************************************************************************************** */}
      <Box sx={{ width: "100%", my: 5 }}>
        {formtabs?.map((item) => {
          if (!item.isActive) return null;

          switch (item.text) {
            case "Basic Info":
              return (
                <BasicInfo
                  key={item.id}
                  control={formMethods?.control}
                  options={{
                    genderOptions,
                    maritalStatusOptions,
                    religionOptions,
                  }}
                />
              );
            case "Contact Residence":
              return (
                <ContactResidence
                  key={item.id}
                  control={formMethods?.control}
                  options={{
                    countryOptions,
                    cityOptions,
                  }}
                  onCountryChange={handleCountryChange}
                />
              );
            case "Emirates ID":
              return (
                <EmiratesId key={item.id} control={formMethods?.control} />
              );
            case "Driving License":
              return (
                <DrivingLicense
                  key={item.id}
                  control={formMethods?.control}
                  options={{}}
                />
              );
            case "Passport":
              return <Passport key={item.id} control={formMethods?.control} />;
            case "Visa":
              return (
                <Visa
                  key={item.id}
                  control={formMethods?.control}
                  options={{
                    visaTypeOptions,
                    companyName,
                    companyLocationOptions,
                  }}
                  onCompanyChange={handleCompanyChange}
                  editData={editData}
                />
              );
            case "Insurance":
              return <Insurance key={item.id} control={formMethods?.control} />;
            case "Other Details":
              return (
                <OtherDetails
                  key={item.id}
                  control={formMethods?.control}
                  options={{ vendorOptions, EMPOwnership }}
                  editData={editData}
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
          onClick={() => router.push("/admin/employees/incomplete-profile")}
        >
          Cancel
        </CustomButton>
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {selectedTab?.text !== "Basic Info" && (
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

export default AddInCompleteEmployeeForm;
