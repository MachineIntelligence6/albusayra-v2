import React, { createElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import CustomSelect from "@/components/shared-components/CustomSelect";
import ImageUpload from "../ImageUpload";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CaptionText from "@/components/shared-components/CaptionText";
import { custom } from "@/app/theme";
import PhoneIcon from "@mui/icons-material/Phone";
import CustomCountryCodeInput from "@/components/shared-components/CustomCountryCodeInput";

export const CompanyInfo = ({ control, errors }) => {
  const { setValue } = useFormContext();
  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
  ];

  const fields = [
    {
      label: "Company Abbreviation",
      name: "abbreviation",
      required: true,
      component: CustomTextField,
    },
    {
      label: "Company Name",
      name: "companyName",
      required: true,
      component: CustomTextField,
    },
    {
      label: "Industry",
      name: "industry",
      placeholder: "Delivery Service",
      required: true,
      component: CustomSelect,
      options: [
        { value: "Delivery Service", label: "Delivery Service" },
        { value: "Delivery Service B", label: "Delivery Service" },
        { value: "Delivery Service C", label: "Delivery Service" },
      ],
    },
    {
      label: "Corporate Website (Optional)",
      name: "website",
      required: false,
      component: CustomTextField,
    },
    {
      label: "Company Phone Number",
      name: "phone",
      required: true,
      placeholder: "123 456 7890",
      component: CustomTextField,
      adornment: <PhoneIcon />,
      component: CustomCountryCodeInput,
      countryCodes,
    },
    {
      label: "Business Address",
      name: "address",
      required: true,
      component: CustomTextField,
    },
    {
      label: "Country",
      name: "country",
      placeholder: "United Arab Emirates",
      required: true,
      component: CustomSelect,
      options: [
        { value: "Pakistan", label: "Pakistan" },
        { value: "United Arab Emirates", label: "United Arab Emirates" },
        { value: "Afghanistan", label: "Afghanistan" },
      ],
    },
    {
      label: "State/Province",
      name: "state",
      placeholder: "United Arab Emirates",
      required: true,
      component: CustomSelect,
      options: [
        { value: "Pakistan", label: "Pakistan" },
        { value: "United Arab Emirates", label: "United Arab Emirates" },
        { value: "Afghanistan", label: "Afghanistan" },
      ],
    },
    {
      label: "City",
      name: "city",
      placeholder: "United Arab Emirates",
      required: true,
      component: CustomSelect,
      options: [
        { value: "Pakistan", label: "Pakistan" },
        { value: "United Arab Emirates", label: "United Arab Emirates" },
        { value: "Afghanistan", label: "Afghanistan" },
      ],
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Controller
        name="profileImage"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <ImageUpload
            uploadedImage={field.value}
            onFileChange={(file) => setValue("profileImage", file)}
            error={error?.message || null}
          />
        )}
      />

      {fields.map(
        (
          {
            label,
            name,
            required,
            placeholder,
            options,
            component,
            adornment,
            countryCodes,
          },
          index
        ) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Box
              sx={{ flex: "0 0 40%", textalign: "left", paddingRight: "1rem" }}
            >
              <CaptionText text={label} required />
            </Box>

            {/* Render input component */}
            <Box sx={{ flex: "1", width: "80%" }}>
              <FormControl fullWidth>
                <Controller
                  name={name}
                  control={control}
                  rules={{ required: required }}
                  defaultValue={
                    component === CustomCountryCodeInput
                      ? { countryCode: countryCodes[0].code, number: "" }
                      : ""
                  }
                  render={({ field, fieldState: { error } }) =>
                    component === CustomCountryCodeInput
                      ? createElement(component, {
                          value: field.value,
                          onChange: field.onChange,
                          countryCodes,
                          placeholder,
                          error,
                        })
                      : createElement(component, {
                          value: field.value,
                          onChange: field.onChange,
                          placeholder,
                          options,
                          error,
                          InputProps: adornment
                            ? {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {adornment}
                                  </InputAdornment>
                                ),
                              }
                            : undefined,
                        })
                  }
                />
              </FormControl>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};
