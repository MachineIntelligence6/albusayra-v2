import React, { useRef } from "react";
import { Box } from "@mui/material";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomButton from "@/components/shared-components/CustomButton";
import { Check, MoveLeft } from "lucide-react";

const EndDateModal = ({ onClose }) => {
  const PopUpRef = useRef(null);

  const closePopUp = (e) => {
    if (PopUpRef.current === e.target) {
      onClose();
    }
  };

  const handleBackClick = () => {
    console.log("Back Clicked!");
    onClose();
  };

  const handleConfirmClick = () => {
    console.log("Confirm Clicked!");
    onClose();
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
      <Box
        sx={{
          backgroundColor: "#FFF",
          borderRadius: "15px",
          width: "480px",
          height: "227px",
          p: "16px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>End Contract Date</Box>
        <Box>
          <CustomDateField label="End Date" required />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CustomButton
            bgColor="muted"
            startIcon={<MoveLeft size={16} />}
            onClick={handleBackClick}
          >
            Back
          </CustomButton>
          <CustomButton
            endIcon={<Check size={16} />}
            onClick={handleConfirmClick}
          >
            Confirm
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default EndDateModal;
