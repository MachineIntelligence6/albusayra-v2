import React from "react";
import PropTypes from "prop-types";
import { TextField, FormControl, FormHelperText } from "@mui/material"; // Import the calendar icon
import InputLabelTop from "./InputLabel";
import { custom } from "@/app/theme";

const CustomDateField = ({
  label,
  placeholder = "Select date",
  value,
  onChange,
  error,
  helperText,
  fullWidth = true,
  textProps = {},
  sx = {},
  helperTextFontSize = 13,
  required = false,
  borderRadius = 2,
  height = 38,
  bgcolor = "transparent",
  isDateTime = false,
  ...props
}) => {
  // console.log(error);

  return (
    <FormControl
      sx={{
        ...sx,
        borderRadius: borderRadius,
        width: fullWidth ? "100%" : "auto",
      }}
      fullWidth={fullWidth}
      error={!!error}
    >
      {label && <InputLabelTop text={label} required={required} />}

      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={isDateTime ? "datetime-local" : "date"}
        size="small"
        variant="outlined"
        sx={{
          height: height,
          borderRadius: borderRadius,
          border: error ? `1px solid ${custom.errorDark}` : "inherit",
          "& .MuiOutlinedInput-root": {
            height: height,
            borderRadius: borderRadius,
            backgroundColor: bgcolor,
          },
        }}
        {...props}
      />
      {helperText && (
        <FormHelperText
          sx={{
            color: custom.errorDark,
            marginTop: "4px",
            fontSize: helperTextFontSize,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CustomDateField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  textProps: PropTypes.object,
  borderRadius: PropTypes.number, // Custom border radius for the date field
  height: PropTypes.number, // Custom height for the date field
  bgcolor: PropTypes.string, // Custom background color for the date field
};

export default CustomDateField;
