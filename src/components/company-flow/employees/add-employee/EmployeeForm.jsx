import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Typography } from "@mui/material";
import React from "react";

const EmploypeeForm = () => {
    return (
        <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <CustomDropdown label="Vendor" required={true} />

                <CustomDropdown label="Select Contract" required={true} />
            </Box>
            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <CustomDropdown label="Working City" required={true} />

                <CustomDropdown label="Platform" required={true} />
            </Box>

            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <CustomDropdown label="Salary Type (Fixed/Commission)" required={true} />

                <CustomTextField
                    label="Fixed Salary/Commission AMount"
                    placeholder="e.g 1200"
                    required={true}
                    endAdornment={<CurrencyType />}
                />
            </Box>

            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <CustomDateField label="Actual joining Date" required={true} />

                <CustomDropdown label="GHP Training" placeholder="Yes/No" required={true} />
            </Box>
        </Box>
    );
};

export default EmploypeeForm;
