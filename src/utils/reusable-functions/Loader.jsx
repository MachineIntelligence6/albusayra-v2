import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = ({ size = "small", overlay = false }) => {
  const loaderSize = size === "small" ? 20 : 60; // Size for small and large loaders

  if (overlay) {
    // Full-page overlay loader
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300, // Above most other UI elements
        }}
      >
        <CircularProgress size={loaderSize} />
      </Box>
    );
  }

  // Small loader (e.g., for buttons)
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress size={loaderSize} />
    </Box>
  );
};

export default Loader;
