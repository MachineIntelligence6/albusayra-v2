import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const DrivingLicense = ({ control }) => {
  return (
    <Box
      component="div"
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Controller
          name="DrivingLicense.licenseNo"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="License No."
              error={!!error}
              placeholder="Enter License No."
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="DrivingLicense.licenseIssueDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="License Issue Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="DrivingLicense.licenseExpiryDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="License Expiry Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Controller
            name="DrivingLicense.licenseCopyFront"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="License Copy Front"
                placeholder="Upload License front copy (JPG, PNG, PDF up to 5MB)"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="DrivingLicense.licenseCopyBack"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="License Copy Back"
                placeholder="Upload License back copy (JPG, PNG, PDF up to 5MB)"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </Box>
  );
};

export default DrivingLicense;
