import React, { useState } from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import CustomButton from "./CustomButton";
import { ChevronDown, ChevronUp } from "lucide-react";

const defaultOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const CustomDropdownButton = (props) => {
  const { options = defaultOptions, selectedValue, setSelectedValue } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Open Menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Select an item and close Menu
  const handleClose = (option) => {
    if (option?.value) setSelectedValue(option); // Update selected text
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "fit-content" }}>
      {/* Button to trigger the dropdown */}
      <CustomButton
        onClick={handleClick}
        endIcon={open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      >
        {selectedValue?.label}
      </CustomButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{minWidth: 200, display: "flex", flexDirection: "column" }}>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleClose(option)}
              selected={selectedValue.label === option.label}
              sx={{ mx: 1 }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default CustomDropdownButton;
