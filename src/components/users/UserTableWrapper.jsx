"use client";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { userData } from "@/utils/user-data";
import CustomDropdown from "../shared-components/CustomDropDown";
import ActionMenu from "../shared-components/ActionMenu";
import TableExportRow from "../shared-components/Table-components/TableExportRow";
import TablePagination from "../shared-components/Table-components/TablePagination";
import CustomTable from "../shared-components/Table-components/CustomTable";
import CustomTextField from "../shared-components/CustomTextField";
import CustomAvatar from "../shared-components/CustomAvatar";
import { StatusIndicator } from "../applicants/StatusIndicator";
import IOSSwitch from "../ui/switch-button";

const roleFilters = [
  {
    id: 1,
    filterName: "Name",
    placeholder: "e.g jhon",
    options: [
      { id: 19, label: "UAE", value: "uae" },
      { id: 29, label: "Pakistan", value: "pakistan" },
      { id: 39, label: "India", value: "india" },
    ],
  },
  {
    id: 22,
    filterName: "Email",
    placeholder: "jho@gmial.com",
    options: [
      { id: 193, label: "UAE", value: "uae" },
      { id: 293, label: "Pakistan", value: "pakistan" },
      { id: 393, label: "India", value: "india" },
    ],
  },
  {
    id: 3,
    filterName: "Role",
    placeholder: "Please Select",
    options: [
      { id: 61, label: "panding", value: "panding" },
      { id: 62, label: "complete", value: "complete" },
      { id: 63, label: "rejected", value: "rejected" },
    ],
  },
  {
    id: 2,
    filterName: "User Type",
    placeholder: "Please Select",
    options: [
      { id: 71, label: "UAE", value: "uae" },
      { id: 72, label: "Pakistan", value: "pakistan" },
      { id: 73, label: "India", value: "india" },
    ],
  },
];

const UserTableWrapper = ({
  handleOpenModal,
  setCurrentPage,
  rowsPerPage,
  currentPage,
  isActive,
  // selectedValue,
  // onChange,
}) => {
  const [filters, setFilters] = useState(roleFilters);
  const [totalEntries, setTotalEntries] = useState(10);
  const router = useRouter();
  const pathname = usePathname();
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };

  const handleMenuClick = (value) => {
    console.log("clicked menu", value);
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
  };

  const menuConfigurations = useMemo(
    () => ({
      activeUser: {
        menuItems: [
          {
            label: "Permissions",
            route: "/admin/users/active-users/permissions",
          },
          {
            label: "View Details",
            route: "/admin/users/active-users/view-details",
          },
          {
            label: "Edit Details",
            route: "/admin/users/active-users/view-details",
          },
        ],
      },
    }),
    []
  );

  const currentMenuConfig = useMemo(() => {
    if (
      pathname.includes("admin/users/active-users") ||
      pathname.includes("admin/users/inactive-users")
    )
      return menuConfigurations.activeUser;
  }, [menuConfigurations, pathname]);

  // Define the full columns configuration
  const fullColumns = useMemo(
    () => [
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
              width: "fit-content",
            }}
          >
            {row.id}
          </Typography>
        ),
      },
      {
        field: "userName",
        headerName: "USER NAME",
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
      { field: "userType", headerName: "USER TYPE", align: "left" },
      {
        field: "role",
        headerName: "ROLE",
        align: "left",
        render: (row) => (
          <StatusIndicator status={row.role} pathname={pathname} />
        ),
      },
      { field: "createdDate", headerName: "CREATED DATE", align: "left" },
      { field: "lastLogin", headerName: "LAST LOGIN", align: "left" },
      {
        field: "active/inactive",
        headerName: "ACTIVE/INACTIVE",
        align: "left",
        render: (row) => (
          <IOSSwitch
            checked={isActive}
            //    onChange={handleToggle}
            color="success" // Green color for active status
            inputProps={{ "aria-label": "Status toggle" }}
          />
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => (
          <ActionMenu
            menuItems={currentMenuConfig?.menuItems}
            onMenuItemClick={(item) => router.push(item.route)}
          />
        ),
      },
    ],
    [currentMenuConfig?.menuItems, pathname, router]
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return userData?.slice(startIndex, endIndex);
  }, [currentPage, rowsPerPage, isActive]);

  return (
    <Box
      sx={{ bgcolor: "white", overflow: "hidden", my: 1.5, borderRadius: 6 }}
    >
      <Box component="div" sx={{ m: 2 }}>
        <Typography
          variant="caption"
          sx={{ fontSize: "15px", color: "#2F2B3DE5", fontWeight: "500" }}
        >
          Advance Filters
        </Typography>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // flexWrap: "wrap",
            gap: "1rem",
            my: 2,
          }}
        >
          {filters?.length
            ? filters?.map((filter) => {
                return (
                  <React.Fragment key={filter?.id}>
                    {filter?.filterName === "Role" ? (
                      // CustomTextField for Role filter
                      <Box
                        display="flex"
                        alignItems="start"
                        flexDirection="column"
                        sx={{ width: "100%" }}
                      >
                        <div>{filter?.filterName}</div>
                        <CustomTextField
                          placeholder={filter?.placeholder}
                          onChange={(e) => console.log("Role:", e.target.value)}
                          // sx={{
                          //   width: "100%",
                          //   borderRadius: "20px",
                          // }}
                        />
                      </Box>
                    ) : filter?.options ? (
                      // CustomDropdown for dropdown filters
                      <Box sx={{ width: "100%" }}>
                        <CustomDropdown
                          label={filter?.filterName}
                          placeholder={filter?.placeholder}
                          options={filter?.options}
                          sx={{ width: "100%" }} // Ensure same width
                        />
                      </Box>
                    ) : (
                      // Fallback for filters without options
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <Typography>{filter?.filterName}</Typography>
                      </Box>
                    )}
                  </React.Fragment>
                );
              })
            : null}
        </Box>
        <Divider />
      </Box>
      <TableExportRow
        handleOpenModal={handleOpenModal}
        setTotalEntries={setTotalEntries}
        totalEntries={totalEntries}
        pathname={pathname}
      />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={fullColumns}
          data={paginatedData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
        />
        {/* Pagination Component */}
        <TablePagination
          totalEntries={totalEntries}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default UserTableWrapper;
