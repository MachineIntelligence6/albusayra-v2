import React from "react";
import { Box, Typography } from "@mui/material";
import { STATUS_MAPPING } from "@/utils/reusable-functions/statusColors";

export default function StatusAlert({ message, type }) {
  const statusData = STATUS_MAPPING[type] || {
    name: "Unknown",
    bg: "#F5F5F5",
    color: "#757575",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: statusData.bg,
        padding: "8px 16px",
        borderRadius: "7px",
        marginBottom: "1rem",
        border: `2px solid ${statusData.color}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          component="span"
          sx={{
            color: "#444444",
            fontSize: "14px",
          }}
        >
          {message}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          component="span"
          sx={{
            color: "#444444",
            fontSize: "14px",
          }}
        >
          Status:
        </Typography>
        <Box
          sx={{
            backgroundColor: statusData.color,
            color: "#FFFFFF",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {statusData.name}
        </Box>
      </Box>
    </Box>
  );
}
