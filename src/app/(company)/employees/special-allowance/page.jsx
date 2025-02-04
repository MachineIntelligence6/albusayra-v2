import React from "react";
import { Box } from "@mui/material";
import SpecialAllowance from "@/components/company-flow/employees/special-allowance";

const Page = ({ searchParams }) => {
  return (
    <Box>
      <SpecialAllowance params={searchParams} />
    </Box>
  );
};

export default Page;
