"use client";
import { useState } from "react";
import { Box, Divider } from "@mui/material";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import CampaignsWrapper from "@/components/Campaigns";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

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

export default Page;
