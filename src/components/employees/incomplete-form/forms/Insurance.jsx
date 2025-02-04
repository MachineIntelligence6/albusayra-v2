import { Box } from "@mui/material";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { LockKeyhole } from "lucide-react";
import { Controller } from "react-hook-form";
import CustomDateField from "@/components/shared-components/CustomDateField";

const Insurance = ({ control, options }) => {
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
          name="Insurance.medicalInsurance"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Medical Insurance"
              error={!!error}
              placeholder="Enter Medical Insurance"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="Insurance.miStartDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Medical Insurance Start Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="Insurance.miEndDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Medical Insurance End Date"
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
        <Controller
          name="Insurance.accidentalInsurance"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Accidental Insurance"
              error={!!error}
              placeholder="Enter Accidental Insurance"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="Insurance.aiStartDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Accidental Insurance Start Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="Insurance.aiEndDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Accidental Insurance End Date"
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

export default Insurance;
