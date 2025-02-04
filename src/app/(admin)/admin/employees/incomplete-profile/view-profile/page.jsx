import React from "react";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider } from "@mui/material";
import ViewInCompleteEmployee from "@/components/employees/incomplete-form/view-employee";

const page = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box>
        <ViewInCompleteEmployee />
      </Box>
    </>
  );
};

export default page;
