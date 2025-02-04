"use client";

import React, { useState } from "react";
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
  Chip,
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
import { PlusIcon } from "lucide-react";
import { custom } from "@/app/theme";

const schema = yup.object().shape({
  assetType: yup.string().required("Asset Type is required"),
  bikePlateNo: yup.string().required("Bike Plate No. is required"),
  bikeCity: yup.string().required("Bike City is required"),
  bikeOwnership: yup.string().required("Bike Ownership is required"),
  dateOfClearance: yup.date().required("Date of Clearance is required"),
  timeOfClearance: yup.date().required("Time of Clearance is required"),
  condition: yup.string().required("Condition is required"),
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
  const [images, setImages] = useState(["Img-123.jpg", "Img-456.jpg"]);

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

  // Add a new placeholder image
  const handleAddImage = () => {
    const newImage = `Img-${Math.floor(Math.random() * 1000)}.jpg`;
    setImages((prev) => [...prev, newImage]);
  };

  // Remove an image
  const handleDeleteImage = (imageToDelete) => {
    setImages((prev) => prev.filter((image) => image !== imageToDelete));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledPaper elevation={0}>
        <Typography variant="h6" gutterBottom sx={{fontSize:"18px", color:custom.primaryText}}>
          Asset Clearance Form
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
                    { id: 12, label: "Bike", value: "bike" },
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
              <FieldHeading 
                  sx={{fontSize:"13px", color:custom.primaryText}}>
                Bike Plate No.<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="bikePlateNo"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    fullWidth
                    error={!!errors.bikePlateNo}
                    helperText={errors.bikePlateNo?.message}
                    options={[
                      { id: 12, label: "1232", value: "1232" },
                      { id: 22, label: "3454", value: "3454" },
                    ]}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockOutlined sx={{ color: custom.primaryText, width:"16px", height:"16px" }}/>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            <Box>
              <FieldHeading 
                  sx={{fontSize:"13px", color:custom.primaryText}}>
                Bike City<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="bikeCity"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled
                    error={!!errors.bikeCity}
                    helperText={errors.bikeCity?.message}
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
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Bike Ownership<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="bikeOwnership"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled
                    error={!!errors.bikeOwnership}
                    helperText={errors.bikeOwnership?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Image
                            src="/challans/Avatar.png"
                            width={20}
                            height={20}
                            alt="Bike Ownership Icon"
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
            <Box>
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Date Of Bike Clearance<span className="required">*</span>
              </FieldHeading>
              <Controller
                name="dateOfClearance"
                control={control}
                render={({ field }) => (
                  <CustomDateField
                    {...field}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        fullWidth
                        error={!!errors.dateOfClearance}
                        helperText={errors.dateOfClearance?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>

            <Box>
              {/* Field Heading */}
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>
                Time Of Bike Clearance<span className="required">*</span>
              </FieldHeading>

              {/* Time Picker with AM/PM Buttons */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Controller
                  name="timeOfClearance"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      error={!!errors.timeOfClearance}
                    // helperText={errors.timeOfClearance?.message}
                    />
                  )}
                />

                {/* AM/PM Toggle */}
                <CustomButton
                  type="submit"
                  variant="contained"
                  // onClick={handleNext}
                  sx={{
                    padding: "4.5px 3px",
                    borderRadius: "8px",
                    fontSize:"15px",

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
                    color: "#2F2B3D66",
                    borderColor: "#2F2B3D66",
                    fontSize:"15px",
                  }}
                >
                  PM
                </CustomButton>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FieldHeading sx={{fontSize:"13px", color:custom.primaryText}}>Condition</FieldHeading>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    fullWidth
                    error={!!errors.bikePlateNo}
                    helperText={errors.bikePlateNo?.message}
                    options={[
                      { id: 12, label: "Ok", value: "ok" },
                      { id: 22, label: "Not Ok", value: "notok" },
                    ]}
                  />
                )}
              />
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
                      placeholder="None"
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

              <Box sx={{ width: "100%", mb: 3 }}>
                {/* Field Heading */}
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "13px",
                    mb: 1,
                    color: custom.primaryText,
                  }}
                >
                  Upload Bike Images
                </Typography>

                {/* Chip Container */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    overflowX: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "4px",
                    width: "100%", // Ensure full width
                    boxSizing: "border-box",
                    justifyContent: "space-between"
                  }}
                >
                  {/* Uploaded Images as Chips */}
                  <Box>
                    {images.map((image, index) => (
                      <Chip
                        key={index}
                        label={image}
                        onDelete={() => handleDeleteImage(image)}
                        avatar={
                          <Box
                            component="img"
                            src="/icons/image-placeholder.svg" // Replace with a placeholder image path
                            alt="Image Placeholder"
                            sx={{
                              width: 20,
                              height: 20,
                              padding: "2px",
                              borderRadius: "50%",
                            }}
                          />
                        }
                        sx={{
                          background: "#F4F4F4",
                          color: custom.primaryText,
                          fontSize: "12px",
                          borderRadius: "16px",
                        }}
                      />
                    ))}
                  </Box>

                  {/* Add Button */}
                  <CustomButton
                    variant="contained"
                    sx={{
                      bgcolor: "#E6E6E9",
                      padding: "4px",
                      width: "20px",
                      borderRadius: "8px",
                      borderColor: "#2F2B3DE5"
                    }}
                    onClick={handleAddImage}
                  >
                    <PlusIcon sx={{ color: "#2F2B3DE5" }} />
                  </CustomButton>
                </Box>
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
                    rows={4} // Specifies 4 lines
                    fullWidth
                    variant="outlined"
                    placeholder="Any..."
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
