import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomFileUploadField from "@/components/shared-components/CustomFIleUploadField";
import CustomTextField from "@/components/shared-components/CustomTextField";
import { Box, Input, Typography } from "@mui/material";
import React from "react";

const cardOptions = [{ label: "Applied", value: "applied" }, { label: "Not Applied", value: "not_applied" }]
const cardType = [{ label: "WPS", value: "wps" }, { label: "Non WPS", value: "non_wps" }]
const C3Card = () => {
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
                <CustomDropdown label="C3 Card" required={true} options={cardOptions} />

                <CustomDateField label="C3 Card Applied Date" required={true} />
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
                <CustomTextField
                    label="C3 Card Cost (Ist Time)"
                    placeholder="e.g 1200"
                    required={true}
                    endAdornment={<CurrencyType />}
                />
                <CustomTextField
                    label="C3 Card Cost (Monthly)"
                    placeholder="e.g 1200"
                    required={true}
                    endAdornment={<CurrencyType />}
                />            </Box>

            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <CustomDropdown label="Card Type" options={cardType} required={true} />
                <Box sx={{ width: "100%", height: "10px" }}></Box>
            </Box>


        </Box>
    );
};

export default C3Card;
