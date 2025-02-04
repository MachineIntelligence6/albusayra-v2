"use client";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import Link from "next/link";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { useRouter } from "next/navigation";
import { payrollTableData, payrollTableData1 } from "@/utils/PayrollTableData";
import CustomButton from "@/components/shared-components/CustomButton";
import { Check } from "lucide-react";
import { EditIcon } from "@/utils/Icons";

const filters = [
  { id: 1, filterName: "Month", placeholder: "September 2024" },
  {
    id: 2,
    filterName: "Payroll Type",
    placeholder: "e.g",
    options: [
      { id: 1, label: "Option-1", value: "option-1" },
      { id: 2, label: "Option-2", value: "option-2" },
      { id: 3, label: "Option-3", value: "option-3" },
    ],
  },

  {
    id: 2,
    filterName: "Platform",
    placeholder: "",
    options: [
      { id: 1, label: "Option-1", value: "option-1" },
      { id: 2, label: "Option-2", value: "option-2" },
      { id: 3, label: "Option-3", value: "option-3" },
    ],
  },
];

const filters1 = [
  { id: 1, filterName: "Month", placeholder: "September 2024" },
  {
    id: 2,
    filterName: "Providing Company",
    placeholder: "e.g",
    options: [
      { id: 1, label: "Option-1", value: "option-1" },
      { id: 2, label: "Option-2", value: "option-2" },
      { id: 3, label: "Option-3", value: "option-3" },
    ],
  },
];

const FixedTable = () => {
  const fullColumns = useMemo(() => {
    return [
      {
        field: "id",
        headerName: "ID",
        align: "left",
        render: (row) => (
          <Link
            href="#"
            style={{
              color: "#20A4D5E5",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            {row.id}
          </Link>
        ),
      },
      {
        field: "name",
        headerName: "full name as per emirates Id",
        align: "left",
        render: (row) => (
          <CustomAvatar
            fullName={row.name}
            image={row.image}
            email="abce@gmail.com"
          />
        ),
      },
      {
        field: "platformId",
        headerName: "ID",
        align: "left",
        render: (row) => (
          <Link
            href="#"
            style={{
              color: "#20A4D5E5",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            {row.platformId}
          </Link>
        ),
      },
      { field: "visaStatus", headerName: "Visa Status", align: "left" },
      {
        field: "joiningDate",
        headerName: "Date Of Joining",
        align: "left",
      },
      { field: "workDays", headerName: "No. Of Work Days", align: "left" },
      {
        field: "perfectAttendance",
        headerName: "Perfect attendance",
        align: "left",
      },
      {
        field: "totalDeliveries",
        headerName: "total no. of deliveries",
        align: "left",
      },
      { field: "totalEarning", headerName: "Total earning", align: "left" },
      {
        field: "specialAllowance",
        headerName: "Special allowance",
        align: "left",
      },

      { field: "vendorShare", headerName: "Vendor Share", align: "left" },
      { field: "salik", headerName: "Salik", align: "left" },
      { field: "trafficChallan", headerName: "Traffic challan", align: "left" },
      {
        field: "foodPermit",
        headerName: "Food Permit / Labour card",
        align: "left",
      },
      {
        field: "loanDeduction",
        headerName: "Total Deduction",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "14px", color: "#2F2B3DE5" }}>
              {row.loanDeduction.amount1}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#2F2B3DE5" }}>
              |
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#27AE60" }}>
              {row.loanDeduction.amount2}
            </Typography>
          </Box>
        ),
      },
      { field: "salaryAdvance", headerName: "Salary Advance", align: "left" },

      { field: "cod", headerName: "COD", align: "left" },
      {
        field: "generalDeduction",
        headerName: "general deduction",
        align: "left",
      },
      { field: "penalty", headerName: "Penalty", align: "left" },
      { field: "totalDeduction", headerName: "total deduction", align: "left" },
      {
        field: "nerSalary",
        headerName: "net salary for the month",
        align: "left",
      },
      {
        field: "previousAdjustment",
        headerName: "previous month adjustment",
        align: "left",
      },
      {
        field: "netSalaryTransfer",
        headerName: "net salary to be transfer",
        align: "left",
      },

      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => (
          <ActionMenu menuItems={MenuItems} onMenuItemClick={handleMenuClick} />
        ),
      },
    ];
  }, []);

  const fullColumns1 = useMemo(() => {
    return [
      {
        field: "id",
        headerName: "ID",
        align: "left",
        render: (row) => (
          <Link
            href="#"
            style={{
              color: "#20A4D5E5",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            {row.id}
          </Link>
        ),
      },
      {
        field: "name",
        headerName: "full name as per emirates Id",
        align: "left",
        render: (row) => (
          <CustomAvatar
            fullName={row.name}
            image={row.image}
            email="abce@gmail.com"
          />
        ),
      },

      {
        field: "acquiringCompany",
        headerName: "Aquiring Company",
        align: "left",
      },
      {
        field: "providingCompany",
        headerName: "Providing Company",
        align: "left",
      },

      { field: "grossSalary", headerName: "Gross Salary", align: "left" },

      {
        field: "totalDeduction",
        headerName: "Total Deduction",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "14px", color: "#2F2B3DE5" }}>
              {row.totalDeduction.amount1}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#2F2B3DE5" }}>
              |
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#27AE60" }}>
              {row.totalDeduction.amount2}
            </Typography>
          </Box>
        ),
      },

      {
        field: "totoalSalaryPaid",
        headerName: "Total Salary to be paid",
        align: "left",
      },
      {
        field: "riderPlatformStatus",
        headerName: " Rider Platform Status",
        align: "left",
      },
      { field: "processSalary", headerName: "Process Salary", align: "left" },

      {
        field: "holdTemporarily",
        headerName: "Total Deduction",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            {row.holdTemporarily}
            <EditIcon />
          </Box>
        ),
      },
      {
        field: "holdPermanently",
        headerName: "Hold Permanently",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            {row.holdPermanently}
            <EditIcon />
          </Box>
        ),
      },
      {
        field: "comments",
        headerName: "Comments",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            {row.comments}
            <EditIcon />
          </Box>
        ),
      },
    ];
  }, []);

  const handleRowSelect = (selectedRowIds) => {};
  const [currentData, setCurrentData] = useState(payrollTableData);
  const [currentFilters, setCurrentFilters] = useState(filters);
  const [currentColumns, setCurrentColumns] = useState(fullColumns);

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
  };

  const handleMenuClick = (value) => {
    if (value.action === "fixed") {
      setCurrentData(payrollTableData); // Switch to fixed table data
      setCurrentFilters(filters); // Switch to fixed filters
      setCurrentColumns(fullColumns);
    } else if (value.action === "commission") {
      setCurrentData(payrollTableData1); // Switch to commission table data
      setCurrentFilters(filters1); // Switch to commission filters
      setCurrentColumns(fullColumns1);
    }
  };

  const MenuItems = useMemo(
    () => [
      { label: "Fixed", action: "fixed" },
      { label: "Commission", action: "commission" },
    ],
    []
  );

  return (
    <Box sx={{ bgcolor: "white" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFF",
          borderRadius: "4px",
          p: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TableFilters bottomBorder={true} filters={currentFilters} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <CustomButton endIcon={<Check size={16} />}>Process</CustomButton>
        </Box>
      </Box>
      <TableExportRow
        isBtnAdd={false}
        menuItems={MenuItems}
        handleMenuClick={handleMenuClick}
      />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={currentColumns}
          data={currentData}
          // onRowSelect={handleRowSelect}
          // handleFilterClick={handleFilterClick}
          isSelectedOption={true}
        />
        <TablePagination />
      </Box>
    </Box>
  );
};

export default FixedTable;
