import React, { createElement, useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Divider, Paper, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
// import { GeneralInfoSchema } from "@/utils/schemas/generalInformation";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CaptionText from "@/components/shared-components/CaptionText";
import {
  ApplicantGetById,
  UpdateApplicantGeneraInfo,
} from "@/redux/reducers/applicants/applicantThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaignsOptions,
  getCitiesByStatus,
  getCountriesByStatus,
  getGenderByStatus,
  getPlatformDropdown,
  getStatesByStatus,
} from "@/redux/reducers/dataBank/dataBankThunk";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { UserData } from "@/configs/UseApi";

export default function GeneralEditForm({
  handleCloseGeneralInfoModal,
  isUaeResident,
  setIsUaeResident,
  EditingData,
}) {
  const GeneralInfoSchema = Yup.object().shape({
    campaignName: Yup.string().required("Campaign Name is required"),
    residency: Yup.string().required("Residency status is required"),
    fullName: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    employeeStatus: Yup.string().required("Employment Status is required"),
    workingCountry: Yup.string().required(
      "Preferred Working Country is required"
    ),
    workingState: Yup.string().required("Preferred Working State is required"),
    workingCity: Yup.string().required("Preferred Working City is required"),
    interestedplatform: Yup.string().when("residency", {
      is: "UAE Resident",
      then: (schema) =>
        schema.required("This field is required for UAE residents"),
      otherwise: (schema) => schema.notRequired(),
    }),
    learnedFrom: Yup.string().required(
      "Please specify how you learned about this form"
    ),
    companyprovideNOC: Yup.string().when("residency", {
      is: "UAE Resident",
      then: (schema) =>
        schema.required("This field is required for UAE residents"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(GeneralInfoSchema),
    mode: "onChange",
    defaultValues: {
      campaignName: "",
      residency: "",
      fullName: "",
      gender: "",
      employeeStatus: "",
      workingCountry: "",
      workingCity: "",
      interestedplatform: "",
      learnedFrom: "",
      companyprovideNOC: "",
      profileImage: "",
    },
  });

  const dispatch = useDispatch();

  const { trigger, watch, control, setValue } = methods;
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);
  const {
    genderOptionsData,
    campaignOptionsData,
    platformOptionsData,
    getCountryByStatuses: countryData,
    getStateByStatuses: stateData,
    getCityByStatuses: cityData,
  } = useSelector((state) => state.dataBankSlice);

  const watchedResidency = watch("residency");
  useEffect(() => {
    setIsUaeResident(watchedResidency === "UAE Resident");
  }, [watchedResidency]);

  // Get Campaigns, Genders, Countries
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    const paramsCampaign = {
      page: 1,
      pageLength: 1000,
      statuses: [1, 2],
    };
    dispatch(getCampaignsOptions(paramsCampaign));
    dispatch(getGenderByStatus(params));
    dispatch(getCountriesByStatus(params));
    dispatch(getPlatformDropdown(params));
  }, [dispatch]);

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
      console.log("formattedOptions", formattedOptions);
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

  console.log("campaignOptions", campaignOptions);
  console.log("campaignOptionsData", campaignOptionsData);

  const fields = [
    {
      label: "Campaign Name",
      name: "campaignName",
      required: true,
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
      label: `Full Name ${isUaeResident ? "as per emirates iD" : ""}`,
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
        { value: "fullTime", label: "Full Time" },
        { value: "partTime", label: "Part Time" },
        { value: "contractor", label: "Contractor" },
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
      placeholder: "UAE",
      required: true,
      options: stateOptions,
      onChange: (e) => handleStateChange(e.target.value),
    },
    {
      label: "Preferred Working City",
      name: "workingCity",
      placeholder: "Dubai",
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

  const stepFields = {
    0: [
      "campaignName",
      "residency",
      "fullName",
      "gender",
      "employeeStatus",
      "workingCountry",
      "workingCity",
      "interestedplatform",
      "learnedFrom",
      "companyprovideNOC",
    ],
  };

  const handleSave = async () => {
    console.log("Validated fields:", stepFields[0]); // Debugging
    const isValid = await trigger(stepFields[0]);
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors); // Log errors for debugging
    }
  };

  // const searchParams = useSearchParams();
  // const applicantId = searchParams.get("id");
  // const { proceedDetails: EditingData, submitApplicantSuccess } = useSelector(
  //   (state) => state.applicantSlice
  // );

  // useEffect(() => {
  //   if (applicantId) {
  //     dispatch(ApplicantGetById({ id: applicantId }));
  //   }
  // }, [dispatch, applicantId, submitApplicantSuccess]);

  const onSubmit = (data) => {
    console.log("General Tab Data", data);

    if (EditingData !== null) {
      const formData = new FormData();
      formData.append("Image", watch("profileImage"));
      formData.append("CampaignId", watch("campaignName"));
      formData.append("ResidentialStatus", watch("residency"));
      formData.append("FullName", watch("fullName"));
      formData.append("GenderId", watch("gender"));
      formData.append("EmploymentStatus", watch("employeeStatus"));
      formData.append("WorkingCountryId", watch("workingCountry"));
      formData.append("WorkingStateId", watch("workingState"));
      formData.append("WorkingCityId", watch("workingCity"));
      formData.append("InterestedPlatformId", watch("interestedplatform"));
      formData.append("LearnAboutForm", watch("learnedFrom"));
      formData.append(
        "IsNOC",
        watch("companyprovideNOC") === "Yes" ? true : false
      );
      formData.append("Status", 10);

      formData.append("UpdatedBy", UserData?.Id);
      formData.append("Id", EditingData?.id);
      dispatch(UpdateApplicantGeneraInfo(formData)).then(() => {
        handleCloseGeneralInfoModal();
      });
    }
  };

  // Update Data
  useEffect(() => {
    if (EditingData) {
      setValue("profileImage", EditingData?.image || "");
      setValue("fullName", EditingData?.fullName || "");
      setValue("campaignName", EditingData?.campaign?.id || "");
      setValue("residency", EditingData?.residentialStatus || "");
      setValue("gender", EditingData?.genderId || "");
      setValue("workingCountry", EditingData?.workingCountry?.id || "");
      setValue("workingState", EditingData?.workingState?.id || "");
      setValue("workingCity", EditingData?.workingCity?.id || "");
      setValue("interestedplatform", EditingData?.interestedPlatform?.id || "");
      setValue("employeeStatus", EditingData?.employmentStatus || "");
      setValue("learnedFrom", EditingData?.learnAboutForm || "");
      setValue("companyprovideNOC", EditingData?.isNOC === true ? "Yes" : "No");
      if (EditingData?.workingCountry?.id) {
        dispatch(
          getStatesByStatus({
            statuses: 1,
            parentId: EditingData?.workingCountry?.id,
          })
        );
      }
      if (EditingData?.workingState?.id) {
        dispatch(
          getCitiesByStatus({
            statuses: 1,
            parentId: EditingData?.workingState?.id,
          })
        );
      }
    }
  }, [EditingData, dispatch, setValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h6" mb="3em">
          GENERAL INFORMATION
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* {fields.map(
                (
                  {
                    label,
                    name,
                    required,
                    placeholder,
                    options,
                    component = CustomSelect,

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
                    <Box
                      sx={{
                        flex: "0 0 40%",
                        textalign: "left",
                        paddingRight: "1rem",
                      }}
                    >
                      <CaptionText text={label} required />
                    </Box>
                    <Box sx={{ flex: "1", width: "80%" }}>
                      <Controller
                        name={name}
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) =>
                          createElement(component, {
                            value: field.value,
                            onChange: field.onChange,
                            placeholder,
                            options,
                            error,
                          })
                        }
                      />
                    </Box>
                  </Box>
                )
              )} */}

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
                      <CaptionText text={label} required />
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
            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <CustomButton
                variant="outlined"
                bgColor="danger"
                onClick={() => handleCloseGeneralInfoModal()}
                startIcon={<CancelIcon />}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="contained"
                onClick={handleSave}
                endIcon={<DoneIcon sx={{ width: "15px" }} />}
              >
                Save
              </CustomButton>
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </LocalizationProvider>
  );
}
