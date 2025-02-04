"use client"
import { custom } from '@/app/theme'
import FormLayout from '@/components/company-flow/food-permit-deduction/FormLayout'
import CompanyHeader from '@/components/shared-components/CompanyHeader'
import DescriptiveText from '@/components/shared-components/DescriptiveText'
import { Box } from '@mui/material'
import React from 'react'

const Page = () => {
    return (
        <Box component="div">
            <CompanyHeader>
                <DescriptiveText
                    text={"Food Permit Deduction"}
                    fontSize={18}
                    fontWeight={500}
                    color={custom.dreadcrumbText}
                />
            </CompanyHeader>
            <Box sx={{ p: 2 }}>
                <FormLayout />
            </Box>
        </Box>
    )
}

export default Page
