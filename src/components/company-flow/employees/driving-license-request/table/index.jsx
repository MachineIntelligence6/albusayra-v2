import CampaignsWrapper from "@/components/Campaigns/index";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { Avatar, Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { dlTableData } from "../../data";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import Link from "next/link";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CurrencyType from "@/components/shared-components/CurrencyType";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { useRouter } from "next/navigation";
import ViewDetailModal from "../view-detail";

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
  // {
  //   id: 4,
  //   filterName: "City",
  //   placeholder: "Islamabad",
  //   options: [
  //     { id: 1, label: "Islamabad", value: "islamabad" },
  //     { id: 2, label: "Rawalpindi", value: "rawalpindi" },
  //     { id: 3, label: "Peshawar", value: "peshawar" },
  //   ],
  // },
];

const DLTable = () => {
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };

  const handleMenuClick = (value) => {
    // if (value.action === "add-contract") router.push("corporate/add-contract");
    // if (value.action === "view") router.push("employees/view-employee");
    console.log("clicked menu", value);
    if (value.action === "view") setShowModal(true);
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
      { field: "date", headerName: "Date", align: "left" },
      {
        field: "reason",
        headerName: "Reason Of Driving Request",
        align: "left",
      },
      {
        field: "riderAmount",
        headerName: "Charged to Rider",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ fontSize: "13px" }}>{row.riderAmount}</Typography>
            <CurrencyType />
          </Box>
        ),
      },
      {
        field: "actuallAmount",
        headerName: "Actual License cost",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ fontSize: "13px" }}>
              {row.actuallAmount}
            </Typography>
            <CurrencyType />
          </Box>
        ),
      },
      {
        field: "installmentPlan",
        headerName: "Installment Plan",
        align: "left",
      },
      { field: "remarks", headerName: "Remarks", align: "left" },

      {
        field: "status",
        headerName: "Status",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              bgcolor:
                (row.status === "Pending" && "#7367F029") ||
                (row.status === "Approved" && "#28C76F29") ||
                (row.status === "New Request" && "#FF9F4329") ||
                (row.status === "Rejected" && "#FF4C5129") || // Example color for "Rejected"
                "transparent", // Default background if no condition matches
              color:
                (row.status === "Pending" && "#7367F0") ||
                (row.status === "Approved" && "#28C76F") ||
                (row.status === "New Request" && "#FF9F43") ||
                (row.status === "Rejected" && "#FF4C51") || // Example color for "Rejected"
                "inherit", // Default color if no condition matches
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
    <Box sx={{ mx: 2 }}>
      <TableFilters bottomBorder={false} filters={filters} />
      <TableExportRow isBtnAdd={false} />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={fullColumns}
          data={dlTableData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
          isSelectedOption={false}
        />
        <TablePagination />
      </Box>
      {showModal && <ViewDetailModal onClose={onClose} />}
    </Box>
  );
};

export default DLTable;
