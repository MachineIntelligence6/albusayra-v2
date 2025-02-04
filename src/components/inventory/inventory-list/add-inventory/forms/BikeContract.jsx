import { Box } from "@mui/material";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { LockKeyhole } from "lucide-react";
import { Controller } from "react-hook-form";

const BikeContract = ({ control, options }) => {
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
        {/* <Controller
          name="bikeContact.vendor"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Vendor"
              placeholder="Saleem Akhtar"
              error={!!error}
              helperText={error ? error.message : ""}
              {...field}
              endAdornment={<LockKeyhole />}
            />
          )}
        /> */}
        <Controller
          name="bikeContact.vendor"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Vendor"
              error={!!error}
              helperText={error?.message}
              options={options.vendorOptions}
              {...field}
            />
          )}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Controller
          name="bikeContact.contact"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Contract"
              error={!!error}
              helperText={error?.message}
              options={options.contractOptions}
              {...field}
            />
          )}
        />
      </Box>
      <Box sxx={{ flex: 1 }}></Box>
    </Box>
  );
};

export default BikeContract;
