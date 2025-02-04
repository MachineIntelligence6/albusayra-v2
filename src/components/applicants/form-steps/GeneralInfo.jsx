import React, { createElement, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CaptionText from "@/components/shared-components/CaptionText";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaignsOptions,
  getCitiesByStatus,
  getCountriesByStatus,
  getGenderByStatus,
  getPlatformDropdown,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import ImageUpload from "../ImageUpload";
import ImageUploadAndPreview from "@/components/shared-components/ImageUploadAndPreview";
import Loader from "@/utils/reusable-functions/Loader";
import { el } from "date-fns/locale";

export const GeneralInfo = ({
  control,
  isUaeResident,
  proceedDetails,
  createGeneralInfo,
}) => {
  const { setValue, reset } = useFormContext();
  const dispatch = useDispatch();

  const [campaignOptions, setCampaignOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);
  const [loaderFinal, setLoaderFinal] = useState(false);

  const {
    genderOptionsData,
    campaignOptionsData,
    platformOptionsData,
    getCountryByStatuses: countryData,
    getStateByStatuses: stateData,
    getCityByStatuses: cityData,
    // loadingFields,
  } = useSelector((state) => state.dataBankSlice);
  // const { loading } = useSelector((state) => state.applicantSlice);

  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    const paramsCampaign = {
      page: 1,
      pageLength: 1000,
      statuses: [1, 2],
      ...(proceedDetails === null && { filter2: "NotExpired" }),
    };

    dispatch(getCampaignsOptions(paramsCampaign));
    dispatch(getGenderByStatus(params));
    dispatch(getCountriesByStatus(params));
    dispatch(getPlatformDropdown(params));
  }, [dispatch, proceedDetails]);

  // Fetch states based on selected country
  const handleCountryChange = (countryId) => {
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

  // Update Campaigns options
  useEffect(() => {
    if (campaignOptionsData?.data?.length > 0) {
      const formattedOptions = campaignOptionsData?.data.map((campaign) => ({
        value: campaign.id,
        label: campaign.campaignName,
      }));
      setCampaignOptions(formattedOptions);
    }
  }, [campaignOptionsData]);

  // Update Genders options
  useEffect(() => {
    if (genderOptionsData && Array.isArray(genderOptionsData)) {
      const formattedOptions = genderOptionsData.map((gender) => ({
        value: gender.id,
        label: gender.genderName,
      }));
      setGenderOptions(formattedOptions);
    }
  }, [genderOptionsData]);

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

  const fields = [
    {
      label: "Campaign Name",
      name: "campaignName",
      required: false,
      options: campaignOptions,
    },
    {
      label: "UAE Residency/Iqama",
      name: "residency",
      placeholder: "Non UAE Resident",
      required: true,
      options: [
        { value: "Non UAE Resident", label: "Non UAE Resident" },
        { value: "UAE Resident", label: "UAE Resident" },
      ],
    },
    {
      label: `Full Name ${isUaeResident ? "As Per Emirates ID" : ""}`,
      name: "fullName",
      placeholder: "Enter your full name",
      required: true,
      component: CustomTextField,
    },
    {
      label: "Gender",
      name: "gender",
      required: true,
      options: genderOptions,
    },
    {
      label: "Employment Status",
      name: "employeeStatus",
      placeholder: "Full time",
      required: true,
      options: [
        { value: "Employed", label: "Employed" },
        { value: "Unemployed", label: "Unemployed" },
        // { value: "contractor", label: "Contractor" },
      ],
    },
    {
      label: "Preferred Working Country",
      name: "workingCountry",
      placeholder: "Select Country",
      required: true,
      component: CustomSelect,
      options: countryOptions,
      onChange: (e) => handleCountryChange(e.target.value),
    },
    {
      label: "Preferred Working State",
      name: "workingState",
      placeholder: "Select State",
      required: true,
      options: stateOptions,
      onChange: (e) => handleStateChange(e.target.value),
    },
    {
      label: "Preferred Working City",
      name: "workingCity",
      placeholder: "Select City",
      required: true,
      options: cityOptions,
    },
    ...(isUaeResident
      ? [
          {
            label: "Interested platform",
            name: "interestedplatform",
            required: true,
            placeholder: "Any",
            options: platformOptions,
          },
        ]
      : []),
    {
      label: "How Did You Learn About This Form?",
      name: "learnedFrom",
      required: true,
      options: [
        { value: "social", label: "Social Media" },
        { value: "friend", label: "Friend" },
        { value: "other", label: "Other" },
      ],
    },
    ...(isUaeResident
      ? [
          {
            label: "Will your company provide NOC",
            name: "companyprovideNOC",
            required: true,
            options: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
          },
        ]
      : []),
  ];

  // Update Data
  useEffect(() => {
    if (proceedDetails) {
      // Set other static values
      setValue("profileImage", proceedDetails?.image || "");
      setValue("fullName", proceedDetails?.fullName || "");
      setValue("campaignName", proceedDetails?.campaign?.id || "");
      setValue("residency", proceedDetails?.residentialStatus || "");
      setValue("gender", proceedDetails?.genderId || "");
      setValue("workingCountry", proceedDetails?.workingCountry?.id || "");
      setValue("workingState", proceedDetails?.workingState?.id || "");
      setValue("workingCity", proceedDetails?.workingCity?.id || "");
      setValue(
        "interestedplatform",
        proceedDetails?.interestedPlatform?.id || ""
      );
      setValue("employeeStatus", proceedDetails?.employmentStatus || "");
      setValue("learnedFrom", proceedDetails?.learnAboutForm || "");
      setValue(
        "companyprovideNOC",
        proceedDetails?.isNOC === true ? "Yes" : "No"
      );

      if (proceedDetails?.workingCountry?.id) {
        dispatch(
          getStatesByStatus({
            statuses: 1,
            parentId: proceedDetails?.workingCountry?.id,
          })
        );
      }
      if (proceedDetails?.workingState?.id) {
        dispatch(
          getCitiesByStatus({
            statuses: 1,
            parentId: proceedDetails.workingState?.id,
          })
        );
      }
    }
  }, [proceedDetails, dispatch]);

  // if (loadingFields && loading) {
  //   setLoaderFinal(true);
  // } else {
  //   setLoaderFinal(false);
  // }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <Controller
        name="profileImage"
        control={control}
        defaultValue={null}
        rules={{
          required: "Profile image is required",
          validate: {
            fileSize: (file) => {
              if (!file) return true;
              return (
                file.size <= 2 * 1024 * 1024 ||
                "File size must be less than 2MB"
              );
            },
            fileType: (file) => {
              if (!file) return true;
              return (
                ["image/jpeg", "image/png", "image/jpg"].includes(file.type) ||
                "Only JPG, JPEG & PNG files are allowed"
              );
            },
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <ImageUploadAndPreview
            onFileChange={(file) => {
              field.onChange(file);
              setValue("profileImage", file || proceedDetails?.image || "");
            }}
            error={error?.message}
            uploadedImage={field.value}
            buttonText="Upload Picture"
            maxSizeInMB={2}
            width="30%"
            allowedTypes={["image/jpeg", "image/png", "image/jpg"]}
          />
        )}
      /> */}

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
            component = CustomSelect,
            onChange,
          },
          index
        ) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Box sx={{ flex: "0 0 40%", textalign: "left" }}>
              <CaptionText text={label} required={required} />
            </Box>
            <Box sx={{ flex: "1", width: "80%" }}>
              <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) =>
                  createElement(component, {
                    ...field,
                    placeholder,
                    required,
                    options,
                    error,
                    onChange: (e) => {
                      field.onChange(e);
                      if (onChange) onChange(e);
                    },
                  })
                }
              />
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};
