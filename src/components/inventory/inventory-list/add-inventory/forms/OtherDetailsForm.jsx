import { Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import PercentageTextField from "@/components/shared-components/PercentageTextField";
import CustomTextField from "@/components/shared-components/CustomTextField";

const OtherDetailsForm = ({ control, options }) => {
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
          name="otherDetails.branding"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              {...field}
              label="Branding"
              placeholder="Yes/No"
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="otherDetails.brandPlatform"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              {...field}
              label="Brand Platform"
              error={!!error}
              helperText={error?.message}
              options={options.platformOptions}
            />
          )}
        />
        <Controller
          name="otherDetails.box"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              {...field}
              label="Box"
              placeholder="Yes/No"
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              error={!!error}
              helperText={error?.message}
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
          {/* <Controller
            name="otherDetails.brandCost"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                {...field}
                label="Brand Cost"
                placeholder="Rent of Bike from Rental Company"
                error={!!error}
                helperText={error?.message}
              />
            )}
          /> */}
          <Controller
            name="otherDetails.brandCost"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                {...field}
                label="Brand Cost"
                placeholder="Enter Brand Cost"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="otherDetails.vat"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PercentageTextField
                {...field}
                label="VAT%"
                placeholder="Enter VAT In %"
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

export default OtherDetailsForm;
