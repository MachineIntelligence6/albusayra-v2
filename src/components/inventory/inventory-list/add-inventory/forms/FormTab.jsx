import { Box, Icon, Typography } from '@mui/material'
import { ChevronRight, Info } from 'lucide-react'
import React from 'react'

const FormTab = ({ tab, onClickTab }) => {
    return (
        <Box component="div" sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }} onClick={onClickTab?()=>onClickTab(tab):()=>{}}>

            <Box>{tab.getIcon(tab.isActive)}</Box>
            <Typography variant='body2' sx={{ fontSize: 16 }}>{tab.text}</Typography>
            <ChevronRight size={25} />
        </Box>
    )
}

export default FormTab
