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
import CustomTextField from "@/components/shared-components/CustomTextField";
// import { PassportDetailsSchema } from "@/utils/schemas/PassportDetailsEditSchema";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CaptionText from "@/components/shared-components/CaptionText";
import { UpdateApplicantPassportInfo } from "@/redux/reducers/applicants/applicantThunk";
import IOSSwitch from "@/components/ui/switch-button";
import * as yup from "yup";
import { UserData } from "@/configs/UseApi";
import { useDispatch } from "react-redux";

export default function PassportDetailsEditForm({
  isUaeResident,
  EditingData,
  handleClosePassportDetailsInfoModal,
}) {
  const PassportDetailsSchema = yup.object().shape({
    passportNumber: yup.string().required("Passport number is required"),
    passportIssueDate: yup
      .date()
      .required("Passport issue date is required")
      .max(new Date(), "Issue date cannot be in the future"),

    passportExpiryDate: yup
      .date()
      .required("Passport expiry date is required")
      .min(
        yup.ref("passportIssueDate"),
        "Expiry date must be after issue date"
      ),

    passportCopy: yup.mixed().required("Passport copy is required"),
  });

  const methods = useForm({
    resolver: yupResolver(PassportDetailsSchema),
    mode: "onChange",
    defaultValues: {
      passportNumber: "",
      passportIssueDate: null,
      passportExpiryDate: null,
      passportCopy: null,
      IsValidWorkVisa: "",
      visaApplied: "",
    },
  });

  const dispatch = useDispatch();
  const { trigger, control, watch, setValue } = methods;
  const [isActive, setIsActive] = useState(false); // for Switch

  const fields = [
    {
      label: "Passport No.",
      name: "passportNumber",
      required: true,
      placeholder: "ABCD-234353",
      component: "CustomTextField",
    },
    {
      label: "Passport Issue Date",
      name: "passportIssueDate",
      required: true,
      placeholder: "20-10-2028",
      component: "CustomDateField",
      props: { borderRadius: 1.5 },
    },
    {
      label: "Passport Expiry Date",
      name: "passportExpiryDate",
      required: true,
      placeholder: "20-10-2028",
      component: "CustomDateField",
      props: { borderRadius: 1.5 },
    },
    {
      label: "Passport Copy",
      name: "passportCopy",
      required: true,
      placeholder: "Upload Passport Copy",
      component: "CustomFileUploadField",
    },
    ...(isUaeResident
      ? [
          {
            label: "Do you have valid work visa?",
            name: "IsValidWorkVisa",
            placeholder: "Yes/No",
            required: isUaeResident ? true : false,
            component: "CustomSelect",
            options: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
          },
        ]
      : [
          {
            label: "Visa Applied",
            name: "visaApplied",
            required: isUaeResident ? true : false,
            component: "IOSSwitch",
          },
        ]),
  ];

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("PassportNo", watch("passportNumber"));
    formData.append("PassportIssueDate", watch("passportIssueDate"));
    formData.append("PassportExpiryDate", watch("passportExpiryDate"));
    formData.append("PassportImage", watch("passportCopy"));
    formData.append("IsVisaApplied", isActive);
    formData.append(
      "IsValidWorkVisa",
      watch("IsValidWorkVisa") === "Yes" ? true : false
    );
    formData.append("ResidentialStatus", EditingData?.residentialStatus);
    formData.append("UpdatedBy", UserData?.Id);
    formData.append("Id", EditingData?.id);
    formData.append("Status", 10);

    dispatch(UpdateApplicantPassportInfo(formData)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleClosePassportDetailsInfoModal();
      }
    });
  };

  // Update Data
  useEffect(() => {
    if (EditingData) {
      setValue("passportNumber", EditingData?.passportNo || "");
      setValue("passportCopy", EditingData?.passportImage || "");
      setValue(
        "IsValidWorkVisa",
        EditingData?.isValidWorkVisa === true ? "Yes" : "No"
      );
      setValue("visaApplied", EditingData?.isVisaApplied || ""); // Switch

      if (EditingData?.isVisaApplied) {
        setIsActive(EditingData?.isVisaApplied);
      }

      setValue(
        "passportIssueDate",
        EditingData?.passportIssueDate
          ? new Date(EditingData?.passportIssueDate).toISOString().split("T")[0]
          : ""
      );
      setValue(
        "passportExpiryDate",
        EditingData?.passportExpiryDate
          ? new Date(EditingData?.passportExpiryDate)
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
          PASSPORT DETAILS
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {fields.map(
                (
                  {
                    component,
                    label,
                    name,
                    required,
                    placeholder,
                    options,
                    props,
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
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <CaptionText text={label} required={required} />
                      {label === "Visa Applied" && (
                        <IOSSwitch
                          sx={{ ml: 2 }}
                          checked={isActive}
                          onChange={() => setIsActive(!isActive)}
                        />
                      )}
                    </Box>

                    <Box sx={{ flex: "1", width: "80%" }}>
                      <Controller
                        name={name}
                        control={control}
                        defaultValue={component === "IOSSwitch" ? false : ""}
                        render={({ field, fieldState: { error } }) => {
                          return (
                            <>
                              {component === "CustomTextField" && (
                                <CustomTextField
                                  error={error}
                                  onChange={field.onChange}
                                  value={field.value}
                                  placeholder={placeholder}
                                  {...props}
                                />
                              )}
                              {component === "CustomDateField" && (
                                <CustomDateField
                                  error={error}
                                  onChange={field.onChange}
                                  value={field.value}
                                  helperText={error?.message && error?.message}
                                  placeholder={placeholder}
                                  helperTextFontSize={16}
                                  {...props}
                                />
                              )}
                              {component === "CustomFileUploadField" && (
                                <CustomFileUploadField
                                  placeholder={field.placeholder}
                                  error={error}
                                  required={field.required}
                                  onChange={field.onChange}
                                  value={field.value}
                                />
                              )}
                              {component === "CustomSelect" && (
                                <CustomSelect
                                  error={error}
                                  onChange={field.onChange}
                                  value={field.value}
                                  options={options}
                                  placeholder={placeholder}
                                  {...props}
                                />
                              )}
                            </>
                          );
                        }}
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
                onClick={() => handleClosePassportDetailsInfoModal()}
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
