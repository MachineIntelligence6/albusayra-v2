import React from "react";
import { SvgIcon } from "@mui/material";

const DoubleChevronUp = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" fill="none">
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="15" transform="matrix(-1 8.74228e-08 8.74228e-08 1 30.5 0)" fill="#E6E6E9" />
                <path d="M19.667 14.1664L15.5006 10L11.3342 14.1664" stroke="#2F2B3D" stroke-opacity="0.9" stroke-width="1.24992" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19.667 19.1664L15.5006 15L11.3342 19.1664" stroke="#2F2B3D" stroke-opacity="0.9" stroke-width="1.24992" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </SvgIcon>
    );
};

export default DoubleChevronUp;
