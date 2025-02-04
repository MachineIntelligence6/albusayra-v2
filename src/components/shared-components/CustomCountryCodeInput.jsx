import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { countryCodes } from "@/utils/hard-data/common";
import { custom } from "zod";

const defaultCodes = countryCodes;
const CustomCountryCodeInput = ({
  countryCodes = defaultCodes,
  value,
  onChange,
  error,
  icon,
  placeholder,
  label, // Label passed as a prop
  required = false, // If the field is required
  bgcolor = "#FCFCFC", // Default background color
  height = "38px", // Default height
  name = "any-name",
}) => {
  // console.log(error);
  const handleCountryCodeChange = (e) => {
    const countryCode = e.target.value;
    onChange({ name: e.target.name, number: { ...value, countryCode } });
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    onChange({ name: e.target.name, number: { ...value, number } });
  };

  return (
    <>
      {/* Label */}
      {label && (
        <Typography
          variant="body2"
          sx={{
            marginBottom: "4px",
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 2,
            color: custom.primaryText, // Space between label and input
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </Typography>
      )}

      {/* Box Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Ensure label is above the fields
          border: `1px solid ${error ? "#E64449" : "lightgray"}`,
          borderRadius: "8px",
          paddingX: "7px",
          width: "100%", // Ensures the full width is utilized
          backgroundColor: bgcolor,
          height: height,
        }}
      >
        {/* FormControl for Country Code Select */}
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "60%",
            height: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              boxShadow: "none",
            },
            "& fieldset": {
              border: "none",
            },
          }}
        >
          <InputAdornment position="start">{icon}</InputAdornment>
          {/* Country Code Select */}
          <Select
            value={value?.countryCode}
            onChange={(e) => handleCountryCodeChange(e)}
            name={name}
            sx={{
              width: "30%", // Country code dropdown width
              "& .MuiSelect-select": {
                paddingLeft: 0,
                py: 1,
                borderRight: "2px solid lightgray", // Add border to the right to separate
              },
            }}
            renderValue={(selected) => {
              return (
                <Typography>
                  {selected ? selected : countryCodes[0].code}
                </Typography>
              );
            }}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
          >
            {countryCodes?.map((item) => (
              <MenuItem
                key={item.code}
                value={item.code}
                defaultValue={item.code}
              >
                {item.code}
              </MenuItem>
            ))}
          </Select>

          {/* Phone Number TextField */}
          <TextField
            value={value?.number}
            onChange={(e) => handleNumberChange(e)}
            name={name}
            placeholder={placeholder}
            sx={{
              width: "70%", // Phone number input width
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
                boxShadow: "none",
              },
              "& fieldset": {
                border: "none",
              },
              "& .MuiOutlinedInput-input": {
                padding: "10px",
              },
            }}
            variant="outlined"
            size="small"
          />
        </FormControl>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography
          color="error"
          variant="caption"
          fontSize={16}
          sx={{ marginTop: "4px" }}
        >
          {error?.number?.message || error?.message}
        </Typography>
      )}
    </>
  );
};

export default CustomCountryCodeInput;
