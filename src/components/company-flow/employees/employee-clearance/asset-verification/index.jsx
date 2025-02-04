"use client";

import SideCard from "@/components/shared-components/SideCard";
import { Box } from "@mui/material";
import React from "react";
import { allocateAssetData } from "@/utils/vendor-detail";
import AssetVerificationForm from "./AssetVerificationForm";

const AssetVerification = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, flex: "1 1 0" }}>
        <SideCard
          avatarSrc="/icons/pic.svg"
          name="Saleem Akhtar Muhammad Miskeen"
          email="saleemakhtar@gmail.com"
          contractData={allocateAssetData}
          isButton={true}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "80%",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 8px 0px rgba(47, 43, 61, 0.12)",
              borderRadius: "30px",
              p: 3,
            }}
          >
            <AssetVerificationForm />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AssetVerification;
