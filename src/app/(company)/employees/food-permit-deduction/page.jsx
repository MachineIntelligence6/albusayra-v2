import React from 'react'
import FoodPermitDeduction from '@/components/company-flow/food-permit-deduction'

const page = ({ searchParams }) => {
    console.log(searchParams)
    return (
        <FoodPermitDeduction params={searchParams ? searchParams : null} />
    )
}

export default page
