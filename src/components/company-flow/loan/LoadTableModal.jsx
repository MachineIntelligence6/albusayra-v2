"use client"
import ActionMenu from "@/components/shared-components/ActionMenu";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import CustomTableWrapper from "../asset-clearance/CustomTableWrapper";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import { useLoan } from "@/hooks/useLoan";
import { assetClarenceData } from "@/utils/company-flow/asset-clarance-data";
import { custom } from "@/app/theme";
import { StatusIndicator } from "@/components/applicants/StatusIndicator";
import GenericModal from "@/components/applicants/GenericModel";
import { actionMenu } from "@/app/constants/loan";

const LoanTableModal = ({ open, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    modalFilterData,
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
      field: "resident",
      headerName: "RESIDENT",
      group: "shared",
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
    {
      field: "drivingLicense",
      group: "basic",
      headerName: "DRIVING LICENSE",
      align: "left",
    },
    {
      field: "passportNumber",
      group: "basic",
      headerName: "PASSPORT NUMBER",
      align: "left",
    },
    {
      field: "phoneNumber",
      group: "shared",
      headerName: "PHONE NUMBER",
      align: "left",
    },
    {
      field: "bikeNumber",
      group: "details",
      headerName: "BIKE NO.",
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
          {row.bikeNumber}
        </Typography>
      ),
    },
    {
      field: "simNumber",
      headerName: "SIM NO.",
      group: "details",
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
      headerName: "STATUS",
      group: "details",
      align: "left",
      render: (row) => (
        <StatusIndicator status={row.status} pathname={pathname} />
      ),
    },
    {
      field: "employeeType",
      headerName: "EMPLOYEE TYPE",
      group: "basic",
      align: "left",
      render: (row) => (
        <Typography
          variant="caption"
          sx={{
            backgroundColor: "#80839029",
            // row.employeeType === "Rider" ? "#80839029" : "#FCE4EC",
            padding: "4px 10px",
            borderRadius: "3px",
            color: "#2F2B3DE5",
          }}
        >
          {row.employeeType}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "ACTION",
      group: "shared",
      align: "left",
      render: (row) => (
        <ActionMenu
          menuItems={actionMenu}
          onMenuItemClick={(item) => router.push(item.route)}
        />
      ),
    },
  ];

  const getColumnsByGroup = (group) => {
    return column.filter(
      (col) => col.group === "shared" || col.group === group
    );
  };

  const basicColumns = getColumnsByGroup("basic");
  const detailsColumns = getColumnsByGroup("details");

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="80vh"
    >
      <GenericModal
        open={open}
        onClose={onClose}
        title="Applicants Modal"
        height="80vh"
        width="100%"
      >
        <CustomTableWrapper
          handleOpenModal={open}
          handleCloseModal={onClose}
          rowsPerPage={9}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          filters={modalFilterData}
          column={basicColumns}
          handleFilterClick={handleFilterClick}
          handleMenuClick={handleMenuClick}
          handleRowSelect={handleRowSelect}
          pathname={pathname}
          tableData={assetClarenceData}
          totalEntries={totalEntries}
          setTotalEntries={handleTotalEntriesChange}
          isBtnAdd={false}
          isExportBtn={false}
          isActionMenu={false}
          showSearch={true}
          // menuItems={headerMenuItems}
          onSearchChange={onSearchChange}
          filterTitle="Selected Employees"
        />
      </GenericModal>
    </Box>
  );
};

export default LoanTableModal;
