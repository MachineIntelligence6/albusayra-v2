import React from "react";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider } from "@mui/material";
import InCompleteEmployee from "@/components/employees/incomplete-form";

const page = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box>
        <InCompleteEmployee />
      </Box>
    </>
  );
};

export default page;
