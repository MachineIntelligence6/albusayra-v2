import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Divider, Paper, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomDatePicker from "@/components/shared-components/CustomDatePicker";
import { ChallansSchema } from "@/utils/schemas/ChallanFormSchema";
import CustomSelect from "../shared-components/CustomSelect";
import CustomFileUploadField from "../shared-components/CustomFIleUploadField";
import CaptionText from "../shared-components/CaptionText";
import { custom } from "@/app/theme";

const renderLabel = (label, required = false) => (
  <Typography variant="body1" component="span" sx={{ fontSize: "16px", color: custom.primaryText, fontWeight: 500, lineHeight: "18px" }}>
    {label}
    {required && (
      <Typography component="span" color="error">
        {" "}
        *
      </Typography>
    )}
  </Typography>
);

export default function ChallansForm({ handleCloseModal }) {
  const methods = useForm({
    resolver: yupResolver(ChallansSchema),
    mode: "onChange",
    defaultValues: {
      bikeNumberPlate: "",
      bikeOwner: "",
      challanNo: "",
      challanAmount: "",
      challanAttachments: null,
      dateOfTrafficChallan: "",
      time: "",
      city: "",
      location: "",
      reason: "",
    },
  });

  const { trigger, control } = methods;

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    handleCloseModal();
  };

  const fields = [
    {
      label: "Bike Number Plate",
      name: "bikeNumberPlate",
      required: true,
      component: CustomTextField,
      placeholder: "45463",
    },
    {
      label: "Bike Owner",
      name: "bikeOwner",
      required: true,
      component: CustomTextField,
      placeholder: "ABDS",
      additionalUI: () => (
        <CustomButton
          variant="contained"
          onClick={() => console.log("View Details clicked")}
        >
          View Details
        </CustomButton>
      ),
    },
    {
      label: "Challan No.",
      name: "challanNo",
      required: true,
      component: CustomTextField,
      placeholder: "e.g 3243432",
    },
    {
      label: "Challan Amount",
      name: "challanAmount",
      required: true,
      component: CustomTextField,
      placeholder: "e.g 1500",
    },
    {
      label: "Challan Attachments",
      name: "challanAttachments",
      required: true,
      component: CustomFileUploadField,
      accept: "application/pdf",
    },
    {
      label: "Date Of Traffic Challan",
      name: "dateOfTrafficChallan",
      required: true,
      component: CustomDatePicker,
      placeholder: "DD/MM/YYYY"
    },
    {
      label: "Time",
      name: "time",
      required: true,
      component: CustomTextField,
      placeholder: "e.g 12:00 PM",
    },
    {
      label: "City",
      name: "city",
      required: true,
      component: CustomSelect,
      placeholder: "e.g Sharjah",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      label: "Location",
      name: "location",
      required: true,
      component: CustomTextField,
      placeholder: "e.g salahuddin rd deira, sharjha",
    },
    {
      label: "Reason",
      name: "reason",
      required: true,
      component: CustomTextField,
      placeholder: "e.g",
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h6">Challan Upload</Typography>
        <Divider sx={{ my: "1em" }} />
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
                    component,
                    accept,
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
                        render={({ field, fieldState: { error } }) => {
                          const Component = component; // Assign the component dynamically
                          return (
                            <Component
                              {...field} // Pass field props such as value and onChange
                              placeholder={placeholder}
                              error={!!error} // Convert error state to boolean for the component
                              helperText={error ? error.message : ""}
                              accept={accept} // For fields like file upload
                            />
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
                onClick={handleCloseModal}
                startIcon={<CancelIcon />}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="contained"
                onClick={handleSave}
                endIcon={<DoneIcon />}
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
