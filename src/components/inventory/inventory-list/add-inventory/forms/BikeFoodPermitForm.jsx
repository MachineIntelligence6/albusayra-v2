import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const BikeFoodPermitForm = ({ control }) => {
  return (
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
        {/* <CustomFileUploadField
          label="Bike Food Perrmit Picture"
          placeholder="Jpg, Pdf, Png"
        /> */}
        <Controller
          name="bikeFoodPermit.picture"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFileUploadField
              label="Bike Food Perrmit Picture"
              placeholder="Jpg, Pdf, Png"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        {/* <CustomDateField label="Bike Food Permit Expir Date" /> */}

        <Controller
          name="bikeFoodPermit.expiryDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Bike Food Permit Expire Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        {/* <CustomTextField label="Bike Food Permit Cost" placeholder="1000" /> */}
        <Controller
          name="bikeFoodPermit.cost"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Bike Food Permit Cost"
              placeholder="1000"
              error={!!error}
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default BikeFoodPermitForm;
