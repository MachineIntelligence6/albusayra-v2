import React from "react";
import { Box, Typography } from "@mui/material";

const MainCard = ({ bgColor, data = { text: "Total Bikes", count: "50", icon: null } }) => {
    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 6,
                bgcolor: bgColor,
                width: 280,
            }}
        >
            <Box
                component="div"
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1 }}
            >
                <Box
                    sx={{
                        bgcolor: "white",
                        width: "fit-content",
                        borderRadius: 1,
                        p: 1
                    }}
                >
                    {data.icon}
                </Box>
                <Typography sx={{ color: "white", fontWeight: 600 }}>{data.text}</Typography>
            </Box>
            <Typography
                variant="body2"
                sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: "white",
                    alignSelf: "flex-end",
                }}
            >
                {data.count}
            </Typography>
        </Box>
    );
};

export default MainCard;
