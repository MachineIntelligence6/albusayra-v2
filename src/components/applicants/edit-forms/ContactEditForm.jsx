import React, { createElement, useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Divider, InputAdornment, Paper, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomCountryCodeInput from "@/components/shared-components/CustomCountryCodeInput";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import { contactEditFormSchema } from "@/utils/schemas/contactEditFormSchema";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CaptionText from "@/components/shared-components/CaptionText";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByStatus } from "@/redux/reducers/dataBank/dataBankThunk";
import { UpdateApplicantContactInfo } from "@/redux/reducers/applicants/applicantThunk";
import { UserData } from "@/configs/UseApi";

export default function ContactEditForm({
  handleCloseContactInfoModal,
  isUaeResident,
  setIsUaeResident,
  EditingData,
}) {
  // const contactEditFormSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   phoneNumber: Yup.string().required("Phone Number is required"),
  //   whatsappNumber: Yup.string().required("WhatsApp Number is required"),
  //   currentCountryResidence: Yup.string().when("residency", {
  //     is: "Non-UAE Resident",
  //     then: (schema) =>
  //       schema.required("Current country is required for non-UAE residents"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),
  //   nationality: Yup.string().when("residency", {
  //     is: "Non-UAE Resident",
  //     then: (schema) =>
  //       schema.required("Nationality is required for non-UAE residents"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),
  // });

  const contactEditFormSchema = (isUaeResident) =>
    Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      whatsappNumber: Yup.string().required("WhatsApp Number is required"),
      currentCountryResidence: isUaeResident
        ? Yup.string().notRequired()
        : Yup.string().required(
            "Current country is required for non-UAE residents"
          ),
      nationality: isUaeResident
        ? Yup.string().notRequired()
        : Yup.string().required(
            "Nationality is required for non-UAE residents"
          ),
    });

  // const [isUaeResident, setIsUaeResident] = useState(false);
  const methods = useForm({
    resolver: yupResolver(contactEditFormSchema(isUaeResident)),
    mode: "onChange",
    defaultValues: {
      email: "",
      phoneNumber: {
        countryCode: "",
        number: "",
      },
      whatsappNumber: {
        countryCode: "",
        number: "",
      },
      nationality: "",
    },
  });

  const { trigger, watch, control, setValue } = methods;
  const dispatch = useDispatch();
  const [countryOptions, setCountryOptions] = useState([]);
  const { getCountryByStatuses } = useSelector((state) => state.dataBankSlice);

  // Watch the residency field
  const watchedResidency = watch("residency");

  // Update the residency state whenever it changes
  // useEffect(() => {
  //   if (watchedResidency === "resident") {
  //     setIsUaeResident(true);
  //   } else {
  //     setIsUaeResident(false);
  //   }
  // }, [watchedResidency]);

  const stepFields = {
    0: [
      "email",
      "phoneNumber",
      "whatsappNumber",
      "nationality",
      // "emiratesIDNumber",
      // "emiratesIDIssueDate",
      // "emiratesIDExpiryDate",
      // "emiratesIDFront",
      // "emiratesIDBack",
      // "residencyIqama",
    ],
  };

  const handleSave = async () => {
    console.log("Validating fields:", stepFields[0]); // Debugging

    const isValid = await trigger(stepFields[0]);
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors); // Log errors for debugging
    }
    // handleCloseContactInfoModal();
  };

  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    // Add more country codes as needed
  ];

  const fields = [
    {
      label: "Email Address",
      name: "email",
      required: true,
      placeholder: "Enter your email address",
      component: CustomTextField,
      adornment: <MailOutlineIcon />,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      required: true,
      placeholder: "123 456 7890",
      adornment: <PhoneIcon />,
      component: CustomTextField,
      // countryCodes,
      // icon: <PhoneIcon />,
    },
    {
      label: "WhatsApp Number",
      name: "whatsappNumber",
      required: true,
      placeholder: "123 456 7890",
      adornment: <WhatsAppIcon />,
      component: CustomTextField,
      // component: CustomCountryCodeInput,
      // countryCodes,
      // icon: <WhatsAppIcon />,
    },
    ...(isUaeResident
      ? []
      : [
          {
            label: "Current Country Residence",
            name: "currentCountryResidence",
            required: isUaeResident ? true : false,
            options: countryOptions,
            component: CustomSelect,
          },
          {
            label: "Nationality",
            name: "nationality",
            required: isUaeResident ? true : false,
            options: [
              { value: "pakistani", label: "Pakistani" },
              { value: "indian", label: "Indian" },
            ],
            component: CustomSelect,
          },
        ]),
  ];

  // Get Countries
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    dispatch(getCountriesByStatus(params));
  }, [dispatch]);

  // Update country options
  useEffect(() => {
    if (getCountryByStatuses?.length > 0) {
      const formattedOptions = getCountryByStatuses.map((country) => ({
        value: country.id,
        label: country.countryName,
      }));
      setCountryOptions(formattedOptions);
    }
  }, [getCountryByStatuses]);

  // Submit
  const onSubmit = (data) => {
    if (EditingData) {
      const params = {
        email: data?.email,
        contactNumber: data?.phoneNumber,
        whatsAppNo: data?.whatsappNumber,
        currentCountryId: data?.currentCountryResidence,
        nationality: data?.nationality,
        updatedBy: UserData?.Id,
        status: 10,
        id: EditingData?.id,
        residentialStatus: EditingData?.residentialStatus,
      };

      dispatch(UpdateApplicantContactInfo(params)).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          handleCloseContactInfoModal();
        }
      });
    }
  };

  // Update Data
  useEffect(() => {
    if (EditingData) {
      // console.log("object", EditingData?.nationality);
      setValue("email", EditingData?.email || "");
      setValue("phoneNumber", EditingData?.contactNumber || "");
      setValue("whatsappNumber", EditingData?.whatsAppNo || "");
      setValue("nationality", EditingData?.nationality || "");
      setValue(
        "currentCountryResidence",
        EditingData?.currentCountry?.id || ""
      );
    }
  }, [EditingData, setValue]);

  // const fields = [
  //   {
  //     label: "Email Address",
  //     name: "email",
  //     required: true,
  //     placeholder: "Enter your email address",
  //     component: CustomTextField,
  //     adornment: <MailOutlineIcon />,
  //   },
  //   {
  //     label: "Phone Number",
  //     name: "phoneNumber",
  //     required: true,
  //     placeholder: "123 456 7890",
  //     component: CustomTextField,
  //     adornment: <PhoneIcon />,
  //     component: CustomCountryCodeInput,
  //     countryCodes,
  //     icon: <PhoneIcon />, // Pass PhoneIcon here
  //   },
  //   {
  //     label: "WhatsApp Number",
  //     name: "whatsappNumber",
  //     required: false,
  //     placeholder: "1234567890",
  //     component: CustomCountryCodeInput,
  //     countryCodes,
  //     icon: <WhatsAppIcon />, // Pass WhatsAppIcon here
  //   },
  //   {
  //     label: "Nationality",
  //     name: "nationality",
  //     required: false,
  //     options: [
  //       { value: "pakistani", label: "Pakistani" },
  //       { value: "indian", label: "Indian" },
  //     ],
  //     placeholder: "UAE",
  //     component: CustomSelect,
  //   },
  //   {
  //     label: "Emirates ID No.",
  //     name: "emiratesIDNumber",
  //     required: true,
  //     placeholder: "784-2003-1389613-4",
  //     component: CustomTextField,
  //   },
  //   {
  //     label: "Emirates ID Issue Date",
  //     name: "emiratesIDIssueDate",
  //     required: true,
  //     placeholder: "10-09-2018",
  //     component: CustomTextField,
  //   },
  //   {
  //     label: "Emirates ID Expiry Date",
  //     name: "emiratesIDExpiryDate",
  //     required: true,
  //     placeholder: "10-09-2026",
  //     component: CustomTextField,
  //   },
  //   {
  //     label: "Emirates ID (Front)",
  //     name: "emiratesIDFront",
  //     required: true,
  //     placeholder: "PDF Scanned",
  //     component: CustomFileUploadField,
  //   },
  //   {
  //     label: "Emirates ID (Back)",
  //     name: "emiratesIDBack",
  //     required: true,
  //     placeholder: "PDF Scanned",
  //     component: CustomFileUploadField,
  //   },
  //   {
  //     label: "Upload Residency/Iqama",
  //     name: "residencyIqama",
  //     required: true,
  //     placeholder: "PDF Scanned",
  //     component: CustomFileUploadField,
  //   },
  // ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h6" mb="3em">
          CONTACT & RESIDENT
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {fields.map(
              (
                {
                  label,
                  name,
                  required,
                  placeholder,
                  component,
                  countryCodes,
                  icon,
                  adornment,
                  options,
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
                  <Box key={name} sx={{ flex: "1", width: "80%", mb: 2 }}>
                    <Controller
                      name={name}
                      control={control}
                      defaultValue={
                        component === CustomCountryCodeInput
                          ? {
                              countryCode: countryCodes?.[0]?.code || "",
                              number: "",
                            }
                          : ""
                      }
                      render={({ field, fieldState: { error } }) =>
                        component === CustomCountryCodeInput
                          ? createElement(component, {
                              value: field.value,
                              onChange: field.onChange,
                              countryCodes,
                              error,
                              placeholder,
                              icon, // Pass icon for Phone and WhatsApp fields
                            })
                          : createElement(component, {
                              value: field.value,
                              onChange: field.onChange,
                              placeholder,
                              options,
                              error,
                              InputProps: adornment
                                ? {
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {adornment}
                                      </InputAdornment>
                                    ),
                                  }
                                : undefined,
                            })
                      }
                    />
                  </Box>
                </Box>
              )
            )}

            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <CustomButton
                variant="outlined"
                bgColor="danger"
                onClick={() => handleCloseContactInfoModal()}
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
