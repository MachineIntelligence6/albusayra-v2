// import CampaignsWrapper from "@/components/Campaigns";
import { Avatar, Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { AssetHistoryTableData } from "../../employees/data";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import CustomAvatar from "@/components/shared-components/CustomAvatar";

const AssetHistory = () => {
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };

  const handleMenuClick = (value) => {
    // if (value.action === "add-contract") router.push("corporate/add-contract");
    // if (value.action === "view") setShowPopup(true);
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
        field: "bikePlateNumber",
        headerName: "Bike Plate Number",
        align: "left",
        render: (row) => <Typography>{row.bikePlateNumber}</Typography>,
      },
      {
        field: "bikeCity",
        headerName: "Bike City",
        align: "left",
        render: (row) => <Typography>{row.bikeCity}</Typography>,
      },
      {
        field: "name",
        headerName: "Bike Ownership",
        align: "left",
        render: (row) => (
          <CustomAvatar
            fullName={row.bikeOwnershipText}
            image={row.bikeOwnershipImage}
          />
        ),
      },
      {
        field: "bikeIssueDate",
        headerName: "Date of Bike isssue ",
        align: "left",
        render: (row) => <Typography>{row.bikeIssueDate}</Typography>,
      },
      {
        field: "bikeIssueTime",
        headerName: "Time of Bike Issue ",
        align: "left",
      },
      {
        field: "foodPermit",
        headerName: "Food Permit provided to Rider",
        align: "left",
      },
      {
        field: "mulkiya",
        headerName: "Mulkiya provided to Rider",
        align: "left",
      },

      {
        field: "name",
        headerName: "Rider Acquiring Vendor",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {row.physicalAllocationImage}
            <Typography>{row.physicalAllocationText}</Typography>
            {row.physicalAllocationImage1}
          </Box>
        ),
      },
      {
        field: "clearanceDate",
        headerName: "Clearance  Date",
        align: "left",
        render: (row) => <Typography>{row.clearanceDate}</Typography>,
      },

      {
        field: "name",
        headerName: "Rider Acquiring Vendor",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={row.vendorImage} />
            <Typography>{row.riderAcquiringVendor}</Typography>
          </Box>
        ),
      },
      {
        field: "name",
        headerName: "Rider Acquiring Vendor",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={row.rider_platform_image} />
            <Typography>{row.rider_platform}</Typography>
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
              bgcolor: "#28C76F29",
              color: "#28C76F",
              borderRadius: "4px",
              p: "2px 10px;",
              textAlign: "center",
              width: "fit-content",
            }}
          >
            <Typography>{row.status}</Typography>
          </Box>
        ),
      },
    ];
  }, []);

  return (
    <Box sx={{ bgcolor: "white" }}>
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={fullColumns}
          data={AssetHistoryTableData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
          isSelectedOption={false}
        />
      </Box>
    </Box>
  );
};

export default AssetHistory;
