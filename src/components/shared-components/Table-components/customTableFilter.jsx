import React from "react";
import { Box, Typography, Divider, TextField } from "@mui/material";
import CustomDropdown from "../CustomDropDown";
import CustomTextField from "../CustomTextField";

export const CustomTableFilter = ({ filters }) => {
  return (
    <Box component="div" sx={{ m: 2 }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          my: 2,
          width: "100%",
        }}
      >
        {filters?.length ? (
          filters.map((filter) => (
            <Box
              key={filter.id}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {filter.inputType === "dropdown" ? (
                <CustomDropdown
                  sx={{ placeItems: "start", width: "100%" }}
                  label={filter.filterName}
                  placeholder={filter.placeholder}
                  options={filter.options}
                />
              ) : filter.inputType === "text" ? (
                <Box>
                  {/* <Typography>{filter.filterName}</Typography> */}
                  <Box>
                    <CustomTextField
                      placeholder={filter.placeholder}
                      label={filter.filterName}
                    />
                  </Box>
                </Box>
              ) : (
                <Typography>{filter.filterName}</Typography>
              )}
            </Box>
          ))
        ) : (
          <Typography>No filters available</Typography>
        )}
      </Box>
      <Divider />
    </Box>
  );
};
