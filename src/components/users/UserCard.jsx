import React from "react";
import { Box, Typography } from "@mui/material";

const UserCard = ({ bgColor, icon, totalUsers, cardName }) => {
  console.log(icon,"icon");
  
  return (
    <Box
      sx={{
        borderRadius: "25px",
        padding: "25px 20px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        ...bgColor,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        flex: "1 1 calc(25% - 16px)",
        maxWidth: "calc(25% - 16px)",
        height:"175px"
      }}
    >
      {/* Text Section */}
      <Box sx={{display:"flex", flexDirection:"column", gap:"2rem"}}>
        <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "20px" }}>
          Total {totalUsers} Users
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "25px", fontWeight: "600" }}>
          {cardName}
        </Typography>
      </Box>
        {/* Icon Section */}
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
      {/* {icon} */}
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default UserCard;
