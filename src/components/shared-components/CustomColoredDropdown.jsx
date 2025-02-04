import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
import PanToolIcon from "@mui/icons-material/PanTool";

const statusOptions = [
  {
    value: "not_qualified",
    label: "Not Qualified",
    icon: <CancelIcon sx={{ fontSize: 20 }} />,

    backgroundColor: "#E64449",
    textColor: "#ffffff",
    menuBackgroundColor: "#FFDBDC",
    menuTextColor: "#991b1b",
  },
  {
    value: "hold",
    label: "Hold",
    icon: <PanToolIcon sx={{ fontSize: 20 }} />,
    backgroundColor: "#FF9F43",
    textColor: "#FFFFFF",
    menuBackgroundColor: "",
    menuTextColor: "#FF9F43",
  },
];

export const StatusDropdown = ({
  value,
  onChange,
  sx = {},
  onOptionClick,
  placeholder,
  ...props
}) => {
  const selectedStatus = statusOptions.find((option) => option.value === value);

  return (
    <FormControl fullWidth={props.fullWidth}>
      <Select
        value={value}
        onChange={onChange}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          width: "180px",
          // height: "40px",
          borderRadius: "6px",
          backgroundColor: selectedStatus?.backgroundColor || "#ffffff",
          color: selectedStatus?.textColor || "#000000",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(0, 0, 0, 0.12)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(0, 0, 0, 0.12)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(0, 0, 0, 0.12)",
          },
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
          },
          "& .MuiSvgIcon-root": {
            color: "inherit",
          },
          ...sx,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: "9px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            },
          },
        }}
        {...props}
      >
        {statusOptions?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            onClick={() => {
              if (onOptionClick) {
                onOptionClick(option.value);
              }
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: 15,
              backgroundColor: option.menuBackgroundColor,
              color: option.menuTextColor,
              m: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// Usage example:

//     <StatusDropdown
//       value={status}
//       onChange={handleChange}
// You can now pass any additional Select props
//       disabled={false}
//       error={false}
// ... any other Select props
//     />
