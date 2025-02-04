"use client"
import { custom } from '@/app/theme'
import DescriptiveText from '@/components/shared-components/DescriptiveText'
import HeadingText1 from '@/components/shared-components/HeadingText1'
import { Box } from '@mui/material'
import React from 'react'

const Page = () => {
    return (
        <Box sx={{ width: '100%', height: "80vh", display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
            <HeadingText1 sx={{ fontSize: 40, fontWeight: 700, color: custom.primaryText }}>Dashboard</HeadingText1>
            <DescriptiveText text="There is no section for company dashboard in Figma" color="red"></DescriptiveText>
        </Box>
    )
}

export default Page
