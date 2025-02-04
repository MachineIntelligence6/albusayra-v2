"use client";
import React from "react";
import { Box } from "@mui/material";
import CustomBreadcrumb from "@/app/Components/sharedComponents/BreadCrum/page";
import { SearchForm } from "@/components/search-form";
import FixedTable from "./table/FixedTable";

const Payroll = () => {
  return (
    <Box>
      <SearchForm
        placeholder="Search ⌘K"
        avatarDropdown={true}
        bellIcon={true}
        avatarSrc="/company/Avatarr.png"
        className="p-6 pl-10"
        customClass="ml-2"
      />
      <Box sx={{ p: 2, my: 1 }}>
        <CustomBreadcrumb name="Employees / Payroll" />
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFF",
          borderRadius: "4px",
          p: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TableFilters bottomBorder={false} />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomButton endIcon={<Check size={16} />} >Process</CustomButton>
        </Box>
      </Box> */}
      <FixedTable />
    </Box>
  );
};

export default Payroll;
