import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { ClearanceTableData } from "../../data";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import Link from "next/link";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CurrencyType from "@/components/shared-components/CurrencyType";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { useRouter } from "next/navigation";
import RejectModal from "../../advance-salary/table/RejectModal";
import { DownloadIcon, PdfIcon } from "@/utils/Icons";

const filters = [
  { id: 1, filterName: "Employee ID", placeholder: "e.g" },
  { id: 3, filterName: "Employee Name", placeholder: "e.g" },

  {
    id: 2,
    filterName: "Status",
    placeholder: "Please Select",
    options: [
      { id: 1, label: "Option-1", value: "option-1" },
      { id: 2, label: "Option-2", value: "option-2" },
      { id: 3, label: "Option-3", value: "option-3" },
    ],
  },
];

const ClearanceTable = () => {
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };

  const handleMenuClick = (value) => {
    console.log("clicked menu", value);
    if (value.action === "reject") setShowModal(true);
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
  };

  const MenuItems = useMemo(
    () => [
      { label: "Accept", action: "accept" },
      { label: "Reject", action: "reject" },
      { label: "View Details", action: "view" },
    ],
    []
  );
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
        field: "terminationReason",
        headerName: "Reason of termination/Resign",
        align: "left",
      },
      { field: "bike", headerName: "Bike", align: "left" },
      { field: "sim", headerName: "Sim", align: "left" },
      { field: "deduction", headerName: "Deductions", align: "left" },

      {
        field: "deductionAmount",
        headerName: "Deduction Amount",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ fontSize: "13px" }}>
              {row.deductionAmount}
            </Typography>
            {row.deductionAmount !== "--" && <CurrencyType />}
          </Box>
        ),
      },
      {
        field: "deductionReason",
        headerName: "Deduction Reason",
        align: "left",
      },

      {
        field: "clearanceForm",
        headerName: "Clearance Form",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {row.clearanceForm !== "--" && <PdfIcon />}
            <Typography sx={{ fontSize: "13px" }}>
              {row.clearanceForm}
            </Typography>
            {row.clearanceForm !== "--" && <DownloadIcon />}
          </Box>
        ),
      },

      {
        field: "status",
        headerName: "Status",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              bgcolor:
                (row.status === "Pending" && "#7367F029") ||
                (row.status === "Cleared" && "#28C76F29") ||
                (row.status === "New Request" && "#00BAD129") ||
                // (row.status === "Rejected" && "#FF4C5129") ||
                "transparent",
              color:
                (row.status === "Pending" && "#7367F0") ||
                (row.status === "Cleared" && "#28C76F") ||
                (row.status === "New Request" && "#00BAD1") ||
                // (row.status === "Rejected" && "#FF4C51") ||
                "inherit",
              borderRadius: "4px",
              p: "2px 10px",
              textAlign: "center",
              width: "fit-content",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>{row.status}</Typography>
          </Box>
        ),
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

  return (
    <Box sx={{ bgcolor: "white", mx: 2 }}>
      <TableFilters bottomBorder={false} filters={filters} />
      <TableExportRow isBtnAdd={false} />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={fullColumns}
          data={ClearanceTableData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
          isSelectedOption={false}
        />
        <TablePagination />
      </Box>
      {showModal && <RejectModal onClose={onClose} />}
    </Box>
  );
};

export default ClearanceTable;
