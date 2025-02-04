"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import { useLoan } from "@/hooks/useLoan";
import { StatusIndicator } from "@/components/applicants/StatusIndicator";
import GenericModal from "@/components/applicants/GenericModel";
import CustomTableWrapper from "../asset-clearance/CustomTableWrapper";
import { loanMainTableData } from "@/utils/company-flow/loanMainTableData";
import Image from "next/image";
import CurrencyType from "@/components/shared-components/CurrencyType";
import { headerMenuItemsForLoanTable } from "@/app/constants/assetClearance";
import LoanDeductionForm from "./LoanDeductionForm";
import VisaLoanForm from "./VisaLoanForm";

const LoanMainTable = ({ open, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    filters,
    isModalOpen,
    currentPage,
    totalEntries,
    handleRowSelect,
    handleMenuClick,
    handleFilterClick,
    onSearchChange,
    handleTotalEntriesChange,
    setCurrentPage,
    selectedRequest
  } = useLoan();

  const column = [
    {
      field: "id",
      headerName: "ID",
      group: "shared",
      align: "left",
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            borderBottom: "1px solid #20A4D5E5",
            color: "#20A4D5E5",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          {row.id}
        </Typography>
      ),
    },
    {
      field: "fullName",
      headerName: "FULL NAME AS PER EMIRATES ID",
      group: "shared",
      align: "left",
      render: (row) => {
        return (
          <CustomAvatar
            image={row.image}
            email={row.email}
            fullName={row.fullName}
          />
        );
      },
    },
    {
      field: "date",
      headerName: "DATE",
      group: "shared",
      align: "left",
    },
    {
      field: "reasonForLoan",
      group: "shared",
      headerName: "REASON FOR LOAN",
      align: "left",
    },
    {
      field: "visaStatus",
      group: "basic",
      headerName: "VISA STATUS",
      align: "left",
      render: (row) => (
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Image src="/challans/Avatar.png" width={20} height={20} alt="" />
          <Typography variant="caption">{row.visaStatus}</Typography>
        </Box>
      ),
    },
    {
      field: "purchaseCost",
      group: "shared",
      headerName: "PURCHASE COST (ACTUAL COST)",
      align: "left",
      render: (row) => {
        return (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{
                padding: "4px 10px",
                borderRadius: "3px",
                width: 45,
              }}
            >
              {row.purchaseCost}
            </Typography>
            <CurrencyType />
          </Box>
        );
      },
    },
    {
      field: "visaLoanAmountChargedToRider",
      group: "details",
      headerName: "VISA LOAN AMOUNT CHARGED TO RIDER",
      align: "left",
      render: (row) => {
        return (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{
                padding: "4px 10px",
                borderRadius: "3px",
                width: 45,
              }}
            >
              {row.visaLoanAmountChargedToRider}
            </Typography>
            <CurrencyType />
          </Box>
        );
      },
    },
    {
      field: "advanceReceived",
      headerName: "ADVANCE RECEIVED",
      group: "details",
      align: "left",
      render: (row) => {
        return (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{
                padding: "4px 10px",
                borderRadius: "3px",
                width: 45,
              }}
            >
              {row.advanceReceived}
            </Typography>
            <CurrencyType />
          </Box>
        );
      },
    },
    {
      field: "deductionType",
      headerName: "DEDUCTION TYPE",
      group: "details",
      align: "left",
    },
    {
      field: "status",
      headerName: "STATUS",
      group: "details",
      align: "left",
      render: (row) => (
        <StatusIndicator status={row.status} pathname={pathname} />
      ),
    },
  ];

  return (
    <>
      <Box component="div">
        <GenericModal
          open={open}
          onClose={onClose}
        >
          {selectedRequest === "request visa" && <VisaLoanForm onClose={onClose} />}
          {selectedRequest === "request loan" && <LoanDeductionForm onClose={onClose} />}
        </GenericModal>
      </Box>

      <CustomTableWrapper
        handleOpenModal={open}
        handleCloseModal={onClose}
        rowsPerPage={9}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        filters={filters}
        column={column}
        handleFilterClick={handleFilterClick}
        handleMenuClick={handleMenuClick}
        handleRowSelect={handleRowSelect}
        pathname={pathname}
        tableData={loanMainTableData}
        totalEntries={totalEntries}
        setTotalEntries={handleTotalEntriesChange}
        isBtnAdd={false}
        isExportBtn={true}
        isActionMenu={true}
        showSearch={true}
        menuItems={headerMenuItemsForLoanTable}
        onSearchChange={onSearchChange}
        filterTitle="Select Employee"
        isWdth={true}
        isShow={false}
        isBorderRadius={true}
      />
    </>
  );
};

export default LoanMainTable;
