import { Box } from "@mui/material";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { LockKeyhole } from "lucide-react";
import { Controller } from "react-hook-form";
import CustomDateField from "@/components/shared-components/CustomDateField";
import { useEffect, useState } from "react";

const Visa = ({ control, options, onCompanyChange, editData }) => {
  const [isVisaTypeCompany, setIsVisaTypeCompany] = useState(false);
  useEffect(() => {
    if (editData?.visaType == "Own Visa") {
      setIsVisaTypeCompany(true);
    } else {
      setIsVisaTypeCompany(false);
    }
  }, [editData?.visaType]);
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
          name="Visa.uaeResidencyIqamaNo"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="UAE Residency / Iqama No."
              error={!!error}
              placeholder="Enter UAE Residency / Iqama No."
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="Visa.visaIssueDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Visa Issue Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="Visa.visaExpiryDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Visa Expiry Date"
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
            name="Visa.uaeResidencyIqama"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="UAE Residency/Iqama"
                placeholder="Upload UAE Residency/Iqama (JPG, PNG, PDF up to 5MB)"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="Visa.companyName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                label="Company Name"
                error={!!error}
                helperText={error?.message}
                options={options.companyName}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onCompanyChange(e.target.value);
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="Visa.companyLocation"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                label="Company Location"
                error={!!error}
                helperText={error?.message}
                options={options.companyLocationOptions}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
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
        <Box sx={{ flex: 1 }}>
          <Controller
            name="Visa.visaType"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                label="VISA Type"
                error={!!error}
                helperText={error?.message}
                options={options.visaTypeOptions}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setIsVisaTypeCompany(e.target.value === "Own Visa"); // Update state based on selection
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          {!isVisaTypeCompany && (
            <Controller
              name="Visa.visaAppliedVia"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomDropdown
                  label="VISA Applied Via"
                  error={!!error}
                  helperText={error?.message}
                  value={field.value || ""}
                  options={options.companyName}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          )}
        </Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </Box>
  );
};

export default Visa;
