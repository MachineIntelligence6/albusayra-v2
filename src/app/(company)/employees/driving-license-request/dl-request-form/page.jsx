"use client";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import React from "react";
import { Box } from "@mui/material";
import DlRrquestForm from "@/components/company-flow/employees/driving-license-request/form";

const page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Driving License Request"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <DlRrquestForm />
      </Box>
    </Box>
  );
};

export default page;
