import React, { createElement, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CaptionText from "@/components/shared-components/CaptionText";
import CustomDateField from "@/components/shared-components/CustomDateField";

export const EmiratesID = ({ control, proceedDetails, isUaeResident }) => {
  const { setValue } = useFormContext();

  const fields = [
    {
      label: "Nationality",
      name: "nationality",
      required: isUaeResident ? true : false,
      options: [
        { value: "pakistani", label: "Pakistani" },
        { value: "indian", label: "Indian" },
      ],
      placeholder: "UAE",
      component: "CustomSelect",
    },
    {
      label: "Emirates ID No.",
      name: "emiratesIDNumber",
      required: true,
      placeholder: "784-2003-1389613-4",
      component: "CustomTextField",
    },
    {
      label: "Emirates ID Issue Date",
      name: "emiratesIDIssueDate",
      required: true,
      placeholder: "10-09-2018",
      component: "CustomDateField",
    },
    {
      label: "Emirates ID Expiry Date",
      name: "emiratesIDExpiryDate",
      required: true,
      placeholder: "10-09-2026",
      component: "CustomDateField",
    },
    {
      label: "Emirates ID (Front)",
      name: "emiratesIDFront",
      required: true,
      placeholder: "PDF Scanned",
      component: "CustomFileUploadField",
    },
    {
      label: "Emirates ID (Back)",
      name: "emiratesIDBack",
      required: true,
      placeholder: "PDF Scanned",
      component: "CustomFileUploadField",
    },
    {
      label: "Upload Residency/Iqama",
      name: "residencyIqama",
      required: true,
      placeholder: "PDF Scanned",
      component: "CustomFileUploadField",
    },
  ];

  // Update Data
  useEffect(() => {
    if (proceedDetails) {
      setValue("nationality", proceedDetails?.nationality);
      setValue("emiratesIDNumber", proceedDetails?.emiratesId);
      setValue(
        "emiratesIDIssueDate",
        proceedDetails?.emiratesIdIssueDate
          ? new Date(proceedDetails?.emiratesIdIssueDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
      setValue(
        "emiratesIDExpiryDate",
        proceedDetails?.emiratesIdExpiryDate
          ? new Date(proceedDetails?.emiratesIdExpiryDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
      // if (proceedDetails?.emiratesIdImageFront) {
      //   setValue("emiratesIDFront", {
      //     name: "emiratesIdImageFront.pdf",
      //     url: proceedDetails?.emiratesIdImageFront,
      //   });
      // }
      setValue("emiratesIDFront", proceedDetails?.emiratesIdImageFront);
      setValue("emiratesIDBack", proceedDetails?.emiratesIdImageBack);
      setValue("residencyIqama", proceedDetails?.iqamaDocImage);
    }
  }, [proceedDetails]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {fields.map(
        ({ label, name, required, placeholder, component, options }, index) => (
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
                      {component === "CustomSelect" && (
                        <CustomSelect
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          options={options}
                          placeholder={placeholder}
                        />
                      )}
                      {component === "CustomTextField" && (
                        <CustomTextField
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          options={options}
                          placeholder={placeholder}
                        />
                      )}
                      {component === "CustomDateField" && (
                        <CustomDateField
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          helperText={error?.message && error?.message}
                          placeholder={placeholder}
                          helperTextFontSize={16}
                        />
                      )}
                      {component === "CustomFileUploadField" && (
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
