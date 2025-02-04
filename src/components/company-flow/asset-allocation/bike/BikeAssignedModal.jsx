import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";

const BikeAssignedModal = ({ onClose }) => {
  const router = useRouter();

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
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(17,17,17,0.80)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",

          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "523px",
            padding: 6,
          }}
        >
          <EmptyScreenView
            image="/company/bike2.svg"
            altText="bike-assigned"
            title="Bike Assigned Successfully"
            description="Bike no. 12345 assigned successfully."
            buttonText="Add Sim"
            onButtonClick={() => router.push("/asset-allocation/sim-assign")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BikeAssignedModal;
