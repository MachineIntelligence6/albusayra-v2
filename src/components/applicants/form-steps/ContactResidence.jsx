import React, { createElement, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, InputAdornment } from "@mui/material";
import CustomSelect from "@/components/shared-components/CustomSelect";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CustomCountryCodeInput from "@/components/shared-components/CustomCountryCodeInput";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CaptionText from "@/components/shared-components/CaptionText";
import { isNumeric } from "@/utils/hard-data/common";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByStatus } from "@/redux/reducers/dataBank/dataBankThunk";

export const ContactResidence = ({
  control,
  isUaeResident,
  proceedDetails,
}) => {
  const { setValue, clearErrors, setError } = useFormContext();
  const [countryOptions, setCountryOptions] = useState([]);
  const { getCountryByStatuses } = useSelector((state) => state.dataBankSlice);

  const dispatch = useDispatch();
  // Get Countries
  useEffect(() => {
    const params = { page: 1, pageLength: 1000, statuses: 1 };
    dispatch(getCountriesByStatus(params));
  }, [dispatch]);

  // Update country options
  useEffect(() => {
    if (getCountryByStatuses?.length > 0) {
      const formattedOptions = getCountryByStatuses.map((country) => ({
        value: country.id,
        label: country.countryName,
      }));
      setCountryOptions(formattedOptions);
    }
  }, [getCountryByStatuses]);

  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
  ];

  const fields = [
    {
      label: "Email Address",
      name: "email",
      required: true,
      placeholder: "Enter your email address",
      component: CustomTextField,
      adornment: <MailOutlineIcon />,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      required: true,
      placeholder: "123 456 7890",
      adornment: <PhoneIcon />,
      component: CustomTextField,
      // component: CustomCountryCodeInput,
      // countryCodes,
      // icon: <PhoneIcon />,
    },
    {
      label: "WhatsApp Number",
      name: "whatsappNumber",
      required: false,
      placeholder: "123 456 7890",
      adornment: <WhatsAppIcon />,
      component: CustomTextField,
      // component: CustomCountryCodeInput,
      // countryCodes,
      // icon: <WhatsAppIcon />,
    },
    ...(isUaeResident
      ? []
      : [
          {
            label: "Current Country Residence",
            name: "currentCountryResidence",
            required: isUaeResident ? true : false,
            options: countryOptions,
            component: CustomSelect,
          },
          {
            label: "Nationality",
            name: "nationality",
            required: isUaeResident ? true : false,
            options: [
              { value: "pakistani", label: "Pakistani" },
              { value: "indian", label: "Indian" },
            ],
            component: CustomSelect,
          },
        ]),
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

  // Update Data
  useEffect(() => {
    if (proceedDetails) {
      // console.log("object", proceedDetails?.nationality);
      setValue("email", proceedDetails?.email || "");
      setValue("phoneNumber", proceedDetails?.contactNumber || "");
      setValue("whatsappNumber", proceedDetails?.whatsAppNo || "");
      setValue("nationality", proceedDetails?.nationality || "");
      setValue(
        "currentCountryResidence",
        proceedDetails?.residentCountry?.id ||
          proceedDetails?.currentCountry?.id ||
          proceedDetails?.residentCountry?.id
      );

      // setValue(
      //   "currentCountryResidence",
      //   proceedDetails?.residentCountry?.id
      //     ? proceedDetails?.residentCountry?.id
      //     : proceedDetails?.currentCountry?.id
      // );
    }
  }, [proceedDetails]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {fields.map(
        (
          {
            label,
            name,
            placeholder,
            options,
            component = CustomSelect,
            adornment,
            countryCodes,
            icon,
            required,
          },
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
                render={({ field, fieldState: { error } }) => {
                  if (component === CustomCountryCodeInput) {
                    return createElement(component, {
                      value: field.value,
                      onChange: (data) => handlePhoneNumberWithCode(data),
                      countryCodes,
                      placeholder,
                      name: field.name,
                      error,
                      icon,
                    });
                  } else if (component === CustomSelect) {
                    return createElement(component, {
                      value: field.value,
                      onChange: field.onChange,
                      required,
                      options,
                      error,
                    });
                  } else if (component === CustomTextField) {
                    return createElement(component, {
                      value: field.value,
                      onChange: field.onChange,
                      placeholder,
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
                    });
                  }
                  return null;
                }}
              />
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};
