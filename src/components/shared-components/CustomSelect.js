import React from "react";
import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { custom } from "@/app/theme";

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = "Please Select",
  error,
  fullWidth = true,
  height = 38,
  sx,
  ...rest
}) => {
  // console.log("object", value);

  return (
    <FormControl
      sx={{ minWidth: 120, ...sx }}
      error={!!error}
      fullWidth={fullWidth}
    >
      <Select
        sx={{
          borderRadius: "7px",
          padding: "0",
          height: height,
          "& .MuiSelect-select": {
            padding: "11px",
            backgroundColor: "#FCFCFC",
            color: custom.primaryText,
          },
        }}
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": placeholder }}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          PaperProps: {
            sx: {
              padding: "0",
            },
          },
        }}
        {...rest}
      >
        <MenuItem value="">
          <Typography
            variant="body2"
            color={custom.placeHolder}
            sx={{ fontSize: "14px" }}
          >
            {placeholder}
          </Typography>
        </MenuItem>
        {options?.map((option) => (
          <MenuItem
            sx={{ fontSize: "15px", color: custom.primaryText }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <Typography color="error">{error.message}</Typography>}
    </FormControl>
  );
};

CustomSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.object,
  fullWidth: PropTypes.bool,
  sx: PropTypes.object,
};

export default CustomSelect;

// ============================usage of that component=========================

{
  /* 
  <CustomSelect
  value={selectedValue}
  onChange={onChange}
  labelId="residency-label"       //---- optional
  id="residency"                 //----- optional
  options={[
    { value: "resident", label: "UAE Resident" },
    { value: "non-resident", label: "Non UAE Resident" },
  ]}
  placeholder="Non UAE Resident"
  error={error}
/>; 
*/
}
