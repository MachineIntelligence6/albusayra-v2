"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  MenuItem,
  Box,
  Typography,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LockOutlined } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomButton from "@/components/shared-components/CustomButton";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DoneIcon from "@mui/icons-material/Done";
import Image from "next/image";
import { custom } from "@/app/theme";

const schema = yup.object().shape({
  assetType: yup.string().required("Asset Type is required"),
  simNumber: yup.string().required("Sim Number is required"),
  simOperator: yup.string().required("Sim Operator is required"),
  dateOfSimClearance: yup.date().required("Date of Sim Clearance is required"),
  timeOfSimClearance: yup.string().required("Time of Sim Clearance is required"),
  amount: yup.string(),
  remarks: yup.string().required("Remarks are required"),
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  Width: "100%",
  backgroundColor: "#fff",
  borderRadius: "25px",
}));

const FieldHeading = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  "& .required": {
    color: theme.palette.error.main,
    marginLeft: "2px",
  },
}));

export default function AssetClearanceForm({ handleOpenModal }) {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      assetType: "",
      bikePlateNo: "",
      bikeCity: "Sharjah",
      bikeOwnership: "ABDS",
      dateOfClearance: new Date(),
      timeOfClearance: new Date(),
      condition: "",
      amount: "",
      remarks: "",
    },
  });

  const onSubmit = (data) => {
    colsole.log(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledPaper elevation={0}>
        <Typography variant="h6" gutterBottom sx={{fontSize:"18px", color:custom.primaryText, fontWeight:"500"}}>
          Asset Clearance form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3 }}>
            <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
              Asset Type<span className="required">*</span>
            </FieldHeading>
            <Controller
              name="assetType"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  fullWidth
                  options={[
                    { id: 12, label: "Sim", value: "sim" },
                    { id: 22, label: "Car", value: "car" },
                  ]}
                  error={!!errors.assetType}
                >
                  <MenuItem value="Bike">Bike</MenuItem>
                </CustomSelect>
              )}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Sim Number<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="simNumber"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    fullWidth
                    error={!!errors.simNumber}
                    helperText={errors.simNumber?.message}
                    placeholder="+942 2322332"
                    options={[
                      { id: 12, label: "+941 2324234", value: "+941 2324234" },
                      { id: 22, label: "+942 2322332", value: "+942 2322332" },
                    ]}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockOutlined sx={{ color: custom.primaryText, width:"16px", height:"16px" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Sim Operator<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="simOperator"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled
                    error={!!errors.simOperator}
                    helperText={errors.simOperator?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Image
                            src="/company/asset-clearence/image.svg"
                            width={20}
                            height={20}
                            alt="Sim Operator Icon"
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockOutlined sx={{ color: custom.primaryText, width:"16px", height:"16px" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Date Of Sim Clearance<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="dateOfSimClearance"
                control={control}
                render={({ field }) => (
                  <CustomDateField
                    {...field}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        fullWidth
                        error={!!errors.dateOfSimClearance}
                        helperText={errors.dateOfSimClearance?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>

            <Box>
              {/* Field Heading */}
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Time Of Sim Clearance<span className="required">*</span>
              </FieldHeading>

              {/* Time Picker with AM/PM Buttons */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Controller
                  name="timeOfSimClearance"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={!!errors.timeOfSimClearance}
                      helperText={errors.timeOfSimClearance?.message}
                    />
                  )}
                />

                {/* AM/PM Toggle */}
                <CustomButton
                  type="submit"
                  variant="outlined"
                  // onClick={handleNext}
                  sx={{
                    padding: "3px 0px",
                    borderRadius: "8px",
                    color: custom.primaryText,
                    borderColor: "#2F2B3D66",
                    fontSize: "13px"
                  }}
                >
                  AM
                </CustomButton>
                <CustomButton
                  type="submit"
                  variant="outlined"
                  // onClick={handleNext}
                  sx={{
                    padding: "3px 0px",
                    borderRadius: "8px",
                    color: custom.primaryText,
                    borderColor: "#2F2B3D66",
                    fontSize:"13px"
                  }}
                >
                  PM
                </CustomButton>
              </Box>
            </Box>

            <Box>
              <Box sx={{ mb: 2 }}>
                <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>Amount Need To Be Deducted/Penalty</FieldHeading>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      placeholder="e.g 1200"
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{
                              background: "#80839029",
                              padding: "4px 10px",
                              borderRadius: "7px",
                              color: "#808390",
                              lineHeight: 1,
                            }}
                          >
                            AED
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>

            </Box>

            <Box sx={{ mb: 3 }}>
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Remarks<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="remarks"
                control={control}
                render={({ field }) => (
                  <TextField
                    multiline
                    rows={2} // Specifies 2 lines
                    fullWidth
                    variant="outlined"
                    placeholder="e.g"
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <CustomButton
              variant="contained"
              startIcon={<ArrowBackOutlinedIcon />}
              sx={{
                bgcolor: "#737682",
                padding: "8px 19px",
                borderRadius: "8px",
                fontSize:"15px"
              }}
            >
              Back
            </CustomButton>
            <CustomButton
              type="submit"
              variant="contained"
              // onClick={handleNext}
              endIcon={<DoneIcon sx={{ width: "15px" }} />}
              sx={{
                padding: "8px 19px",
                borderRadius: "8px",
                fontSize:"15px"
              }}
              onClick={handleOpenModal}
            >
              Clear
            </CustomButton>
          </Box>
        </form>
      </StyledPaper>
    </LocalizationProvider>
  );
}
