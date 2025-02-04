"use client";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { CustomPermissionTabs } from "@/components/shared-components/CustomPermissionTabs";
import { CompanyIcon, GlobalIcon } from "@/utils/Icons";
import RoleInfoCard from "@/components/roles-template/RoleInfoCard";
import CustomizablePermissionsTable from "@/components/roles-template/CustomPermissionsTable";
import { CompanyPermissions, permissions } from "@/utils/permissionsData";
import ViewEmployeeHeader from "@/components/shared-components/ViewEmployeeHeader";
import {
  Building,
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  User,
  UserCircle2,
} from "lucide-react";

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
    title: "General Information",
    showEditButton: true,
    data: [
      {
        label: "Full Name",
        value: "Saleem Akhtar",
        icon: <User size={18} />,
      },
      {
        label: "Role",
        value: "Administrator",
        icon: <UserCircle2 size={18} />,
      },
      {
        label: "Phone Number",
        value: "+971 123 456 7890",
        icon: <Phone size={18} />,
      },
      {
        label: "State/Province",
        value: "Non-UAE Resident",
        icon: <MapPin size={18} />,
      },
      {
        label: "Active/Inactive",
        value: "Active",
        icon: <Globe2 size={18} />,
        // valueStyle: { color: "green", fontWeight: "bold" }
      },
      {
        label: "User Type",
        value: "Global User",
        icon: <User size={18} />,
      },
      {
        label: "Email Address",
        value: "saleemakhtar@gmail.com",
        icon: <Mail size={18} />,
      },
      {
        label: "Country",
        value: "Dubai",
        icon: <Globe2 size={18} />,
      },
      {
        label: "City",
        value: "Agent",
        icon: <Building2 size={18} />,
      },
      {
        label: "Company",
        value: "Al-Busayra",
        icon: <Building size={18} />,
      },
    ],
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
        <ViewEmployeeHeader
          fullName="Saleem Akhtar"
          description="Super Admin"
          // buttons={buttons}
          // onBackClick={handleBackClick}
          // onEditClick={handleEditClick}
          profileImage={"/images/profile-m.jpg"}
          sx={{
            borderRadius: "15px",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Box sx={{ marginY: "20px", fontWeight: "700" }}>
          <RoleInfoCard
            title={cardData.title}
            data={cardData.data}
            onEdit={handleEdit}
          />
          <Typography
            variant="body2"
            sx={{
              marginY: "20px",
              fontWeight: "500",
              fontSize: "20px",
              color: "#2F2B3DE5",
            }}
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
