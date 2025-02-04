"use client"
import React from 'react'
import DetailBreadcrumbText from '@/components/company-flow/employee-information-components/DetailBreadcrumbText'
import EmployeeDetailsIndex from '@/components/company-flow/employee-information-components/details-components'
import { Box } from '@mui/material'

const Page = () => {
    return (
        <>
            <DetailBreadcrumbText />
            <Box sx={{ mx: 2, my: 1.5 }}>
                <EmployeeDetailsIndex />
            </Box>
        </>
    )
}

export default Page
