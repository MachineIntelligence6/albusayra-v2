import React, { createElement, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Box, Typography, Grid, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CaptionText from "@/components/shared-components/CaptionText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useForm, FormProvider } from "react-hook-form";
import CurrencyType from "@/components/shared-components/CurrencyType";
import { custom } from "@/app/theme";

export default function LoanDeductionForm({ onClose }) {
  const methods = useForm({
    defaultValues: {
      employeeId: "",
      employeeName: "",
      date: "",
      reasonForLoan: "",
      bikeOwner: "",
      visaPurchase: "",
      visaLoanAmount: "",
      advanceReceived: "",
      remainingLoanBalance: "",
      installmentPlan: "",
      deductionType: "",
      months: [],
    },
  });

  const { control, watch, setValue } = methods;
  const installmentPlan = watch("installmentPlan");
  const months = watch("months");

  useEffect(() => {
    const monthCount = parseInt(installmentPlan?.split(" ")[0]) || 0;
    const updatedMonths = Array.from({ length: monthCount }, (_, index) => ({
      month: `Month ${index + 1}`,
      amount: "",
    }));
    setValue("months", updatedMonths);
  }, [installmentPlan, setValue]);

  const fields = [
    { label: "Employee ID", name: "employeeId", component: CustomTextField, placeholder: "e.g. 23423", },
    { label: "Employee Name", name: "employeeName", component: CustomTextField, placeholder: "e.g. John Doe", startImage: "/company/asset-clearence/man.svg" },
    { label: "Date", name: "date", component: CustomTextField, type: "date", },
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
    { label: "Bike Owner", name: "bikeOwner", component: CustomTextField, placeholder: "e.g. ABDS", startImage: "/challans/Avatar.png" },
    { label: "Visa Purchase (Actual Visa Cost)", name: "visaPurchase", component: CustomTextField, placeholder: "e.g. 6000", appendText: "AED", },
    { label: "Visa Loan Amount Charged to Rider", name: "visaLoanAmount", component: CustomTextField, placeholder: "e.g. 7000", appendText: "AED", },
    { label: "Advance Received", name: "advanceReceived", component: CustomTextField, placeholder: "e.g. 2000", appendText: "AED" },
    { label: "Remaining Visa Loan Balance", name: "remainingLoanBalance", component: CustomTextField, placeholder: "e.g. 2000", appendText: "AED", },
    {
      label: "Deduction Type",
      name: "deductionType",
      component: CustomSelect,
      options: [
        { value: "fixed", label: "Fixed" },
        { value: "variable", label: "Variable" },
      ],
    },
    {
      label: "Installment Plan",
      name: "installmentPlan",
      component: CustomSelect,
      options: [
        { value: "1 month", label: "1 Month" },
        { value: "2 months", label: "2 Months" },
        { value: "3 months", label: "3 Months" },
        { value: "6 months", label: "6 Months" },
      ],
    },
  ];

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ maxWidth: 800, margin: "auto", p: 3 }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 500,color: custom.primaryText }}>Loan Deduction Request</Typography>
        <Divider sx={{ mt: 1, mb: 3 }} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {fields.map(({ label, name, component = CustomTextField, type, options, placeholder, appendText, startImage, endImage }, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5}>
                    <CaptionText text={label} required />
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name={name}
                      control={control}
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

              <Grid item xs={12}>
                {/* <TableContainer> */}
                <Table sx={{ border: "1px solid rgba(128, 131, 144, 0.16)", borderRadius: "8px", color: custom.primaryText }}>
                  <TableHead sx={{ backgroundColor: "#80839014", borderRadius: "10px", color: custom.primaryText }}>
                    <TableRow>
                      <TableCell>Months</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {months?.map((month, index) => (
                      <TableRow key={index}>
                        <TableCell>{month.month}</TableCell>
                        <TableCell>
                          <Controller
                            name={`months[${index}].amount`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <CustomTextField
                                {...field}
                                placeholder="e.g. 300"
                                appendText="AED"
                                error={!!error}
                                helperText={error?.message}
                              />
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* </TableContainer> */}
              </Grid>
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
