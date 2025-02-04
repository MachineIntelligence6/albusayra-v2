"use client"
import React from 'react'
import Loan from '@/components/company-flow/loan'

const page = ({ searchParams }) => {
    console.log(searchParams)
    return (
        <Loan params={searchParams ? searchParams : null} />
    )
}

export default page;
