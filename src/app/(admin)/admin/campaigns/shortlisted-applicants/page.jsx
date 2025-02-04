import React from "react";
import CampaignsWrapper from "@/components/Campaigns";
import { Box, Divider } from "@mui/material";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";

const page = () => {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box component="div">
        <CampaignsWrapper />
      </Box>
    </>
  );
};

export default page;
