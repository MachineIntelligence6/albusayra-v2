"use client";
import { Box } from "@mui/material";
import AdvanceSalaryForm from "@/components/company-flow/employees/advance-salary/salary-form";
import React from "react";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";

const page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Advance Salary / Advance Salary Form"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <AdvanceSalaryForm />
      </Box>
    </Box>
  );
};

export default page;
