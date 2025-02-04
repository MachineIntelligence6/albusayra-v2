import React from "react";
import { Box } from "@mui/material";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Controller } from "react-hook-form";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import ImageUpload from "@/components/applicants/ImageUpload";

const BikeInfoForm = ({ control, options }) => {
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
          width: "780px",
        }}
      >
        <Controller
          name="BasicInfo.image"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ImageUpload
              uploadedImage={field.value} // Always use field.value
              onFileChange={(file) => field.onChange(file)}
              error={error?.message || null}
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
          name="BasicInfo.fullName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Full Name As per Emirates ID"
              error={!!error}
              placeholder="Enter Full Name"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />

        <Controller
          name="BasicInfo.gender"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Gender"
              error={!!error}
              helperText={error?.message}
              options={options?.genderOptions}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="BasicInfo.dob"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Date of Birth"
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
          name="BasicInfo.religion"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Religion"
              error={!!error}
              helperText={error?.message}
              options={options.religionOptions}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="BasicInfo.nationality"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Nationality"
              error={!!error}
              helperText={error?.message}
              value={field.value || ""}
              options={[
                { value: "pakistani", label: "Pakistani" },
                { value: "indian", label: "Indian" },
              ]}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="BasicInfo.maritalStatus"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Marital Status"
              error={!!error}
              helperText={error?.message}
              options={options.maritalStatusOptions}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
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
            name="BasicInfo.employmentType"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                label="Employment Type"
                error={!!error}
                helperText={error?.message}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                options={[
                  { value: "Full Time", label: "Full Time" },
                  { value: "Part Time", label: "Part Time" },
                  { value: "Contractor", label: "Contractor" },
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

export default BikeInfoForm;
