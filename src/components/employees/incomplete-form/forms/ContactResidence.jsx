import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import CustomDropdown from "@/components/shared-components/CustomDropDown";

const ContactResidence = ({ control, options, onCountryChange }) => {
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
          name="ContactResidence.email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Email Address"
              error={!!error}
              placeholder="Enter Email Address"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="ContactResidence.phoneNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Contact no."
              error={!!error}
              placeholder="123 456 7890"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="ContactResidence.eContactRelation"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Emergency Contact Relation"
              error={!!error}
              placeholder="Emergency Contact Relation (UAE)"
              helperText={error ? error.message : ""}
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
        <Controller
          name="ContactResidence.eContactNo"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Emergency Contact no."
              error={!!error}
              placeholder="123 456 7890"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="ContactResidence.country"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Country"
              error={!!error}
              helperText={error?.message}
              options={options.countryOptions}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                onCountryChange(e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="ContactResidence.city"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="City"
              error={!!error}
              helperText={error?.message}
              options={options.cityOptions}
              value={field.value || ""}
              {...field}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default ContactResidence;
