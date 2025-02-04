import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Typography,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomTextField from "@/components/shared-components/CustomTextField";
import ImageUpload from "../applicants/ImageUpload";
import { CustomMultiSelect } from "../shared-components/CustomMultiSelect";
import CaptionText from "../shared-components/CaptionText";
import { useDispatch, useSelector } from "react-redux";
import {
  getByHeaderAndSectionAndKey,
  getCitiesByStatus,
  getCountriesByStatus,
  GenericGetUserRoleDropdown,
  getStatesByStatus,
  GenericGetCompanyDropdown,
} from "@/redux/reducers/dataBank/dataBankThunk";

export const AddUserInfoFields = ({ control }) => {
  const { setValue } = useFormContext();

  // const renderLabel = (label, required = false) => (
  //   <Typography
  //     variant="body1"
  //     component="span"
  //     sx={{
  //       fontSize: "16px",
  //       color: custom.primaryText,
  //       fontWeight: 500,
  //       lineHeight: "18px",
  //       textTransform: "capitalize",
  //     }}
  //   >
  //     {label}
  //     {required && (
  //       <Typography component="span" color="error">
  //         {" "}
  //         *
  //       </Typography>
  //     )}
  //   </Typography>
  // );

  const dispatch = useDispatch();

  const [UserTypeOptions, setUserTypeOptions] = useState([]);
  const [RoleOptions, setRoleOptions] = useState([]);
  const [CompaniesOption, setCompaniesOption] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const {
    getGenericDropdowns: userTypeData,
    getCountryByStatuses: countryData,
    getStateByStatuses: stateData,
    getCityByStatuses: cityData,
    getUserRolesData,
    getCompanyDropdownData,
  } = useSelector((state) => state.dataBankSlice);

  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    const sectionAndKey = {
      sectionName: "Users",
      sectionValue: "UserType",
    };
    dispatch(getByHeaderAndSectionAndKey(sectionAndKey));
    dispatch(getCountriesByStatus(params));
    dispatch(GenericGetUserRoleDropdown(params));
    dispatch(GenericGetCompanyDropdown(params));
  }, [dispatch]);

  // Fetch states based on selected country
  const handleCountryChange = (countryId) => {
    console.log("countryId", countryId);
    dispatch(
      getStatesByStatus({
        statuses: 1,
        parentId: countryId,
      })
    );
    setValue("state", ""); // Reset state selection
    setValue("city", ""); // Reset city selection
  };

  // Fetch cities based on selected state
  const handleStateChange = (stateId) => {
    dispatch(getCitiesByStatus({ statuses: 1, parentId: stateId }));
    setValue("city", ""); // Reset city selection
  };

  // Update User Type options
  useEffect(() => {
    if (userTypeData?.length > 0) {
      const formattedOptions = userTypeData.map((userType) => ({
        value: userType.id,
        label: userType.value,
      }));
      setUserTypeOptions(formattedOptions);
    }
  }, [userTypeData]);

  // Update User Roles options
  useEffect(() => {
    if (getUserRolesData?.length > 0) {
      const formattedOptions = getUserRolesData.map((userRoles) => ({
        value: userRoles.id,
        label: userRoles.roleName,
      }));
      setRoleOptions(formattedOptions);
    }
  }, [getUserRolesData]);

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

  // Update City options
  useEffect(() => {
    if (cityData?.length > 0) {
      const formattedOptions = cityData.map((city) => ({
        value: city.id,
        label: city.cityName,
      }));
      setCityOptions(formattedOptions);
    }
  }, [cityData]);

  // Update Companies options
  useEffect(() => {
    if (getCompanyDropdownData?.length > 0) {
      const formattedOptions = getCompanyDropdownData.map((company) => ({
        value: company.id,
        label: company.companyName,
      }));
      setCompaniesOption(formattedOptions);
    }
  }, [getCompanyDropdownData]);

  const fields = [
    {
      label: "User Type",
      name: "userType",
      required: true,
      options: UserTypeOptions,
    },
    {
      label: "Role",
      name: "role",
      required: true,
      options: RoleOptions,
    },
    {
      label: "Full Name",
      name: "fullName",
      required: true,
      placeholder: "Enter your full name",
      component: CustomTextField,
    },
    {
      label: "Email Address",
      name: "email",
      required: true,
      placeholder: "Enter your email address",
      component: CustomTextField,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      required: true,
      placeholder: "+971 123 456 7890",
      component: CustomTextField,
    },
    {
      label: "Country",
      name: "country",
      required: true,
      options: countryOptions,
      onChange: (e) => handleCountryChange(e.target.value),
    },
    {
      label: "State/Province",
      name: "state",
      required: true,
      options: stateOptions,
      onChange: (e) => handleStateChange(e.target.value),
    },
    {
      label: "City",
      name: "city",
      required: true,
      options: cityOptions,
    },
    {
      label: "Active",
      name: "active",
      required: true,
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      label: "Company",
      name: "company",
      required: true,
      isMultiSelect: true,
      options: CompaniesOption,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Controller
        name="profileImage"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <ImageUpload
            uploadedImage={field.value}
            onFileChange={(file) => setValue("profileImage", file)}
            error={error?.message || null}
          />
        )}
      />

      {fields.map(
        (
          {
            label,
            name,
            required,
            placeholder,
            options,
            isMultiSelect,
            component = CustomSelect,
            onChange,
          },
          index
        ) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Box
              sx={{ flex: "0 0 40%", textalign: "left", paddingRight: "1rem" }}
            >
              <CaptionText text={label} required />
            </Box>
            <Box sx={{ flex: "1", width: "80%" }}>
              <Controller
                name={name}
                control={control}
                defaultValue={isMultiSelect ? [] : ""}
                render={({ field, fieldState: { error } }) =>
                  isMultiSelect ? (
                    <CustomMultiSelect
                      options={options}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (onChange) onChange(e);
                      }}
                      placeholder="Select Campony"
                    />
                  ) : component === CustomSelect ? (
                    <CustomSelect
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (onChange) onChange(e);
                      }}
                      options={options}
                      error={error}
                    />
                  ) : (
                    <CustomTextField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={placeholder}
                      error={error}
                    />
                  )
                }
              />
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};
