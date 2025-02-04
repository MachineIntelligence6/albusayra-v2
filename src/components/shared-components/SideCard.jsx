import React from "react";
import { Box, Avatar, Typography, Divider, Button } from "@mui/material";

const SideCard = ({
  avatarSrc,
  name,
  email,
  contractData,
  isButton = false,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "400px",
          bgcolor: "#062A47",
          boxShadow: "0px 4px 18px 0px rgba(75, 70, 92, 0.10)",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          color: "#F2F2F2",
          border: "2px solid #F2F2F2",
          pb: 10,
        }}
      >
        {/* Profile section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: "18px",
          }}
        >
          <Avatar
            src={avatarSrc}
            sx={{
              width: 70,
              height: 70,
              // border: "2px solid white",
              borderRadius: "50%",
            }}
          />
          <Box>
            <Typography sx={{ fontWeight: "600" }}>{name}</Typography>
            <Typography>{email}</Typography>
          </Box>
        </Box>

        {/* <Divider color="white" /> */}

        {/* Contract Data */}
        {contractData?.map((item, index) => (
          <React.Fragment key={index}>
            {<Divider color="#F2F2F2" />}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 24px",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.70)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.90)",
                  fontSize: "13px",
                  fontWeight: 500,
                  ...(item.label === "Status" && {
                    backgroundColor: "#28C76F",
                    color: "#F2F2F2",
                    padding: "2px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }),
                  ...(item.label === "Bike" && {
                    backgroundColor: "#7367F0",
                    color: "#FFFFFF",
                    padding: "2px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }),
                  ...(item.label === "SIM" && {
                    backgroundColor: "#7367F0",
                    color: "#FFFFFF",
                    padding: "2px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }),
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    />
                  )}
                  {item.value}
                  {item.currency && (
                    <Box
                      sx={{
                        bgcolor: "#80839029",
                        color: "#808390",
                        borderRadius: "3.255px",
                        p: "2px 6px",
                        fontSize: "9.75px",
                        fontWeight: 500,
                      }}
                    >
                      {item.currency}{" "}
                    </Box>
                  )}
                </Box>
              </Typography>
            </Box>
          </React.Fragment>
        ))}
        {<Divider color="#F2F2F2" />}
        {isButton === true && (
          <Box sx={{ width: "full", textAlign: "center" }}>
            <Button
              sx={{
                color: "#F2F2F2",
                fontSize: "18px",
                textDecoration: "underline",
                textAlign: "center",
                mb: 1,
                mt: 2,
              }}
            >
              View All Details
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SideCard;
