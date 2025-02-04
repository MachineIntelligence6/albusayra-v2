"use client";
import AdminCompany from "@/components/admin-company";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider } from "@mui/material";
import React from "react";

const Page = () => {
  return (
    <>
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <AdminCompany />
    </>
  );
};

export default Page;
