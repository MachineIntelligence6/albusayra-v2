"use client";

import { custom } from "@/app/theme";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { platformData } from "@/utils/company-flow/employee-inforamtion-base.data";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";

export default function EmpInfoViewCard() {
    return (
        <Paper
            sx={(theme) => ({
                p: 3,
                minHeight: "10rem",
                display: "flex",
                flexDirection: "column",
                borderTop: `4px solid ${custom.deepBlue}`,
                borderRadius: "10px",
                width: 600,
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                <Avatar src="/images/careem-logo.png" sx={{ width: 60, height: 60 }} />
                <Typography variant="h6">Careem</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 2 }}>
                {platformData.map((item, index) => (
                    <Box
                        key={item?.id}
                        sx={{
                            py: 1,
                            borderBottom:
                                item.key != "Status"
                                    ? `1px dashed ${custom.borderColor}`
                                    : "unset",
                        }}
                    >
                        <ViewItem
                            label={
                                <Box
                                    component="div"
                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                >
                                    {item?.icon}
                                    <DescriptiveText
                                        text={item?.key}
                                        color={"#2F2B3D99"}
                                        fontWeight={400}
                                        fontSize={16}
                                    />
                                </Box>
                            }
                            value={
                                item.key === "Status" ? (
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: 13,
                                            color: "#28C76F",
                                            bgcolor: "#28C76F29",
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 1,
                                        }}
                                    >
                                        {item?.value}
                                    </Typography>
                                ) : (
                                    <DescriptiveText
                                        text={item?.value}
                                        color={"#2F2B3DE5"}
                                        fontWeight={500}
                                        fontSize={16}
                                    />
                                )
                            }
                        />
                    </Box>
                ))}
            </Box>
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
