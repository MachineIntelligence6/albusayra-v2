import React from 'react'
import CompanyHeader from '@/components/shared-components/CompanyHeader'
import DescriptiveText from '@/components/shared-components/DescriptiveText'
import { custom } from '@/app/theme'

const DetailBreadcrumbText = () => {
    return (
        <CompanyHeader >
            <DescriptiveText
                text={"Employee Information Base"}
                fontSize={18}
                fontWeight={500}
                color={custom.muted}

            />
            <DescriptiveText
                text={"/"}
                fontSize={18}
                fontWeight={500}
                color={custom.muted}
            />
            <DescriptiveText
                text={"Employee Details"}
                fontSize={18}
                fontWeight={500}
                color={custom.dreadcrumbText}
            />

        </CompanyHeader>
    )
}

export default DetailBreadcrumbText
