import { custom } from '@/app/theme';
import { Typography } from '@mui/material';
import React from 'react'

const HeadingText1 = (props) => {
    const { children, sx } = props;
    return (
        <Typography component="h3" sx={{ fontSize: 40, fontWeight: 700, color: custom.white, ...sx }} {...props}>{children}</Typography>
    )
}

export default HeadingText1
