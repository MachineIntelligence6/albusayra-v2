"use client";

import SideCard from "@/components/shared-components/SideCard";
import { Box } from "@mui/material";
import React from "react";
import { dlRrquestSideCardData } from "@/utils/vendor-detail";
import DlRequestFormCard from "./DlRequestFormCard";

const DlRrquestForm = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, flex: "1 1 0" }}>
        <SideCard
          avatarSrc="/icons/pic.svg"
          name="Saleem Akhtar Muhammad Miskeen"
          email="saleemakhtar@gmail.com"
          contractData={dlRrquestSideCardData}
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
            <DlRequestFormCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DlRrquestForm;
