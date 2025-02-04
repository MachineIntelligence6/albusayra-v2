import ViewEmployeeHeader from "@/components/shared-components/ViewEmployeeHeader";
import { Box } from "@mui/material";
import React, { useRef } from "react";
import ViewDetailCard from "./ViewDetailCard";

const ViewDetailModal = ({ onClose }) => {
  const PopUpRef = useRef(null);
  const closePopUp = (e) => {
    if (PopUpRef.current === e.target) {
      onClose();
    }
  };

  return (
    <Box
      ref={PopUpRef}
      onClick={closePopUp}
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(17,17,17,0.80)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <Box sx={{ backgroundColor: "#FFF", borderRadius: "15px" }}>
        <Box sx={{}}>
          <ViewEmployeeHeader
            fullName="Saleem Akhtar Muhammad Miskeen"
            description="saleemakhtar1234@gmail.com"
            profileImage={"/icons/pic.svg"}
            sx={{
              borderRadius: "15px",
              // border: "2px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
        <Box>
          <Box sx={{ width: "1188px" }}>
            <ViewDetailCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewDetailModal;
