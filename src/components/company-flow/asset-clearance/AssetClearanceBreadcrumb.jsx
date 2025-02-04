"use client"
import { custom } from '@/app/theme'
import CompanyHeader from '@/components/shared-components/CompanyHeader'
import DescriptiveText from '@/components/shared-components/DescriptiveText'
import React from 'react'

const AssetClearanceBreadcrumb = () => {
    return (
        <CompanyHeader>
            <DescriptiveText
                text={"Asset Clearance /"}
                fontSize={18}
                fontWeight={500}
                color={custom.muted}
            />
            <DescriptiveText
                text={"Asset Clearance"}
                fontSize={18}
                fontWeight={500}
                color={custom.dreadcrumbText}
            />
        </CompanyHeader>
    )
}

export default AssetClearanceBreadcrumb
