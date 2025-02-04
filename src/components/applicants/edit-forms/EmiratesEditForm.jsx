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
import { DrivingLicenseEditSchema } from "@/utils/schemas/DrivingLicenseEditFormSchema";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CaptionText from "@/components/shared-components/CaptionText";
import { UpdateApplicantEmiratesInfo } from "@/redux/reducers/applicants/applicantThunk";
import { UserData } from "@/configs/UseApi";
import { useDispatch } from "react-redux";
import CustomTextField from "@/components/shared-components/CustomTextField";
import * as Yup from "yup";

export default function DrivingLicenseEditForm({
  EditingData,
  handleCloseEmiratesModal,
}) {
  const EmiratesIdEditSchema = Yup.object().shape({
    emiratesIDNumber: Yup.string().required("License Expiry Date is required"),
    emiratesIDIssueDate: Yup.mixed().required(
      "License Expiry Date is required"
    ),
    emiratesIDExpiryDate: Yup.mixed().required(
      "License Expiry Date is required"
    ),
    emiratesIDFront: Yup.mixed().required("License Expiry Date is required"),
    emiratesIDBack: Yup.mixed().required("License Expiry Date is required"),
    residencyIqama: Yup.mixed().required("License Expiry Date is required"),
  });

  const methods = useForm({
    resolver: yupResolver(EmiratesIdEditSchema),
    mode: "onChange",
    defaultValues: {
      nationality: "",
      emiratesIDNumber: "",
      emiratesIDIssueDate: null,
      emiratesIDExpiryDate: null,
      emiratesIDFront: null,
      emiratesIDBack: null,
      residencyIqama: null,
    },
  });

  const { trigger, watch, control, setValue } = methods;
  const dispatch = useDispatch();

  const stepFields = {
    0: [
      "nationality",
      "emiratesIDNumber",
      "emiratesIDIssueDate",
      "emiratesIDExpiryDate",
      "emiratesIDFront",
      "emiratesIDBack",
      "residencyIqama",
    ],
  };

  const fields = [
    {
      label: "Nationality",
      name: "nationality",
      required: true,
      options: [
        { value: "pakistani", label: "Pakistani" },
        { value: "indian", label: "Indian" },
      ],
      placeholder: "UAE",
      component: CustomSelect,
    },
    {
      label: "Emirates ID No.",
      name: "emiratesIDNumber",
      required: true,
      placeholder: "784-2003-1389613-4",
      component: CustomTextField,
    },
    {
      label: "Emirates ID Issue Date",
      name: "emiratesIDIssueDate",
      required: true,
      placeholder: "10-09-2018",
      component: CustomDateField,
    },
    {
      label: "Emirates ID Expiry Date",
      name: "emiratesIDExpiryDate",
      required: true,
      placeholder: "10-09-2026",
      component: CustomDateField,
    },
    {
      label: "Emirates ID (Front)",
      name: "emiratesIDFront",
      required: true,
      placeholder: "PDF Scanned",
      component: CustomFileUploadField,
    },
    {
      label: "Emirates ID (Back)",
      name: "emiratesIDBack",
      required: true,
      placeholder: "PDF Scanned",
      component: CustomFileUploadField,
    },
    {
      label: "Upload Residency/Iqama",
      name: "residencyIqama",
      required: true,
      placeholder: "PDF Scanned",
      component: CustomFileUploadField,
    },
  ];

  const handleSave = async () => {
    console.log("Validating fields:", stepFields[0]); // Debugging

    const isValid = await trigger(stepFields[0]);
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors); // Log errors for debugging
    }
  };

  const onSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("Nationality", watch("nationality"));
    formData.append("EmiratesId", watch("emiratesIDNumber"));
    formData.append("EmiratesIdIssueDate", watch("emiratesIDIssueDate"));
    formData.append("EmiratesIdExpiryDate", watch("emiratesIDExpiryDate"));
    formData.append("EmiratesIdImageFront", watch("emiratesIDFront"));
    formData.append("EmiratesIdImageBack", watch("emiratesIDBack"));
    formData.append("IqamaDocImage", watch("residencyIqama"));
    formData.append("UpdatedBy", UserData?.Id);
    formData.append("Id", EditingData?.id);
    formData.append("Status", 10);
    dispatch(UpdateApplicantEmiratesInfo(formData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleCloseEmiratesModal();
      }
    });
  };

  // Update Data
  useEffect(() => {
    if (EditingData) {
      setValue("nationality", EditingData?.nationality || "");
      setValue("emiratesIDNumber", EditingData?.emiratesId || "");
      setValue("emiratesIDFront", EditingData?.emiratesIdImageFront || "");
      setValue("emiratesIDBack", EditingData?.emiratesIdImageBack || "");
      setValue("residencyIqama", EditingData?.iqamaDocImage || "");
      setValue(
        "emiratesIDIssueDate",
        EditingData?.emiratesIdIssueDate
          ? new Date(EditingData?.emiratesIdIssueDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
      setValue(
        "emiratesIDExpiryDate",
        EditingData?.emiratesIdExpiryDate
          ? new Date(EditingData?.emiratesIdExpiryDate)
              .toISOString()
              .split("T")[0]
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
                    component = CustomSelect,
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
                      <CaptionText text={label} required={required} />
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
                onClick={() => handleCloseEmiratesModal()}
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
