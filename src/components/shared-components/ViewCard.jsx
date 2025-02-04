import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { custom } from "@/app/theme";

export function ViewCard({ title, children, onEdit, borderTop }) {
  return (
    <Paper
      sx={(theme) => ({
        p: 3,
        minHeight: "10rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderTop:
          borderTop !== false
            ? borderTop || `4px solid ${custom.deepBlue}`
            : "none",
        borderRadius: "10px",
      })}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {onEdit !== false && (
          <Button
            variant="outlined"
            size="small"
            onClick={onEdit || (() => console.log("Default Edit Action"))} // Default or custom action
          >
            Edit
          </Button>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
}

export function ViewItem({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Box sx={{ color: "text.primary", fontSize: 14, fontWeight: 500 }}>
        {value}
      </Box>
    </Box>
  );
}
