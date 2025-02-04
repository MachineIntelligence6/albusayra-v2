import { custom } from "@/app/theme";
import { Typography } from "@mui/material";
import React from "react";

const CurrencyType = (props) => {
    const { bgcolor = "#80839029", type = "AED" } = props;
    return (
        <Typography
            sx={{
                bgcolor: bgcolor,
                px: 1,
                fontSize: 13,
                borderRadius: 1,
                fontWeight: 500,
                lineHeight: 2,
                minWidth: 28,
                color: custom.secondaryText,
            }}
        >
            {type}
        </Typography>
    );
};

export default CurrencyType;
