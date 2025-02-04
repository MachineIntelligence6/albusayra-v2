import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import { Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const BikeInsuranceForm = ({ control }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Controller
          name="bikeInsurance.insurance"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Bike Insurance"
              error={!!error}
              helperText={error?.message}
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              {...field}
            />
          )}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Controller
          name="bikeInsurance.startDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Bike Insurance Start Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Controller
          name="bikeInsurance.endDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Bike Insurance End Date"
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

export default BikeInsuranceForm;
