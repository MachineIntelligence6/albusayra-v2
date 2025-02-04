import CampaignsWrapper from "@/components/campaigns";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { Avatar, Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { companyEmployeesTableData } from "./data";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import Link from "next/link";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CurrencyType from "@/components/shared-components/CurrencyType";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { useRouter } from "next/navigation";
import { custom } from "@/app/theme";

const filters = [
  { id: 1, filterName: "ID", placeholder: "3421" },
  {
    id: 3,
    filterName: "Platform",
    placeholder: "Rider/any other",
    options: [
      { id: 1, label: "Rider", value: "rider" },
      { id: 2, label: "Option-2", value: "option-2" },
      { id: 3, label: "Option-3", value: "option-3" },
    ],
  },
  { id: 1, filterName: "Serach By Name", placeholder: "e.g john" },
  {
    id: 4,
    filterName: "City",
    placeholder: "Islamabad",
    options: [
      { id: 1, label: "Islamabad", value: "islamabad" },
      { id: 2, label: "Rawalpindi", value: "rawalpindi" },
      { id: 3, label: "Peshawar", value: "peshawar" },
    ],
  },
];

const CompanyEmpTableWrapper = () => {
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };
  const router = useRouter();
  const handleMenuClick = (value) => {
    // if (value.action === "add-contract") router.push("corporate/add-contract");
    if (value.action === "view")
      router.push("/employees/add-employee/view-employee");
    console.log("clicked menu", value);
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
  };

  const MenuItems = useMemo(
    () => [
      { label: "View Details", action: "view" },
      { label: "Edit Details", action: "edit" },
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
        field: "resident",
        headerName: "Resident",
        align: "left",
        render: (row) => (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "transparent",
              border: `1px solid ${custom.deepBlue}`,
              padding: "7px 10px",
              borderRadius: "6px",
              color: custom.deepBlue,
            }}
          >
            {row.resident}
          </Typography>
        ),
      },
      { field: "drivingLicense", headerName: "Driving License", align: "left" },
      { field: "passportNumber", headerName: "Passport Number", align: "left" },
      {
        field: "personalMobileNumber",
        headerName: "Personal Mobile (UAE)",
        align: "left",
      },
      {
        field: "rider_acquiring_vendor",
        headerName: "Rider Acquiring Vendor",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "15px",
            }}
          >
            <Avatar src={row.vendor_image} />
            <Typography sx={{ fontSize: "15px" }}>
              {row.rider_acquiring_vendor}
            </Typography>
          </Box>
        ),
      },
      {
        field: "rider_platform",
        headerName: "Rider Acquiring Platform",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={row.rider_platform_image} />
            <Typography sx={{ fontSize: "15px" }}>
              {row.rider_platform}
            </Typography>
          </Box>
        ),
      },
      { field: "city", headerName: "City", align: "left" },
      { field: "visaStatus", headerName: "Visa Status", align: "left" },
      { field: "contract", headerName: "Contract", align: "left" },
      { field: "salaryType", headerName: "Salary Type", align: "left" },
      {
        field: "fixedSalaryAmount",
        headerName: "Fixed Salary Amount",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ fontSize: "13px" }}>
              {row.fixedSalaryAmount}
            </Typography>
            <CurrencyType />
          </Box>
        ),
      },
      {
        field: "actualJoiningDate",
        headerName: "Actual joining date",
        align: "left",
      },
      { field: "ghpTraining", headerName: "GHP Training", align: "left" },
      { field: "c3_card", headerName: "C3 Card", align: "left" },
      {
        field: "c3_card_date",
        headerName: "C3 Card Applied Date",
        align: "left",
      },

      {
        field: "status",
        headerName: "Status",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              bgcolor: row.status === "Pending" ? "#7367F029" : "#28C76F29",
              color: row.status === "Pending" ? "#7367F0" : "#28C76F",
              borderRadius: "4px",
              p: "2px 10px;",
              textAlign: "center",
              width: "fit-content",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>{row.status}</Typography>
          </Box>
        ),
      },

      {
        field: "employeeType",
        headerName: "Employee Type",
        align: "left",
        render: (row) => (
          <Typography
            sx={{
              px: 1.5,
              borderRadius: 1,
              bgcolor: "#2F2B3D14",
              width: "fit-content",
              fontSize: "13px",
            }}
          >
            {row.employeeType}
          </Typography>
        ),
      },

      {
        field: "sim",
        headerName: "SIM",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              bgcolor: row.sim === "Assigned" ? "#7367F029" : "#28C76F29",
              color: row.sim === "Assigned" ? "#7367F0" : "#28C76F",
              borderRadius: "4px",
              p: "2px 10px;",
              textAlign: "center",
              width: "fit-content",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>{row.sim}</Typography>
          </Box>
        ),
      },
      {
        field: "bike",
        headerName: "Bike",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              bgcolor: row.bike === "Assigned" ? "#7367F029" : "#28C76F29",
              color: row.bike === "Assigned" ? "#7367F0" : "#28C76F",
              borderRadius: "4px",
              p: "2px 10px;",
              textAlign: "center",
              width: "fit-content",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>{row.bike}</Typography>
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
          data={companyEmployeesTableData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
          isSelectedOption={false}
        />
        <TablePagination />
      </Box>
    </Box>
  );
};

export default CompanyEmpTableWrapper;
