"use client";
import React from "react";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider } from "@mui/material";
import InventoryViewDetails from "@/components/inventory/inventory-list/InventoryViewDetails";
import CustomButton from "@/components/shared-components/CustomButton";
// import { useRouter } from "next/navigation";
import { custom } from "@/app/theme";

const page = () => {
  // const router = useRouter();
  return (
    <Box component="div">
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DynamicBreadcrumb />
        {/* <CustomButton
          bgColor="foreground"
          color={custom.secondaryText}
          onClick={() => {
            router.push("/admin/inventory/inventory-list");
          }}
        >
          Back
        </CustomButton> */}
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box component="div" sx={{ my: 2 }}>
        <InventoryViewDetails />
      </Box>
    </Box>
  );
};

export default page;
