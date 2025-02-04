"use client";
import React from "react";
import SimAssignedForm from "@/components/company-flow/asset-allocation/sim";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import { Box } from "@mui/material";

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
        <SimAssignedForm />
      </Box>
    </Box>
  );
};

export default page;
