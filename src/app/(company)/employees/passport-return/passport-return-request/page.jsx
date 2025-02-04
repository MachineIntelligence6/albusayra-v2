"use client";
import React from "react";
import { Box } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import PassportReturnRequest from "@/components/company-flow/passport-return/passport-return-form";

const Page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Passport Return / Passport Temp Return Request Form"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <PassportReturnRequest />
      </Box>
    </Box>
  );
};

export default Page;
