import React from 'react';
import { Box } from '@mui/material';

export const DynamicIcon = ({
    IconComponent,
    color = 'white',
    size = 18,
    backgroundColor = 'transparent',
    ...props
}) => {
    return (
        <Box
            component="div"
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor,
                width: size,
                height: size,
                borderRadius: '50%',
            }}
            {...props}
        >
            <Box
                component="div"
                sx={{
                    width: size,
                    height: size,
                    svg: { width: '100%', height: '100%', stroke: color },
                }}
            >
                {IconComponent && <IconComponent />}
            </Box>
        </Box>
    );
};


// /************************************(child icons)******************************************************************************** */

const DownArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
        <path d="M11.3346 9.33301L8.0013 13.333L4.66797 9.33301" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 9.33301L12.6667 4.00001C12.538 3.21141 11.977 2.65041 11.3333 2.66667H4.66667C4.02299 2.65041 3.46196 3.21141 3.33333 4.00001L2 9.33301H14Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <ellipse cx="8.0013" cy="6.00032" rx="1.33333" ry="1.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);