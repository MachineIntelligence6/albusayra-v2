import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import CustomButton from "./CustomButton";
import { custom } from "@/app/theme";
export function InfoCard({ title, children, onEdit }) {
  return (
    <Paper
      sx={{
        p: 3,
        minHeight: "18rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderTop: `10px solid ${custom.deepBlue}`,
        borderRadius: "10px",
        boxShadow: " 0px 4px 10px 0px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color: "#2F2B3D",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
        <CustomButton
          variant="outlined"
          onClick={onEdit}
          sx={{ fontSize: "15px", fontWeight: "500", lineHeight: "22px" }}
        >
          Edit
        </CustomButton>
      </Box>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
}

export function InfoItem({ label, value, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1.5,
        borderBottom: "1px dashed lightgray",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          fontSize: "16px",
          color: "text.secondary",
        }}
      >
        <Box component="span">{icon}</Box>
        <Typography sx={{ fontSize: 16, fontWeight: 400, color: "#2F2B3D99" }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ color: "#2F2B3DE5", fontWeight: 500, fontSize: 16 }}>
        {value}
      </Box>
    </Box>
  );
}
