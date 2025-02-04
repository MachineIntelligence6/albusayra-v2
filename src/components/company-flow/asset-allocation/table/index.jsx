"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { assetClarenceData } from "@/utils/company-flow/asset-clarance-data";
import CustomTableWrapper from "@/components/company-flow/asset-clearance/CustomTableWrapper";
import CustomAvatar from "@/components/shared-components/CustomAvatar";

const TableFiltersData = [
  {
    id: 2,
    filterName: "ID",
    placeholder: "3212",
    inputType: "text",
  },
  {
    id: 3,
    filterName: "Employment Type",
    placeholder: "Rider/any other",
    inputType: "dropdown",
    options: [
      { id: 12, label: "Rider", value: "rider" },
      { id: 22, label: "Any other", value: "any other" },
    ],
  },
  {
    id: 4,
    filterName: "Employee Name",
    placeholder: "e.g Rashid",
    inputType: "text",
  },
  {
    id: 1,
    filterName: "Resident",
    placeholder: "UAE Resident/Iqama",
    inputType: "dropdown",
    options: [
      { id: 14, label: "UAE Resident", value: "uae resident" },
      { id: 24, label: "Non Resident", value: "non resident" },
    ],
  },
];

const actionMenu = [
  { label: "Allocate Asset", route: "/asset-allocation/bike-assign" },
  { label: "Asset Clearence", route: "/asset-clearance" },
  { label: "View Details", route: "#" },
];

const headerMenuItems = [
  { label: "Edit", action: "edit" },
  { label: "Delete", action: "delete" },
];

const AllocateAssetTable = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [filters, setFilters] = useState(TableFiltersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(10);
  const [headerSearchValue, setHeaderSearchValue] = useState("");
  const rowsPerPage = 7;

  // Handler for search input change
  const onSearchChange = (value) => {
    console.log("Search Value:", value);
    setHeaderSearchValue(value);
  };

  // Handler for total entries dropdown change
  const handleTotalEntriesChange = (value) => {
    console.log("Total Entries Selected:", value);
    setTotalEntries(value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("cl");
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };

  const handleMenuClick = (menuItem) => {
    console.log("Menu clicked:", menuItem.label);
    router.push(menuItem.route);
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
    // Add your filter logic here, such as opening a dropdown or modal
  };

  const column = [
    {
      field: "id",
      headerName: "ID",
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
      align: "left",
      render: (row) => (
        <CustomAvatar
          fullName={row.fullName}
          image={row.image}
          email="abce@gmail.com"
        />
      ),
    },

    {
      field: "resident",
      headerName: "RESIDENT",
      align: "left",
      render: (row) => (
        <Typography
          variant="caption"
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #104774",
            padding: "7px 10px",
            borderRadius: "6px",
            color: "#104774",
          }}
        >
          {row.resident}
        </Typography>
      ),
    },

    {
      field: "phoneNumber",
      headerName: "PHONE NUMBER",
      align: "left",
    },
    {
      field: "bikeNumber",
      headerName: "Bike No.",
      align: "left",
      render: (row) => {

        return (
          <Typography
            variant="body2"
            sx={{
              borderBottom: "1px solid #20A4D5E5",
              color: "#20A4D5E5",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            {row.bikeNumber}
          </Typography>
        )
      },
    },
    {
      field: "simNumber",
      headerName: "Sim No.",
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
          {row.simNumber}
        </Typography>
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
              (row.status === "Approval Pending" && "#7367F029") ||
              (row.status === "Approved" && "#28C76F29") ||
              (row.status === "New Request" && "#FF9F4329") ||
              (row.status === "Rejected" && "#FF4C5129") || // Example color for "Rejected"
              "transparent", // Default background if no condition matches
            color:
              (row.status === "Approval Pending" && "#7367F0") ||
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
      headerName: "ACTION",
      align: "left",
      render: (row) => (
        <ActionMenu
          menuItems={actionMenu}
          onMenuItemClick={(item) => router.push(item.route)}
        />
      ),
    },
  ];

  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <CustomTableWrapper
          isShow={false}
          isWidth={true}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          filters={filters}
          column={column}
          handleFilterClick={handleFilterClick}
          handleMenuClick={handleMenuClick}
          handleRowSelect={handleRowSelect}
          pathname={pathname}
          tableData={assetClarenceData}
          // Header export Row props
          totalEntries={totalEntries}
          setTotalEntries={handleTotalEntriesChange}
          isBtnAdd={false}
          isExportBtn={true}
          isActionMenu={true}
          showSearch={true}
          menuItems={headerMenuItems}
          onSearchChange={onSearchChange}
        />
      </Box>
    </>
  );
};

export default AllocateAssetTable;
