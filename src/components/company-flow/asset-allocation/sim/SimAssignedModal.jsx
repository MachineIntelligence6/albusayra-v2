import React, { useRef } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";

const SimAssignedModal = ({ onClose }) => {
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
            image="/company/sim.svg"
            altText="sim-assigned"
            title="Sim Assigned Successfully"
            description="Sim no. +971 123 456 7890  assigned successfully."
            buttonText="Add Bike"
            onButtonClick={() => router.push("/asset-allocation?table=true")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SimAssignedModal;
