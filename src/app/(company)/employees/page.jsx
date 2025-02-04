import React from 'react'
import CompanyEmployees from '@/components/company-flow/employees'

const page = ({ searchParams }) => {
    return (
        <CompanyEmployees params={searchParams}  />
    )
}

export default page
