"use client";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { CustomPermissionTabs } from "@/components/shared-components/CustomPermissionTabs";
import { CalendarIcon, CompanyIcon, GlobalIcon, ShieldIcon, UserIcon } from "@/utils/Icons";
import RoleInfoCard from "@/components/roles-template/RoleInfoCard";
import CustomizablePermissionsTable from "@/components/roles-template/CustomPermissionsTable";
import { CompanyPermissions, permissions } from "@/utils/permissionsData";

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
    title: "BASIT INFORMATION",
    showEditButton: true,
    data: [
      {
        label: "Role",
        value: "Administrator",
        icon: <UserIcon className="h-4 w-4" />
      },
      {
        label: "Created Date",
        value: "10-12-2023",
        icon: <CalendarIcon className="h-4 w-4" />
      },
      {
        label: "User Type",
        value: "Global User",
        icon: <UserIcon className="h-4 w-4" />
      },
      {
        label: "Status",
        value: "Active",
        icon: <ShieldIcon />,
      },
    ]
  };

  useEffect(() => {
    if (pathname.includes("/challans/traffic")) {
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
        <Box sx={{ marginY: "20px", fontWeight: "700" }}>
          <RoleInfoCard
            title={cardData.title}
            data={cardData.data}
            onEdit={handleEdit}
          />
          <Typography
            variant="body2"
            sx={{ marginY: "20px", fontWeight: "600", fontSize: "18px", color: "#2F2B3DE5" }}
          >
            ROLES & PERMISSIONS
          </Typography>
          <CustomPermissionTabs
            tabData={tabData}
            onClick={handleEditTab}
            handleChange={handleChange}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Box>
        {selectedTab === 0 && (
          <CustomizablePermissionsTable
            permissions={permissions}
            columns={columns}
            customPermissionsLabel="Custom Permissions"
          />
        )}
        {selectedTab === 1 && (
          <CustomizablePermissionsTable
            permissions={CompanyPermissions}
            columns={columns}
            customPermissionsLabel="Custom Permissions"
          />
        )}
      </Box>
    </>
  );
};

export default Page;
