import { Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import PercentageTextField from "@/components/shared-components/PercentageTextField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import { useEffect, useState } from "react";

const OtherDetails = ({ control, options, editData }) => {
  const [isOwnItem, setIsOwnItem] = useState(false);
  useEffect(() => {
    if (editData?.empOwnership == "Own") {
      setIsOwnItem(true);
    } else {
      setIsOwnItem(false);
    }
  }, [editData?.empOwnership]);
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
        <Box sx={{ flex: 1 }}>
          <Controller
            name="OtherDetails.passportHandOver"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                {...field}
                label="Passport Handed Over To Representative"
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
        <Box sx={{ flex: 1 }}>
          <Controller
            name="OtherDetails.passportTakerName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                {...field}
                label="Name of Representative Passport Taken"
                placeholder="Enter Name of Representative Passport Taken"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="OtherDetails.passportCopy"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="Add Picture of Passport"
                placeholder="Upload passport picture (JPG, PNG, PDF up to 5MB)"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
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
          name="OtherDetails.rtaTraining"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              {...field}
              label="RTA Training"
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
          name="OtherDetails.empOwnership"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              {...field}
              label="EMP Ownership"
              placeholder="Please Select"
              error={!!error}
              helperText={error?.message}
              options={options?.EMPOwnership}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                setIsOwnItem(e.target.value === "Own"); // Update state based on selection
              }}
            />
          )}
        />
        {!isOwnItem ? (
          <Controller
            name="OtherDetails.vendor"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                {...field}
                label="Vendor"
                placeholder="Select Vendor"
                error={!!error}
                helperText={error?.message}
                options={options?.vendorOptions}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
        ) : (
          <Box></Box>
        )}
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
            name="OtherDetails.empStatus"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                {...field}
                label="EPM Status"
                placeholder="Select EPM Status"
                error={!!error}
                helperText={error?.message}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                options={[
                  { value: "1", label: "Active" },
                  { value: "2", label: "Inactive" },
                ]}
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

export default OtherDetails;
