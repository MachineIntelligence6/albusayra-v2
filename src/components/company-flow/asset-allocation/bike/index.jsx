"use client";

import SideCard from "@/components/shared-components/SideCard";
import { Box } from "@mui/material";
import React from "react";
import AssetHistory from "./AssetHistory";
import AllocateAsset from "./AllocateAsset";
import { allocateAssetData } from "@/utils/vendor-detail";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AssignBike = () => {
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
            <AllocateAsset />
          </Box>

          <Box
            sx={{
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 8px 0px rgba(47, 43, 61, 0.12)",
              borderRadius: "30px",
            }}
          >
            <Box
              sx={{
                p: 2,
                fontSize: "18px",
                fontWeight: 500,
                color: "#4B465C",
              }}
            >
              Asset History
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Accordion sx={{ p: 0, m: 0, boxShadow: "none" }}>
                <Box
                  sx={{
                    bgcolor: "#F4F4F4",

                    padding: 0,
                    borderBottom: "1px solid rgba(172, 170, 177, 0.20)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{
                      p: 0,
                      mx: 2,
                    }}
                  >
                    <Box
                      sx={{
                        padding: 0,
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Bike Information
                    </Box>
                  </AccordionSummary>
                </Box>
                <AccordionDetails sx={{ padding: 0, margin: 0 }}>
                  <AssetHistory />
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ p: 0, m: 0, boxShadow: "none" }}>
                <Box
                  sx={{
                    bgcolor: "#F4F4F4",

                    padding: 0,
                    borderBottom: "1px solid rgba(172, 170, 177, 0.20)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{
                      p: 0,
                      mx: 2,
                    }}
                  >
                    <Box
                      sx={{
                        padding: 0,
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Sim Information
                    </Box>
                  </AccordionSummary>
                </Box>
                <AccordionDetails sx={{ padding: 0, margin: 0 }}>
                  {/* <SimInformation /> */}
                </AccordionDetails>
              </Accordion>

              <Box sx={{ mt: 2 }}></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AssignBike;
