import { Box } from "@mui/material";
import React from "react";

const SvgIcon = ({ src, width = 24, height = 24, alt = "", ...props }) => {
    return (
        <Box
            component="img"
            src={src} // Path to the SVG file
            alt={alt} // Alternative text for accessibility
            width={width}
            height={height}
            {...props}
        />
    );
};

export default SvgIcon;