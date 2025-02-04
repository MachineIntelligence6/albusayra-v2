import { Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import PercentageTextField from "@/components/shared-components/PercentageTextField";
import CustomTextField from "@/components/shared-components/CustomTextField";

const AddSimDetailsForm = ({ control, options, onVendorChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          name="simNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="SIM Number"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="simVendorName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              {...field}
              label="SIM Vendor Name"
              error={!!error}
              helperText={error?.message}
              options={options.vendorOptions}
              onChange={(e) => {
                field.onChange(e.target.value);
                onVendorChange(e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="simOwnership"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              {...field}
              label="SIM Ownership"
              error={!!error}
              helperText={error?.message}
              options={options.simOwnershipOptions}
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
            name="simContract"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                {...field}
                label="SIM Contract"
                placeholder="Rent of Bike from Rental Company"
                error={!!error}
                helperText={error?.message}
                options={options.contractOptions}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="vat"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PercentageTextField
                {...field}
                label="VAT%"
                placeholder="12"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </Box>
  );
};

export default AddSimDetailsForm;
