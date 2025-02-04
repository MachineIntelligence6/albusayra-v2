"use client";
import React from "react";
import { Box } from "@mui/material";
import { custom } from "@/app/theme";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import EmployeeView from "@/components/company-flow/employees/view-employee";

const page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Active Employee / View Employee"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box>
        <EmployeeView />
      </Box>
    </Box>
  );
};

export default page;
