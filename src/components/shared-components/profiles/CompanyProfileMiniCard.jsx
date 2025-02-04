import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

const CompanyProfileMiniCard = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
            <Avatar src='/images/profile-new.png' sx={{ width: 100, height: 100 }} />
            <Typography>Zaheer Abbas</Typography>
        </Box>
    )
}

export default CompanyProfileMiniCard
