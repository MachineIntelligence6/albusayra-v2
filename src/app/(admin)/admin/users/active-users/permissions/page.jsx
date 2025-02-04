"use client";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { CustomPermissionTabs } from "@/components/shared-components/CustomPermissionTabs";
import { CompanyIcon, GlobalIcon } from "@/utils/Icons";
import CustomizablePermissionsTable from "@/components/roles-template/CustomPermissionsTable";
import { CompanyPermissions, permissions } from "@/utils/permissionsData";
import ViewEmployeeHeader from "@/components/shared-components/ViewEmployeeHeader";

const columns = ["View", "Add", "Edit", "Delete"];

const Page = () => {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabData = [
    {
      icon: <GlobalIcon sx={{ marginRight: 1, color: "#fff" }} />,
      label: "Global Permissions",
      content: "Content for Global Permissions",
    },
    {
      icon: <CompanyIcon sx={{ marginRight: 1 }} />,
      label: "Company Permissions",
      content: "Content for Company Permissions",
    },
  ];

  const cardData = {
    title: "Basic Information",
    editButton: true,
    data: [
      {
        label: "Role",
        value: "Administrator",
        // icon: <Person />
      },
      {
        label: "Created Date",
        value: "10-12-2023",
        //  icon: <CalendarToday />
      },
      {
        label: "User Type",
        value: "Internal User",
        //  icon: <Group />
      },
      {
        label: "Status",
        value: "Active",
        // icon: <CheckCircle fontSize="20px" />,
        valueStyle: { color: "green", fontWeight: "bold" },
      },
    ],
  };

  useEffect(() => {
    if (pathname === "/challans/traffic") {
      // You might want to set these flags or remove if unnecessary
      setIsBtnShow(true);
      setIsChallan(true);
    }
  }, [pathname]);

  const handleEdit = () => {
    console.log("Edit button clicked!");
  };

  const handleEditTab = () => {
    console.log("Edit button clicked!");
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />
      {/* Card Section */}
      <Box
        sx={{
          margin: "20px 0px",
        }}
      >
        <ViewEmployeeHeader
          fullName="Saleem Akhtar"
          description="Super Admin"
          // buttons={buttons}
          // onBackClick={handleBackClick}
          // onEditClick={handleEditClick}
          profileImage={"/icons/Careem.svg"}
          sx={{
            borderRadius: "15px",
            // border: "2px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Box sx={{ marginY: "20px", fontWeight: "700" }}>
          <CustomPermissionTabs
            tabData={tabData}
            onClick={handleEditTab}
            handleChange={handleChange}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Box>
        {selectedTab === 0 && (
          <>
            <Typography
              variant="body2"
              sx={{ marginY: "20px", fontWeight: "500", fontSize: "20px", color: "#2F2B3DE5" }}
            >
              Global Permissions
            </Typography>{" "}
            <CustomizablePermissionsTable
              permissions={permissions}
              columns={columns}
              customPermissionsLabel="Custom Permissions"
            />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <Typography
              variant="body2"
              sx={{ marginY: "20px", fontWeight: "500", fontSize: "20px", color: "#2F2B3DE5" }}
            >
              Company Permissions
            </Typography>{" "}
            <CustomizablePermissionsTable
              permissions={CompanyPermissions}
              columns={columns}
              customPermissionsLabel="Custom Permissions"
            />
          </>
        )}
      </Box>
    </>
  );
};

export default Page;
