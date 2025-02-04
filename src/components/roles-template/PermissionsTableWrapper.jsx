import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomizablePermissionsTable from "./CustomPermissionsTable";
import { permissions } from "@/utils/permissionsData";
import CustomTextField from "../shared-components/CustomTextField";
import CustomDropdown from "../shared-components/CustomDropDown";

const roleFilters = [
  {
    id: 1,
    filterName: "Role",
    placeholder: "Type",
    options: [
      { id: 19, label: "UAE", value: "uae" },
      { id: 29, label: "Pakistan", value: "pakistan" },
      { id: 39, label: "India", value: "india" },
    ],
  },
  {
    id: 2,
    filterName: "Type",
    placeholder: "Global/Company",
    options: [
      { id: 71, label: "UAE", value: "uae" },
      { id: 72, label: "Pakistan", value: "pakistan" },
      { id: 73, label: "India", value: "india" },
    ],
  },
  {
    id: 3,
    filterName: "Status",
    placeholder: "Please Select",
    options: [
      { id: 61, label: "panding", value: "panding" },
      { id: 62, label: "complete", value: "complete" },
      { id: 63, label: "rejected", value: "rejected" },
    ],
  },
];

export default function PermissionsTableWrapper() {
  const [role, setRole] = useState("");
  const [filters, setFilters] = useState(roleFilters);
  const columns = ["View", "Add", "Edit", "Delete"];

  return (
    <Box sx={{ overflow: "hidden", m: 1.5, borderRadius: 6 }}>
      {/* Filters Section */}
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          my: 2,
        }}
      >
        {roleFilters?.length
          ? roleFilters?.map((filter) => {
            return (
              <React.Fragment key={filter?.id}>
                {filter?.filterName === "Role" ? (
                  // CustomTextField for Role filter
                  <Box
                    display="flex"
                    alignItems="start"
                    flexDirection="column"
                    sx={{ width: "100%" }}
                  >
                    <div>{filter?.filterName}</div>
                    <CustomTextField
                      placeholder={filter?.placeholder}
                      onChange={(e) => console.log("Role:", e.target.value)}
                    // sx={{
                    //   width: "100%",
                    //   borderRadius: "20px",
                    // }}
                    />
                  </Box>
                ) : filter?.options ? (
                  // CustomDropdown for dropdown filters
                  <Box sx={{ width: "100%" }}>
                    <CustomDropdown
                      label={filter?.filterName}
                      placeholder={filter?.placeholder}
                      options={filter?.options}
                      sx={{ width: "100%" }} // Ensure same width
                    />
                  </Box>
                ) : (
                  // Fallback for filters without options
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography>{filter?.filterName}</Typography>
                  </Box>
                )}
              </React.Fragment>
            );
          })
          : null}
      </Box>
      {/* Table Section */}
      <CustomizablePermissionsTable
        permissions={permissions}
        columns={columns}
        customPermissionsLabel="Custom Permissions"
      />
    </Box>
  );
}
