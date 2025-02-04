import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, FormControl } from "@mui/material";
import InputLabelTop from "./InputLabel";
import { custom } from "@/app/theme";

const CustomTextField = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder = "",
    error,
    helperText,
    fullWidth = true,
    height = 38,
    sx,
    type = "text",
    multiline = false,
    required,
    startAdornment,
    endAdornment,
    rows,
    icon,
    iconPosition = "start",
    removeRightBorder = false,
    textProps,
    bgColor, // New bgColor prop
    ...rest
  } = props;

  // console.log(error);
  return (
    <FormControl sx={{ ...sx }} fullWidth={fullWidth} error={!!error}>
      {label && <InputLabelTop text={label} required={required} />}
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        multiline={multiline}
        size="small"
        rows={multiline ? rows : undefined}
        error={!!error}
        helperText={error ? error.message || helperText : helperText}
        InputProps={{
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "7px",
            paddingY: "1px",
            height: height,
            backgroundColor: bgColor || "transparent",
            color: custom.primaryText,
            fontSize: "15px",
          },
          "& .MuiFormHelperText-root": {
            margin: 0,
            fontFamily: "Public Sans, sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.5,
            color: "#d32f2f",
          },
          ...(removeRightBorder && {
            "& .MuiOutlinedInput-notchedOutline": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }),
        }}
        {...rest}
      />
    </FormControl>
  );
};

CustomTextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  icon: PropTypes.node, // The icon component to display
  iconPosition: PropTypes.oneOf(["start", "end"]), // Position of the icon
  removeRightBorder: PropTypes.bool, // New prop to remove right border and radius
  bgColor: PropTypes.string, // bgColor prop for background color
};

export default CustomTextField;
