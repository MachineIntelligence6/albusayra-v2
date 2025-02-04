"use client";
import React from "react";
import { Box } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import PassportAccept from "@/components/company-flow/passport-acceptance/passport-acceptance-form";

const Page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Passport Acceptance / Passport Acceptance Form"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <PassportAccept />
      </Box>
    </Box>
  );
};

export default Page;
