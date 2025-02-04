"use client";

import React from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CustomButton from "./CustomButton";
import { X } from "lucide-react";

const ViewEmployeeHeader = ({
  profileImage,
  fullName,
  description,
  buttons = [],
  onBackClick,
  onEditClick,
  sx,
  isCamera = true,
  isClose = false,
  handleCloseClick,
}) => {
  return (
    <Box>
      <Card
        sx={{
          ...sx,
          marginBottom: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: 120,
            background:
              "url(/icons/banner1.svg) lightgray 50% / cover no-repeat",
          }}
        >
          {isClose && (
            <Button
              onClick={handleCloseClick}
              style={{
                position: "absolute",
                top: 12,
                right: 1,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontSize: "24px",
                color: "#FFF",
              }}
            >
              <X />
            </Button>
          )}
        </Box>

        <Box sx={{ px: 3, pb: 2, mt: -5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "baseline" }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={profileImage}
                  sx={{
                    width: 100,
                    height: 100,
                    // border: "4px solid white",
                    borderRadius: "10px",
                  }}
                />
                {isCamera && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 15,
                      right: -10,
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "white" },
                    }}
                    size="small"
                  >
                    <CameraAltOutlinedIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignSelf: "center",
                  marginTop: 5,
                }}
              >
                <Typography variant="h5">{fullName}</Typography>
                <Typography sx={{ color: "#2F2B3D99" }}>
                  {description}
                </Typography>{" "}
              </Box>
            </Box>

            {buttons.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {buttons.map((button, index) => (
                  <CustomButton
                    key={index}
                    variant={button.variant}
                    startIcon={button.startIcon}
                    endIcon={button.endIcon}
                    sx={{ mt: 2 }}
                    onClick={button.onClick}
                  >
                    {button.label}
                  </CustomButton>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ViewEmployeeHeader;
