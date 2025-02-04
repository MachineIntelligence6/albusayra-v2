import React from "react";
import EmptyScreenView from "../../shared-components/EmptyScreenView";
import { Box } from "@mui/material";

const EmptyScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <EmptyScreenView image="/company/Bike.svg" showButton={false} />
    </Box>
  );
};

export default EmptyScreen;
