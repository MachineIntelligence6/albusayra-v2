import React from "react";
import { Box } from "@mui/material";
import DrivingLicenseRequest from "@/components/company-flow/employees/driving-license-request";

const page = ({ searchParams }) => {
  return (
    <Box>
      <DrivingLicenseRequest params={searchParams} />
    </Box>
  );
};

export default page;
