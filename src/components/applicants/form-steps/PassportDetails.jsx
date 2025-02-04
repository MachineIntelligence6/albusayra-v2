import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, FormControlLabel, Typography } from "@mui/material";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomDateField from "@/components/shared-components/CustomDateField";
import IOSSwitch from "@/components/ui/switch-button";
import CaptionText from "@/components/shared-components/CaptionText";
import CustomSelect from "@/components/shared-components/CustomSelect";
import DescriptiveText from "@/components/shared-components/DescriptiveText";

export const PassportDetails = ({
  control,
  isUaeResident,
  proceedDetails,
  isActive,
  setIsActive,
}) => {
  const { setValue } = useFormContext();

  const handleUploadFile = (file) => {
    setValue("passportCopy", file);
  };

  // console.log("isUaeResident", isUaeResident);

  const fields = [
    {
      label: "Passport No.",
      name: "passportNumber",
      required: true,
      placeholder: "ABCD-234353",
      component: "CustomTextField",
    },
    {
      label: "Passport Issue Date",
      name: "passportIssueDate",
      required: true,
      placeholder: "20-10-2028",
      component: "CustomDateField",
      props: { borderRadius: 1.5 },
    },
    {
      label: "Passport Expiry Date",
      name: "passportExpiryDate",
      required: true,
      placeholder: "20-10-2028",
      component: "CustomDateField",
      props: { borderRadius: 1.5 },
    },
    {
      label: "Passport Copy",
      name: "passportCopy",
      required: true,
      placeholder: "Upload Passport Copy",
      component: "CustomFileUploadField",
      props: {
        accept: ".pdf",
        buttonText: "Upload",
        height: 38,
      },
    },
    ...(isUaeResident
      ? [
          {
            label: "Do you have valid work visa?",
            name: "IsValidWorkVisa",
            placeholder: "Yes/No",
            required: isUaeResident ? true : false,
            component: "CustomSelect",
            options: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
          },
        ]
      : [
          {
            label: "Visa Applied",
            name: "visaApplied",
            required: isUaeResident ? true : false,
            component: "IOSSwitch",
          },
        ]),
  ];

  // Update Data
  useEffect(() => {
    if (proceedDetails) {
      setValue("passportNumber", proceedDetails?.passportNo || "");
      setValue("passportCopy", proceedDetails?.passportImage || "");
      setValue(
        "IsValidWorkVisa",
        proceedDetails?.isValidWorkVisa === true ? "Yes" : "No"
      );
      setValue("visaApplied", proceedDetails?.isVisaApplied || "");
      setValue(
        "passportIssueDate",
        proceedDetails?.passportIssueDate
          ? new Date(proceedDetails?.passportIssueDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
      setValue(
        "passportExpiryDate",
        proceedDetails?.passportExpiryDate
          ? new Date(proceedDetails?.passportExpiryDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
    }
  }, [proceedDetails]);

  // const [isActive, setIsActive] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {fields.map(
        (
          { component, label, name, required, placeholder, options, props },
          index
        ) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Box
              sx={{
                flex: "0 0 40%",
                textalign: "left",
                paddingRight: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <CaptionText text={label} required={required} />
              {label === "Visa Applied" && (
                <IOSSwitch
                  sx={{ ml: 2 }}
                  // defaultChecked
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                  // onChange={(e) => setIsActive(e.target.checked)}
                />
              )}
            </Box>

            <Box sx={{ flex: "1", width: "80%" }}>
              <Controller
                name={name}
                control={control}
                defaultValue={component === "IOSSwitch" ? false : ""}
                render={({ field, fieldState: { error } }) => {
                  // return renderInputComponent(field, { ...fieldProps, error })

                  return (
                    <>
                      {component === "CustomTextField" && (
                        <CustomTextField
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          placeholder={placeholder}
                          {...props}
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
                          {...props}
                        />
                      )}
                      {component === "CustomFileUploadField" && (
                        <CustomFileUploadField
                          placeholder={field.placeholder}
                          error={error}
                          required={field.required}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )}
                      {component === "CustomSelect" && (
                        <CustomSelect
                          error={error}
                          onChange={field.onChange}
                          value={field.value}
                          options={options}
                          placeholder={placeholder}
                          {...props}
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

      {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <DescriptiveText
          text="Visa Applied"
          fontSize={16}
          fontWeight={500}
          // color={custom.primaryText}
        />
        <FormControlLabel
          control={
            <IOSSwitch
              sx={{ ml: 2 }}
              // defaultChecked
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              // onChange={(e) => setIsActive(e.target.checked)}
            />
          }
        />
      </Box> */}
    </Box>
  );
};
