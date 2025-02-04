"use client";
import React from "react";
import AssignBike from "@/components/company-flow/asset-allocation/bike";
import { Box } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";


const page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Asset Allocation / Allocate Asset"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <AssignBike />
      </Box>
    </Box>
  );
};

export default page;
