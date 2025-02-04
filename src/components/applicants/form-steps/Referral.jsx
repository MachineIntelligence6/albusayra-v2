// example Number
// +1 123-456-7890: true
// 123-456-7890: true
// +91 123 456 7890: true
// (123) 456-7890: false

// 456-7890: false

import React, { createElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomCountryCodeInput from "@/components/shared-components/CustomCountryCodeInput";
import CaptionText from "@/components/shared-components/CaptionText";
import { countryCodes, isNumeric } from "@/utils/hard-data/common";
import { custom } from "@/app/theme";
import { Phone } from "lucide-react";

export const Referral = ({ control }) => {
  const { setValue, clearErrors, setError } = useFormContext();

  const fields = [
    {
      label: "Referral By Whom (UAE)",
      name: "referralName",
      required: true,
      placeholder: "e.g John",
      component: "CustomTextField",
    },
    {
      label: "Referral Phone Number (UAE)",
      name: "referralPhone",
      required: true,
      placeholder: "123 456 7890",
      // component: "CustomCountryCodeInput",
      // countryCodes,
      component: "CustomTextField",
      icon: <Phone />, // Pass country codes for country code input
    },
    {
      label: "Referral Address (UAE)",
      name: "referralAddress",
      required: true,
      placeholder: "Street, 08, Jamal Resident, UAE",
      component: "CustomTextField",
    },
  ];

  const handlePhoneNumberWithCode = (data) => {
    if (Object.keys(data).length) {
      if (isNumeric(data.number.number)) {
        const newValue = {
          countryCode: data.number.countryCode,
          number: data.number.number,
        };
        setValue(data.name, newValue);
        clearErrors(data.name);
      } else {
        setError(data.name, {
          type: "manual",
          message: "Please enter numbers only",
        });
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {fields.map(
        (
          { label, name, icon, required, placeholder, component, countryCodes },
          index
        ) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            {/* Render label */}
            <Box
              sx={{ flex: "0 0 40%", textalign: "left", paddingRight: "1rem" }}
            >
              <CaptionText text={label} required={required} />
            </Box>

            {/* Render input component */}
            <Box sx={{ flex: "1", width: "80%" }}>
              <Controller
                name={name}
                control={control}
                defaultValue={
                  component === CustomCountryCodeInput
                    ? { countryCode: countryCodes[0].code, number: "" }
                    : ""
                }
                render={
                  ({ field, fieldState: { error } }) => {
                    return (
                      <>
                        {component === "CustomTextField" && (
                          <CustomTextField
                            error={error}
                            onChange={field.onChange}
                            value={field.value}
                            placeholder={placeholder}
                          />
                        )}
                        {component === "CustomCountryCodeInput" && (
                          <CustomCountryCodeInput
                            value={field.value}
                            onChange={(data) => handlePhoneNumberWithCode(data)}
                            countryCodes={countryCodes}
                            placeholder={placeholder}
                            name={field.name}
                            error={error}
                            icon={icon}
                          />
                        )}
                      </>
                    );
                  }

                  // createElement(component, {
                  //   value: field.value,
                  //   onChange: field.onChange,
                  //   placeholder,
                  //   error,
                  //   helperText: error?.message,
                  //   ...(component === CustomCountryCodeInput && { countryCodes }),
                  // })
                }
              />
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};
