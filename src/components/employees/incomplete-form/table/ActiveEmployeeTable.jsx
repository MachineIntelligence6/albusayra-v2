"use client";
import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box } from "@mui/material";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { data } from "@/utils/campaigns.data";
import ActionMenu from "@/components/shared-components/ActionMenu";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
// import TablePagination from "../shared-components/Table-components/TablePagination";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";

const platformFilters = [
  {
    id: 1,
    filterName: "Resident",
    placeholder: "Non Resident",
    options: [
      { id: 1, label: "Non Resident", value: "non resident" },
      { id: 2, label: "Resident", value: "resident" },
    ],
  },
  {
    id: 3,
    filterName: "Country",
    placeholder: "UAE",
    options: [
      { id: 1, label: "UAE", value: "uae" },
      { id: 2, label: "Pakistan", value: "pakistan" },
      { id: 3, label: "India", value: "india" },
    ],
  },

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
  {
    id: 2,
    filterName: "Campaign",
    placeholder: "Please Select",
    options: [
      { id: 1, label: "Option 1", value: "option 1" },
      { id: 2, label: "Option 2", value: "option 2" },
    ],
  },
];

const columnConfig = {
  shortlistedApplicants: [
    "date",
    "fullName",
    "residentCountry",
    "residentCity",
    "drivingLicense",
    "phoneNumber",
    "campaignName",
    "action",
  ],
  campaignList: [
    "date",
    "fullName",
    "residentCountry",
    "residentCity",
    "drivingLicense",
    "phoneNumber",
    "campaignName",
    "remarks",
    "status1",
    "action",
    "drivingLicenseNo",
    "passportNo",
    "preferedWorkingCity",
    "referBy",
    "status2",
    "id",
  ],
};

const ActiveEmployeeTable = ({
  handleOpenModal,
  setCurrentPage,
  rowsPerPage,
  currentPage,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const totalEntries = 20;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
    // Add your filter logic here, such as opening a dropdown or modal
  };

  const handleMenuClick = (item) => {
    if (item.action === "View_details") router.push("employees/view-employee");
    if (item.action === "inactive_profiles")
      router.push("employees/inactive-employee");
    if (item.action === "incomplete_profiles")
      router.push("employees/incomplete-profile");
  };

  const MenuItems = useMemo(
    () => [
      { label: "View Details", action: "View_details" },
      { label: "Inactive Profiles", action: "inactive_profiles" },
      { label: "Incomplete Profiles", action: "incomplete_profiles" },
    ],
    []
  );

  // Define the full columns configuration
  const fullColumns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              color: "#20A4D5E5",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            {row.id}
          </Box>
        ),
      },

      // { field: "id", headerName: "ID", align: "left" },
      { field: "date", headerName: "DATE", align: "left" },
      {
        field: "fullName",
        headerName: "FULL NAME",
        align: "left",
        render: (row) => (
          <CustomAvatar
            image={row.image}
            email={row.email}
            fullName={row.fullName}
          />
        ),
      },
      {
        field: "residentCountry",
        headerName: "RESIDENT COUNTRY",
        align: "left",
      },
      { field: "residentCity", headerName: "RESIDENT CITY", align: "left" },
      // { field: "drivingLicense", headerName: "DRIVING LICENSE", align: "left" },
      {
        field: "drivingLicenseNo",
        headerName: "DRIVING LICENSE",
        align: "left",
      },
      { field: "passportNo", headerName: "PASSPORT NUMBER", align: "left" },
      { field: "phoneNumber", headerName: "PHONE NUMBER", align: "left" },
      {
        field: "preferedWorkingCity",
        headerName: "PREFERED WORKING CITY",
        align: "left",
      },
      { field: "referBy", headerName: "REFER BY", align: "left" },
      { field: "campaignName", headerName: "CAMPAIGN NAME", align: "left" },
      {
        field: "status2",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              backgroundColor:
                row.status2 === "Active" ? "#28C76F29" : "#FF9F4329",
              color: row.status2 === "Active" ? "#28C76F" : "#7367F0",
              padding: "4px 8px",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            {row.status2}
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
    ],
    [MenuItems, handleMenuClick]
  );

  // Dynamically set columns based on the current path
  const columns = useMemo(() => {
    const key = pathname.includes("shortlisted-applicants")
      ? "shortlistedApplicants"
      : "campaignList";
    return fullColumns.filter((column) =>
      columnConfig[key]?.includes(column.field)
    );
  }, [pathname, fullColumns]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, rowsPerPage]);

  return (
    <Box sx={{ bgcolor: "white", overflow: "hidden", m: 1.5, borderRadius: 6 }}>
      <TableFilters filters={platformFilters} />
      <TableExportRow handleOpenModal={handleOpenModal} />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={columns}
          data={data}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
        />
        {/* Pagination Component */}
        <TablePagination />
      </Box>
    </Box>
  );
};

export default ActiveEmployeeTable;
