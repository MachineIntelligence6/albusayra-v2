import { custom } from '@/app/theme'
import { Typography } from '@mui/material'
import React from 'react'

const DialogHeading = (props) => {
    const { text, sx } = props
    return (
        <Typography component="h4" fontSize={20} fontWeight={600} lineHeight={2} sx={{ ...sx }} {...props}>{text}</Typography>

    )
}

export default DialogHeading
