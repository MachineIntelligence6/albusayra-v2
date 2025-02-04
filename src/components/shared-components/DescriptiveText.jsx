import { custom } from '@/app/theme';
import { Box, Typography } from '@mui/material';
import React from 'react'

const DescriptiveText = (props) => {
    const { text, fontSize = 15, fontWeight = 400, letterSpacing = 0.5, required = false, color = custom.descriptive, sx } = props;
    return (

        <Box component="span" >
            <Typography component="p" fontSize={fontSize} letterSpacing={letterSpacing} fontWeight={fontWeight} position="relative" width={"fit-content"} color={color} sx={{ ...sx }} {...props}>
                {text}
                {required && <Typography color={custom.errorDark} sx={{ position: "absolute", top: -5, right: -7 }}>*</Typography>}
            </Typography>

        </Box>
    )
}

export default DescriptiveText
