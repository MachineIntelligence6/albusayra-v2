import React, { createElement, useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Divider, Paper, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
// import { DrivingLicenseEditSchema } from "@/utils/schemas/DrivingLicenseEditFormSchema";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CaptionText from "@/components/shared-components/CaptionText";
import * as Yup from "yup";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { UpdateApplicantLicenseInfo } from "@/redux/reducers/applicants/applicantThunk";
import { UserData } from "@/configs/UseApi";
import { useDispatch } from "react-redux";

export default function DrivingLicenseEditForm({
  handleCloseDrivingLicenseInfoModal,
  isUaeResident,
  EditingData,
}) {
  const DrivingLicenseEditSchema = Yup.object().shape({
    isLicenseHolder: Yup.string().required(
      "Please specify if you hold a driving license"
    ),
    licenseNumber: Yup.string().when("isLicenseHolder", {
      is: "yes",
      then: (schema) =>
        schema.required("License number is required for license holders"),
      otherwise: (schema) => schema.notRequired(),
    }),
    // licenseIssueDate: Yup.string().when("isLicenseHolder", {
    //   is: "yes",
    //   then: (schema) =>
    //     schema.required("License number is required for license holders"),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
    // licenseExpiryDate: Yup.string().when("isLicenseHolder", {
    //   is: "yes",
    //   then: (schema) =>
    //     schema
    //       .required("License number is required for license holders")
    //       .min(
    //         Yup.ref("licenseIssueDate"),
    //         "License Expiry Date can't be before License Issue Date"
    //       ),
    //   otherwise: (schema) => schema.notRequired(),
    // }),

    licenseIssueDate: Yup.date()
      .nullable()
      .typeError("License Issue Date is not valid")
      .required("License Issue Date is required"),
    licenseExpiryDate: Yup.date()
      .nullable()
      .typeError("License Expiry Date is not valid")
      .min(
        Yup.ref("licenseIssueDate"),
        "License Expiry Date can't be before License Issue Date"
      )
      .required("License Expiry Date is required"),
    // END
  });

  const methods = useForm({
    resolver: yupResolver(DrivingLicenseEditSchema),
    mode: "onChange",
    defaultValues: {
      isLicenseHolder: "",
      licenseNumber: "",
      licenseIssueDate: null,
      licenseExpiryDate: null,
      LicenseImageFront: null,
      LicenseImageBack: null,
    },
  });

  const { trigger, watch, control, setValue } = methods;
  const dispatch = useDispatch();
  const stepFields = {
    0: [
      "isLicenseHolder",
      "licenseNumber",
      "licenseIssueDate",
      "licenseExpiryDate",
      "LicenseImageFront",
      "LicenseImageBack",
    ],
  };

  const handleSave = async () => {
    console.log("Validating fields:", stepFields[0]); // Debugging

    const isValid = await trigger(stepFields[0]);
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors); // Log errors for debugging
    }
  };

  const fields = [
    {
      label: `${isUaeResident ? "UAE" : "Local"} Driving License Holder`,
      name: "isLicenseHolder",
      required: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      component: CustomSelect,
    },
    {
      label: `${isUaeResident ? "UAE" : "Local"} Driving License Number`,
      name: "licenseNumber",
      required: true,
      placeholder: "8793462923",
      component: CustomTextField,
    },
    {
      label: "Driving License Issue Date",
      name: "licenseIssueDate",
      required: watch("isLicenseHolder") === "yes",
      component: CustomDateField,
      props: { borderRadius: 1.5 },
    },
    {
      label: "Driving License Expiry Date",
      name: "licenseExpiryDate",
      required: watch("isLicenseHolder") === "yes",
      component: CustomDateField,
      props: { borderRadius: 1 },
    },
    ...(isUaeResident
      ? [
          {
            label: "Driving License (Front)",
            name: "LicenseImageFront",
            required: watch("isLicenseHolder") === "yes",
            placeholder: "PDF Scanned",
            component: CustomFileUploadField,
          },
          {
            label: "Driving License (Back)",
            name: "LicenseImageBack",
            required: watch("isLicenseHolder") === "yes",
            placeholder: "PDF Scanned",
            component: CustomFileUploadField,
          },
        ]
      : []),
  ];

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("DrivingLicenseHolder", data?.isLicenseHolder);
    formData.append("DrivingLicenseNo", data?.licenseNumber);
    formData.append("LicenseImageFront", data?.LicenseImageFront);
    formData.append("LicenseImageBack", data?.LicenseImageBack);
    formData.append("LicenseIssueDate", watch("licenseIssueDate"));
    formData.append("LicenseExpiryDate", watch("licenseExpiryDate"));

    formData.append("UpdatedBy", UserData?.Id);
    formData.append("Id", EditingData?.id);
    formData.append("ResidentialStatus", EditingData?.residentialStatus);
    formData.append("Status", 10);
    dispatch(UpdateApplicantLicenseInfo(formData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleCloseDrivingLicenseInfoModal();
      }
    });
  };

  // Update Data
  useEffect(() => {
    if (EditingData) {
      setValue("isLicenseHolder", EditingData?.drivingLicenseHolder || "");
      setValue("licenseNumber", EditingData?.drivingLicenseNo || "");
      setValue("LicenseImageFront", EditingData?.licenseImageFront || "");
      setValue("LicenseImageBack", EditingData?.licenseImageBack || "");
      setValue(
        "licenseIssueDate",
        EditingData?.licenseIssueDate
          ? new Date(EditingData?.licenseIssueDate).toISOString().split("T")[0]
          : ""
      );
      setValue(
        "licenseExpiryDate",
        EditingData?.licenseExpiryDate
          ? new Date(EditingData?.licenseExpiryDate).toISOString().split("T")[0]
          : ""
      );
    }
  }, [EditingData, setValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h6" mb="3em">
          DRIVING LICENSE
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {fields.map(
                (
                  {
                    label,
                    name,
                    required,
                    placeholder,
                    options,
                    component,
                    props = {},
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
                            ...props,
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
                onClick={() => handleCloseDrivingLicenseInfoModal()}
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
