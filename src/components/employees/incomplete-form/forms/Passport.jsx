import { Box } from "@mui/material";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { LockKeyhole } from "lucide-react";
import { Controller } from "react-hook-form";
import CustomDateField from "@/components/shared-components/CustomDateField";

const Passport = ({ control, options }) => {
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
          name="Passport.passportNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Passport No."
              error={!!error}
              placeholder="Enter Passport No."
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="Passport.passportIssueDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Passport Issue Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="Passport.passportExpiryDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Passport Expiry Date"
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
            name="Passport.passportCopy"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="Passport Copy"
                placeholder="Upload Passport copy (JPG, PNG, PDF up to 5MB)"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}></Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </Box>
  );
};

export default Passport;
