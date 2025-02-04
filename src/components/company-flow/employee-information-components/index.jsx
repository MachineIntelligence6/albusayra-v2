"use client";
import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import {
  actionMenuItems,
  empInfoBaseTableData,
} from "@/utils/company-flow/employee-inforamtion-base.data";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { useRouter } from "next/navigation";

const actionMenu = [
  { label: "View Details", action: "view" },
  { label: "Edit Details", action: "edit" },
];

const tableFiltersData = [
  {
    id: 2,
    filterName: "ID",
    placeholder: "3212",
  },
  {
    id: 3,
    filterName: "Employment Type",
    placeholder: "Rider/any other",
    options: [
      { value: "rider", label: "Rider" },
      { value: "any_other", label: "Any Other" },
    ],
  },
  {
    id: 4,
    filterName: "Employee Name",
    placeholder: "e.g Rashid",
  },
  {
    id: 1,
    filterName: "Resident",
    placeholder: "UAE Residencny/Iqama",
    options: [
      { label: "UAE Resident", value: "uae_resident" },
      { label: "Non UAE Resident", value: "non_uae_resident" },
    ],
  },
];

const EmployeeInformationBase = () => {
  const router = useRouter();

  const handleActionMenu = (item) => {
    if (item.action === "view_details")
      router.push("/employees/employee-information-base/employee-details");
  };

  const columns = useMemo(() => {
    return [
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
            email={row.email}
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
        field: "drivingLicense",
        headerName: "DRIVING LICENSE",
        align: "left",
      },

      {
        field: "passportNumber",
        headerName: "PASSPORT NUMBER",
        align: "left",
      },
      {
        field: "phoneNumber",
        headerName: "PHONE NUMBER",
        align: "left",
      },
      {
        field: "employeeType",
        headerName: "EMPLOYEE TYPE",
        align: "left",
        render: (row) => (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "#80839029",
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
        align: "left",
        render: (row) => (
          <ActionMenu
            menuItems={actionMenuItems}
            onMenuItemClick={(item) => handleActionMenu(item)}
          />
        ),
      },
    ];
  }, []);

  return (
    <Box>
      <CompanyHeader>
        <DescriptiveText
          text={"Employee Information Base"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box component="div" sx={{ m: 2 }}>
        <TableFilters filters={tableFiltersData} heading="Select Employee" />
        <TableExportRow isBtnAdd={false} isExportBtn={false} isMenu={false} />
        <CustomTable data={empInfoBaseTableData} columns={columns} />
      </Box>
    </Box>
  );
};

export default EmployeeInformationBase;
