import React from "react";
import { Box, Avatar, Typography, Divider, Button } from "@mui/material";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";

const FoodPermitSideCard = ({
    avatarSrc = "/default-avatar.png", // Default avatar fallback
    name = "N/A",
    email = "N/A",
    contractData = [], // Default empty array
    isButton = false,
}) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
                sx={{
                    bgcolor: "#062A47",
                    boxShadow: "0px 4px 18px 0px rgba(75, 70, 92, 0.10)",
                    borderRadius: "25px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.6,
                    color: "#F2F2F2",
                    border: "2px solid #F2F2F2",
                    width: "100%",
                }}
            >
                {/* Profile Section */}
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
                            borderRadius: "50%",
                        }}
                    />
                    <Box>
                        <DescriptiveText
                            text={name}
                            color={custom.white}
                            fontWeight={600}
                        />
                        <DescriptiveText
                            text={email}
                            color={custom.white}
                            fontWeight={400}
                        />
                    </Box>
                </Box>

                {/* Contract Data Section */}
                {contractData.length > 0 &&
                    contractData.map((item, index) => (
                        <React.Fragment key={index}>
                            <Divider color="#F2F2F2" />
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
                                    {item.label || "N/A"}
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
                                        }),
                                        ...(item.label === "Bike" && {
                                            backgroundColor: "#7367F0",
                                            color: "#FFFFFF",
                                            padding: "2px 10px",
                                            borderRadius: "4px",
                                        }),
                                        ...(item.label === "SIM" && {
                                            backgroundColor: "#7367F0",
                                            color: "#FFFFFF",
                                            padding: "2px 10px",
                                            borderRadius: "4px",
                                        }),
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* Fallback for missing icons */}
                                        {item.icon && (
                                            <img
                                                src={item.icon || "/default-icon.png"}
                                                alt={item.label || "icon"}
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        )}
                                        {item.value || "N/A"}
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
                                                {item.currency}
                                            </Box>
                                        )}
                                    </Box>
                                </Typography>
                            </Box>
                        </React.Fragment>
                    ))}

                {/* Conditional Button */}
                {isButton && (
                    <>
                        <Divider color="#F2F2F2" />
                        <Box sx={{ textAlign: "center", mt: 1, mb: 2 }}>
                            <Button
                                sx={{
                                    color: "#F2F2F2",
                                    fontSize: "18px",
                                    textDecoration: "underline",
                                }}
                            >
                                View All Details
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default FoodPermitSideCard;
