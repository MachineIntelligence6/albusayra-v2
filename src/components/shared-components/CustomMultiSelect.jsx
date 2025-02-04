import React from "react";
import {
  OutlinedInput,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  Checkbox,
  ListItemText,
  Box
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const CustomMultiSelect = ({ options, value, onChange, placeholder, fullWidth, ...sx }) => {

  return (
    <FormControl sx={{ minWidth: "100%", ...sx }}
    // error={!!error}
    fullWidth={fullWidth}>
      <Select
         sx={{
          borderRadius: "7px",
          padding: "0",
          "& .MuiSelect-select": {
            padding: "11px",
            backgroundColor: "#FCFCFC",
          },
        }}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          PaperProps: {
            sx: {
              padding: "0",
            },
          },
        }}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput placeholder={placeholder} />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((val) => {
              const selectedOption = options.find((option) => option.value === val);
              return <Box sx={{backgroundColor: "#E9EAEC", padding: "2px 7px", borderRadius:"7px",color:"#0F132499"}} key={val}>{selectedOption?.label || val}</Box>
            })}
          </Stack>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} 
                 sx={{
                "&.Mui-checked": {
                  color: "#104774",
                  borderRadius: "4px",
                },
              }}
            />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};