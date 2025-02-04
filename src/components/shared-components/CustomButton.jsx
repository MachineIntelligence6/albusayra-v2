"use client";
import React from "react";
import { Button } from "@mui/material";
import { custom } from "@/app/theme";

const CustomButton = ({
  children,
  color, // Explicit color for text
  bgColor = custom.deepBlue, // Default bgColor
  variant = "contained", // Default variant
  startIcon,
  endIcon,
  sx, // Custom styles
  onClick,
  type,
  fullWidth = false,
  ...props // Remaining props
}) => {
  // Define a centralized color mapping
  const colors = {
    primary: custom.deepBlue,
    muted: "#808390",
    secondary: "#737682",
    foreground: "#80839029",
    danger: custom.errorButton,
  };

  // Determine background and text color
  const backgroundColor = colors[bgColor] || colors.primary;
  const textColor =
    variant === "contained" ? color || "white" : backgroundColor; // Text color for outlined
  const borderColor = variant === "outlined" ? backgroundColor : "transparent"; // Border color for outlined

  return (
    <Button
      variant={variant}
      startIcon={startIcon ?? startIcon}
      endIcon={endIcon ?? endIcon}
      type={type}
      fullWidth={fullWidth}
      sx={{
        backgroundColor:
          variant === "contained" ? backgroundColor : "transparent",
        color: textColor,
        borderColor: borderColor,
        borderWidth: variant === "outlined" ? 1 : 0, // Border width for outlined
        textTransform: "capitalize",
        fontSize: "15px",
        fontWeight: 500,
        // lineHeight: 2,
        borderRadius: "6px",
        boxShadow: "none",
        ...sx,
      }}
      onClick={onClick} // Add the onClick handler here
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
