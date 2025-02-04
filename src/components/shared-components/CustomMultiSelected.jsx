import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabelTop from "./InputLabel";
import { Box, Checkbox, Stack, Typography } from "@mui/material";
import { custom } from "@/app/theme";
import { ChevronDown, ChevronUp } from "lucide-react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Default options
const defaultOption = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

function getStyles(optionValue, selected, theme) {
  return {
    fontWeight: selected.includes(optionValue)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const CustomMultiSelected = (props) => {
  const {
    label,
    options = defaultOption,
    value,
    onChange,
    placeholder,
    required = false,
    multiSelect = true,
  } = props;

  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle changes in selection
  // const handleChange = (event) => {
  //     const {
  //         target: { value },
  //     } = event;
  //     console.log("Selected value:", value);
  //     setSelected(typeof value === 'string' ? value.split(',') : value);
  //     if (onChange) onChange(value);
  // };

  // const handleChange = (event) => {
  //   const { value } = event.target; // Getting the value from event.target
  //   setSelected(typeof value === "string" ? value.split(",") : value);
  //   if (onChange) onChange(value); // Call onChange directly with value
  // };
  const handleChange = (event) => {
    const { value } = event.target;

    if (!multiSelect) {
      // If multiSelect is false, toggle the selection
      if (selected.includes(value)) {
        setSelected([]); // Deselect the item
        if (onChange) onChange(""); // Send empty value to parent
      } else {
        setSelected([value]); // Select the item
        if (onChange) onChange(value); // Send selected value to parent
      }
    } else {
      // For multiSelect, handle the selection as an array
      setSelected(typeof value === "string" ? value.split(",") : value);
      if (onChange) onChange(value); // Call onChange directly with value
    }
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      {label && <InputLabelTop text={label} required={required} />}

      <Select
        sx={{ height: 38, borderRadius: 2 }}
        multiple={multiSelect}
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput />}
        displayEmpty
        open={dropdownOpen}
        onOpen={() => setDropdownOpen(true)}
        onClose={() => setDropdownOpen(false)}
        IconComponent={() => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              margin: "0 8px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Box>
        )}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Typography
                sx={{
                  color: custom.muted,
                  fontSize: "15px",
                  fontWeight: "400",
                }}
              >
                {placeholder || "Please Select"}
              </Typography>
            );
          }

          return (
            <Stack gap={1} direction="row" flexWrap="nowrap" overflow="auto">
              {selected.map((val) => {
                const selectedOption = options.find(
                  (option) => option.value === val
                );
                return (
                  <Box sx={TagBoxstyle} key={val}>
                    {selectedOption?.label || val}
                  </Box>
                );
              })}
            </Stack>
          );
        }}
        MenuProps={MenuProps}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ m: 1, borderRadius: 2 }}
              style={getStyles(option.value, selected, theme)}
            >
              <Checkbox
                size="small"
                sx={{ p: 0.5 }}
                checked={selected.includes(option.value)}
              />{" "}
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomMultiSelected;

const TagBoxstyle = {
  backgroundColor: "#E9EAEC",
  padding: "2px 7px",
  borderRadius: "7px",
  color: "#0F132499",
  fontSize: 12,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "120px",
};
