"use client";
import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import CustomTextField from "../CustomTextField";
import { custom } from "@/app/theme";
import DescriptiveText from "../DescriptiveText";
import CustomMultiSelected from "../CustomMultiSelected";
import CustomButton from "../CustomButton";
import { ChevronDown, ChevronUp } from "lucide-react";

const TableFilters = ({
  filters,
  bottomBorder = true,
  heading = "Advance Filter",
  onApplyFilters,
  isBtnSearch = false,
  isBtnSReset = false,
  multiSelect,
}) => {
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (filterId, value, customOnChange) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterId]: value,
    }));

    if (customOnChange) {
      customOnChange(value);
    }
  };

  const handleSearchClick = () => {
    onApplyFilters(filterValues);
  };

  // const handleResetClick = () => {
  //   if (filters?.length > 0) {
  //     const resetValues = filters.reduce((acc, filter) => {
  //       acc[filter.id] = filter.options ? [] : ""; // Reset to default values
  //       return acc;
  //     }, {});
  //     setFilterValues(resetValues); // Reset filterValues state
  //   }
  // };

  return (
    <Box component="div" sx={{ pb: 1, px: 2, pt: 1 }}>
      {heading && (
        <DescriptiveText
          text={heading}
          fontWeigth={500}
          fontSize={15}
          color={custom.primaryText}
        />
      )}

      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // flexWrap: "wrap",
          gap: "1rem",
          my: 2,
        }}
      >
        {filters?.length > 0 &&
          filters?.map((filter) => {
            return (
              <>
                {filter?.options ? (
                  <CustomMultiSelected
                    multiSelect={multiSelect}
                    key={filter?.id}
                    sx={{ flex: 1, placeItems: "start" }}
                    label={filter?.filterName}
                    placeholder={filter?.placeholder}
                    options={filter?.options}
                    value={filterValues[filter.id] || []} // Pass the value from state
                    onChange={(value) =>
                      handleFilterChange(filter.id, value, filter?.onChange)
                    }
                  />
                ) : (
                  <Box
                    key={filter?.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <CustomTextField
                      placeholder={filter?.placeholder}
                      label={filter.filterName}
                      // value={filterValues[filter.id]} // Bind to filterValues
                      onChange={(e) =>
                        handleFilterChange(filter.id, e.target.value)
                      }
                    />
                  </Box>
                )}
              </>
            );
          })}
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        {isBtnSearch && (
          <CustomButton onClick={handleSearchClick}>Search</CustomButton>
        )}

        {/* {isBtnSReset && (
          <CustomButton onClick={handleResetClick}>Reset</CustomButton>
        )} */}
      </Box>

      {bottomBorder && <Divider sx={{ mt: "20px" }} />}
    </Box>
  );
};

export default TableFilters;
