import { custom } from '@/app/theme';
import { Typography } from '@mui/material';
import React from 'react'

const HeadingText3 = (props) => {
    const { fontSize = 25, fontWeight = 700, color = custom.primaryText, children, sx } = props;
    return (
        <Typography component="h3" fontSize={fontSize} fontWeight={fontWeight} color={color} sx={{ ...sx }} {...props}>{children}</Typography>
    )
}

export default HeadingText3
