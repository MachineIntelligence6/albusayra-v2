"use client";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import React from "react";
import { Box } from "@mui/material";
import AssetVerification from "@/components/company-flow/employees/employee-clearance/asset-verification";

const page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Employee Clearance / Asset Verification"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <AssetVerification />
      </Box>
    </Box>
  );
};

export default page;
