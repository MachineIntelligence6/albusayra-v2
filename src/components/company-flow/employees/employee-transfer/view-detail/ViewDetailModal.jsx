import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import ViewDetailCard from "./ViewDetailCard";
import ViewDetailTable from "./ViewDetailTable";
import ViewEmployeeHeader from "@/components/shared-components/ViewEmployeeHeader";

const ViewDetailModal = ({ onClose }) => {
  const PopUpRef = useRef(null);
  const [activeComponent, setActiveComponent] = useState("card");

  const closePopUp = (e) => {
    if (PopUpRef.current === e.target) {
      onClose();
    }
  };

  const handleBackClick = () => {
    console.log("Back Clicked!");
  };

  const handleEditClick = () => {
    console.log("Edit Clicked!");
  };

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const buttons = [
    {
      label: "Transfer History",
      onClick: () => handleButtonClick("table"),
      variant: activeComponent === "table" ? "contained" : "outlined",
    },
    {
      label: "Employee Info",
      onClick: () => handleButtonClick("card"),
      variant: activeComponent === "card" ? "contained" : "outlined",
    },
  ];

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
        <Box>
          <ViewEmployeeHeader
            fullName="Saleem Akhtar Muhammad Miskeen"
            description="saleemakhtar1234@gmail.com"
            profileImage={"/company/picc.png"}
            onBackClick={handleBackClick}
            onEditClick={handleEditClick}
            buttons={buttons}
            isClose={true}
            handleCloseClick={onClose}
            isCamera={false}
            sx={{
              borderRadius: "15px",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
        <Box>
          <Box
            sx={{
              minHeight: activeComponent === "card" ? "" : "400px",
              minWidth: "1100px",
            }}
          >
            {activeComponent === "card" ? (
              <ViewDetailCard />
            ) : (
              <ViewDetailTable />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewDetailModal;
