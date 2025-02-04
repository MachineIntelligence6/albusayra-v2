"use client";

import SideCard from "@/components/shared-components/SideCard";
import { Box } from "@mui/material";
import React from "react";
import { generalDeductionData } from "@/utils/vendor-detail";
import GeneralDeductionForm from "./GeneralDeductionForm";

const EMPGeneralDeductionForm = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, flex: "1 1 0" }}>
        <SideCard
          avatarSrc="/icons/pic.svg"
          name="Saleem Akhtar Muhammad Miskeen"
          email="saleemakhtar@gmail.com"
          contractData={generalDeductionData}
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
            <GeneralDeductionForm />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EMPGeneralDeductionForm;
