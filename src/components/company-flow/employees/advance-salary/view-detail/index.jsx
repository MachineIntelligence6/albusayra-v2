import ViewEmployeeHeader from "@/components/shared-components/ViewEmployeeHeader";
import { Box } from "@mui/material";
import React, { useRef } from "react";
import { AdvDetailCard } from "./AdvDetailCard";

const AdvDetailModal = ({ onClose }) => {
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
            isClose={true}
            isCamera={false}
            handleCloseClick={onClose}
            sx={{
              borderRadius: "15px",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
        <Box>
          <Box sx={{ width: "1188px" }}>
            <AdvDetailCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdvDetailModal;
