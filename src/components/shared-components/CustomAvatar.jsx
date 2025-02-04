import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import theme, { custom } from '@/app/theme'

const CustomAvatar = ({ image, email, fullName }) => {
    return (
        <Box component="div" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar src={image} sx={{ width: "34px", height: "34px" }} />
            <Box component="div" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                <Typography variant='body1' sx={{ fontWeight: 500, fontSize: 15, color: custom.primaryText }}>{fullName}</Typography>
                <Typography variant='body1' sx={{ fontWeight: 400, color: custom.descriptive, fontSize: 13 }}>{email}</Typography>
            </Box>
        </Box>
    )
}

export default CustomAvatar
