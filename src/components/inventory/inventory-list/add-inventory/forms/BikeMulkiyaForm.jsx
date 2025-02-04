import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const BikeMulkiyaForm = ({ control }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Controller
          name="bikeMulikya.picture"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFileUploadField
              label="Bike Mulikya Picture"
              placeholder="Jpg, Pdf, Png"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Controller
          name="bikeMulikya.expiryDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Bike Mulikya Expiry"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default BikeMulkiyaForm;
