"use client"
import React from 'react'
import { Box } from '@mui/material'
import { PlusIcon } from 'lucide-react'
import CompanyHeader from '@/components/shared-components/CompanyHeader'
import DescriptiveText from '@/components/shared-components/DescriptiveText'
import { custom } from '@/app/theme'
import { useLoan } from '@/hooks/useLoan'
import LoanMainTable from '@/components/company-flow/loan/LoanMainTable'

const Page = () => {
  const {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  } = useLoan();

  return (
    <>
      <CompanyHeader btnProps={{
        startIcon: <PlusIcon />,
        text: 'New Request',
        onClick: handleOpenModal,
      }}>
        <DescriptiveText
          text={"Loan Form"}
          fontSize={18}
          fontWeight={500}
          color={custom.primaryText}
        />

      </CompanyHeader>
      <Box sx={{ bgcolor: "white", m: 1.5, borderRadius: "25px", boxShadow: "0px 3px 12px 0px rgba(47, 43, 61, 0.14)" }}>
        <LoanMainTable open={isModalOpen} onClose={handleCloseModal} />
      </Box>
    </>
  )
}

export default Page;
