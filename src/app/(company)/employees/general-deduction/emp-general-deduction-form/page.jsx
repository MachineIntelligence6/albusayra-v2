"use client";
import React from "react";
import { Box } from "@mui/material";
import EMPGeneralDeductionForm from "@/components/company-flow/general-deduction-components/emp-form";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";

const Page = () => {
  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"General Deduction / EMP General Deduction Form"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <EMPGeneralDeductionForm />
      </Box>
    </Box>
  );
};

export default Page;
