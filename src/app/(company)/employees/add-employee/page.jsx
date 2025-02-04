"use client";
import React from "react";
import { Box } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import AddEmployee from "@/components/company-flow/employees/add-employee";
import { custom } from "@/app/theme";
const page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Employees / Add Employee"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box>
        <AddEmployee />
      </Box>
    </Box>
  );
};

export default page;
