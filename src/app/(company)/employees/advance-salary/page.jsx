import React from "react";
import { Box } from "@mui/material";
import AdvanceSalaryEmptyScreen from "@/components/company-flow/employees/advance-salary";

const page = ({ searchParams }) => {
  return (
    <Box>
      <AdvanceSalaryEmptyScreen params={searchParams} />
    </Box>
  );
};

export default page;
