import { Avatar, Typography, Box } from "@mui/material";
import React from "react";

const ProfileData = ({ image, name, email }) => {
  return (
    <>
      <Box display="flex" gap={1} alignItems="center">
        <Avatar alt="Profile Image" src={image} />
        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "#2F2B3DE5", fontWeight: 500 }}
          >
            {name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#2F2B3DB2" }}>
            {email}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfileData;
