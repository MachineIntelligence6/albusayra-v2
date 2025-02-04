import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const EmiratesId = ({ control }) => {
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
          name="EmiratesId.emiratesId"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Emirates ID No"
              error={!!error}
              placeholder="Enter Emirates ID No"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="EmiratesId.eIdIssueDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="EID Issue Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="EmiratesId.eIdExpiryDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="EID Expiry Date"
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
            name="EmiratesId.eIdCopyFront"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="EID Copy Front"
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
            name="EmiratesId.eIdCopyBack"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="EID Copy Back"
                placeholder="Jpg, Pdf, Png"
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

export default EmiratesId;
