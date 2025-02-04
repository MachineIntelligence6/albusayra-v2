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
import CustomDropdown from "@/components/shared-components/CustomDropDown";

const dropdownMenu = [
    { value: "employee_transfer_form", label: "Employee Transfer Form" },
    { value: "food_permit_deduction", label: "Food Permit Deduction" },
    { value: "general_deduction", label: "General Deduction" },
    { value: "passport_return", label: "Passport Return" },
    { value: "passport_acceptance", label: "Passport Acceptance" },
    { value: "payroll", label: "Payroll" },
    { value: "special_fllowance_form", label: "Special Allowance Form" },
    { value: "visa_loan_form", label: "Visa Loan Form" },
];

const EmployeeDetailHeader = (props) => {
    const { profileImage, fullName, description, sx } = props;

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
                        height: 150,
                        background:
                            "url(/icons/banner1.svg) lightgray 50% / cover no-repeat",
                    }}
                ></Box>

                <Box sx={{ px: 3, pb: 2, mt: -5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
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
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ alignSelf: "end", width: 400 }}>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <CustomDropdown
                                    options={dropdownMenu}
                                    placeholder={"Please Select"}
                                />
                                <Box sx={{ width: 200 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#E68F3C",
                                            color: "white",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        Hold Salary
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default EmployeeDetailHeader;
