import React, { createElement, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";

import CaptionText from "@/components/shared-components/CaptionText";

export const DrivingLicense = ({ control, isUaeResident, proceedDetails }) => {
  const { setValue } = useFormContext();
  const fields = [
    {
      label: `${isUaeResident ? "UAE" : "Local"} Driving License Holder`,
      name: "isLicenseHolder",
      placeholder: "Yes/No",
      required: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      type: "CustomSelect",
    },
    {
      label: `${isUaeResident ? "UAE" : "Local"} Driving License Number`,
      name: "licenseNumber",
      required: true,
      placeholder: "8793462923",
      type: "CustomTextField",
    },
    ...(isUaeResident
      ? [
          {
            label: "Driving License (Front)",
            name: "LicenseImageFront",
            required: true,
            placeholder: "PDF Scanned",
            type: "CustomFileUploadField",
          },
          {
            label: "Driving License (Back)",
            name: "LicenseImageBack",
            required: true,
            placeholder: "PDF Scanned",
            type: "CustomFileUploadField",
          },
        ]
      : []),
    {
      label: "Driving License Issue Date",
      name: "licenseIssueDate",
      required: true,
      type: "CustomDateField",
      props: { borderRadius: 1.5 },
    },
    {
      label: "Driving License Expiry Date",
      name: "licenseExpiryDate",
      required: true,
      placeholder: "20-10-2028",
      type: "CustomDateField",
      props: { borderRadius: 1.5 },
    },
  ];

  // Update Data
  useEffect(() => {
    if (proceedDetails) {
      setValue("isLicenseHolder", proceedDetails?.drivingLicenseHolder || "");
      setValue("licenseNumber", proceedDetails?.drivingLicenseNo || "");
      setValue("LicenseImageFront", proceedDetails?.licenseImageFront || "");
      setValue("LicenseImageBack", proceedDetails?.licenseImageBack || "");
      setValue(
        "licenseIssueDate",
        proceedDetails?.licenseIssueDate
          ? new Date(proceedDetails?.licenseIssueDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
      setValue(
        "licenseExpiryDate",
        proceedDetails?.licenseExpiryDate
          ? new Date(proceedDetails?.licenseExpiryDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
    }
  }, [proceedDetails]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {fields.map(
        (
          { label, name, required, placeholder, options, type, props = {} },
          index
        ) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Box
              sx={{ flex: "0 0 40%", textalign: "left", paddingRight: "1rem" }}
            >
              <CaptionText text={label} required={required} />
            </Box>
            <Box sx={{ flex: "1", width: "80%" }}>
              <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field, fieldState: { error } }) => {
                  return (
                    <>
                      {type === "CustomSelect" && (
                        <CustomSelect
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          options={options}
                          placeholder={placeholder}
                          {...props}
                        />
                      )}
                      {type === "CustomTextField" && (
                        <CustomTextField
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          placeholder={placeholder}
                          {...props}
                        />
                      )}
                      {type === "CustomDateField" && (
                        <CustomDateField
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          helperText={error?.message && error?.message}
                          placeholder={placeholder}
                          helperTextFontSize={16}
                          {...props}
                        />
                      )}
                      {type === "CustomFileUploadField" && (
                        <CustomFileUploadField
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          options={options}
                          placeholder={placeholder}
                        />
                      )}
                    </>
                  );
                }}
              />
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};
