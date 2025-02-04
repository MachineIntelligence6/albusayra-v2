"use client";

import { useState } from "react";
import EmptyScreenView from "./EmptyScreenView";
import { Box } from "@mui/material";

const EmptyScreen = ({ viewObject }) => {
  const { image, altText, description, buttonText, onButtonClick, title } =
    viewObject;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <EmptyScreenView
        title={title ? title : "Add Title"}
        image={image}
        altText={altText}
        description={description}
        buttonText={buttonText}
        onButtonClick={
          onButtonClick
            ? onButtonClick
            : () => alert("Please call onButtonClick in component")
        }
      />
      {/* {showPopup && <ModalCard onClose={onClose} />} */}
    </Box>
  );
};

export default EmptyScreen;
