import React from "react";
import { Box } from "@mui/material";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Controller } from "react-hook-form";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";

const BikeInfoForm = ({ control, options, onCountryChange, onStateChange }) => {
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
          name="bikeInfo.vendorName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Vendor Name"
              error={!!error}
              helperText={error?.message}
              options={options.vendorOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="bikeInfo.acquiredDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Bike Purchased/Acquired Date"
              placeholder="DD/MM/YYYY"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="bikeInfo.regCountry"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Bike Registration Country"
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
          name="bikeInfo.regState"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Bike Registration State"
              error={!!error}
              helperText={error?.message}
              options={options.stateOptions}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                onStateChange(e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="bikeInfo.regCity"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Bike Registration City"
              error={!!error}
              helperText={error?.message}
              options={options.cityOptions}
              value={field.value || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="bikeInfo.regDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDateField
              label="Bike Registration Date"
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
          name="bikeInfo.plateNo"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Bike Plate Number"
              error={!!error}
              placeholder="Enter Bike Plate Number"
              helperText={error ? error.message : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="bikeInfo.healthCheck"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Bike Health Check"
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
        <Controller
          name="bikeInfo.type"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomDropdown
              label="Bike Type"
              error={!!error}
              helperText={error?.message}
              options={options.bikeTypeOptions}
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
          name="bikeInfo.chassesNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Chasses Number"
              placeholder="Enter Chasses Number"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="bikeInfo.manufactureer"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Bike Manufacturer"
              placeholder="Bike Manufacturer"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="bikeInfo.modal"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              label="Bike Model"
              placeholder="Enter Bike Model"
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
            name="bikeInfo.number"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                label="Bike Number"
                placeholder="Enter Bike Number"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="bikeInfo.cost"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                label="Bike Cost"
                placeholder="Enter Bike Cost"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Controller
            name="bikeInfo.picture"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomFileUploadField
                label="Bike Picture"
                placeholder="Jpg, Pdf, Png"
                error={!!error}
                helperText={error?.message}
                {...field}
                // value={field.value} // Pass existing file name or file object
                // onChange={(file) => field.onChange(file)}
              />
            )}
          />
        </Box>
        {/* <Box sx={{ flex: 1 }}></Box> */}
      </Box>
    </Box>
  );
};

export default BikeInfoForm;
