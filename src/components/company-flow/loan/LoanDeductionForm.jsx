import React, { createElement } from "react";
import { Controller } from "react-hook-form";
import { Box, Typography, Grid, Divider, Paper } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CaptionText from "@/components/shared-components/CaptionText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { custom } from "@/app/theme";
import CurrencyType from "@/components/shared-components/CurrencyType";

// Validation Schema
const LoanDeductionSchema = yup.object().shape({
  employeeId: yup.string().required("Employee ID is required"),
  employeeName: yup.string().required("Employee Name is required"),
  date: yup.date().required("Date is required"),
  reasonForLoan: yup.string().required("Reason for Loan is required"),
  visaPurchase: yup
    .string()
    .required("Visa Purchase is required"),
  visaLoanAmount: yup
    .string()
    .required("Visa Loan Amount is required"),
  advanceReceived: yup
    .string()
    .required("Advance Received is required"),
  remainingLoanBalance: yup
    .string()
    .required("Remaining Visa Loan Balance is required"),
  installmentPlan: yup.string().required("Installment Plan is required"),
  deductionType: yup.string().required("Deduction Type is required"),
  perMonthDeduction: yup
    .string()
    .required("Per Month Deduction Amount is required"),
});

export default function LoanDeductionForm({ onClose }) {
  const methods = useForm({
    resolver: yupResolver(LoanDeductionSchema),
    mode: "onChange",
    defaultValues: {
      employeeId: "",
      employeeName: "",
      date: "",
      reasonForLoan: "",
      visaPurchase: "",
      visaLoanAmount: "",
      advanceReceived: "",
      remainingLoanBalance: "",
      installmentPlan: "",
      deductionType: "",
      perMonthDeduction: "",
    },
  });

  const { control } = methods;

  const fields = [
    { label: "Employee ID", name: "employeeId", component: CustomTextField, placeholder: "e.g. AB0001" },
    { label: "Employee Name", name: "employeeName", component: CustomTextField, placeholder: "e.g. John Doe", startImage: "/company/asset-clearence/man.svg" },
    { label: "Date", name: "date", component: CustomTextField, type: "date" },
    {
      label: "Reason for Loan",
      name: "reasonForLoan",
      component: CustomSelect,
      options: [
        { value: "personal", label: "Personal" },
        { value: "emergency", label: "Emergency" },
        { value: "other", label: "Other" },
      ],
    },
    { label: "Visa Purchase (Actual Visa Cost)", name: "visaPurchase", component: CustomTextField, placeholder: "e.g. 6000", appendText: "AED" },
    { label: "Visa Loan Amount Charged to Rider", name: "visaLoanAmount", component: CustomTextField, placeholder: "e.g. 7000", appendText: "AED" },
    { label: "Advance Received", name: "advanceReceived", component: CustomTextField, placeholder: "e.g. 2000", appendText: "AED" },
    { label: "Remaining Visa Loan Balance", name: "remainingLoanBalance", component: CustomTextField, placeholder: "e.g. 2000", appendText: "AED" },
    {
      label: "Installment Plan",
      name: "installmentPlan",
      component: CustomSelect,
      options: [
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
      ],
    },
    {
      label: "Deduction Type",
      name: "deductionType",
      component: CustomSelect,
      options: [
        { value: "fixed", label: "Fixed" },
        { value: "variable", label: "Variable" },
      ],
    },
    { label: "Per Month Deduction Amount", name: "perMonthDeduction", component: CustomTextField, placeholder: "e.g. 2000" },
  ];

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 500,color: custom.primaryText }}>
          Loan Deduction Request
        </Typography>
        <Divider sx={{ my: 3 }} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {fields.map(({ label, name, component = CustomTextField, type, options, placeholder, appendText, startImage, endImage }, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5}>
                    <CaptionText text={label} required/>
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name={name}
                      control={control}
                      defaultValue=""
                      render={({ field, fieldState: { error } }) =>
                        createElement(component, {
                          ...field,
                          type,
                          options,
                          placeholder,
                          error: !!error,
                          helperText: error?.message,
                          InputProps: {
                            startAdornment: startImage && (
                              <Box
                                component="img"
                                src={startImage}
                                alt="icon"
                                sx={{ width: 24, height: 24, mr: 1 }}
                              />
                            ),
                            endAdornment: appendText || endImage ? (
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                {appendText && (
                                  <CurrencyType />
                                )}
                                {endImage && (
                                  <Box
                                    component="img"
                                    src={endImage}
                                    alt="icon"
                                    sx={{ width: 24, height: 24, ml: 1 }}
                                  />
                                )}
                              </Box>
                            ) : null,
                          },
                        })
                      }
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <CustomButton
                variant="outlined"
                bgColor="danger"
                onClick={onClose}
                startIcon={<CancelIcon />}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="contained"
                endIcon={<DoneIcon sx={{ width: "15px" }} />}
              >
                Done
              </CustomButton>
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </LocalizationProvider>
  );
}