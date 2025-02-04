"use client";
import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { usePathname } from "next/navigation";
import UserTableWrapper from "@/components/users/UserTableWrapper";
import UserCard from "@/components/users/UserCard";
// import AddUserForm from '@/components/users/AddUserForm';
import {
  ActiveUserIcon,
  CompanyUserIcon,
  GlobalUserIcon,
  InactiveUserIcon,
} from "@/utils/Icons";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isBtnShow, setIsBtnShow] = useState(false);
  const [isChallan, setIsChallan] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;
  const pathname = usePathname();

  const userColoredCardData = [
    {
      bgColor: {
        background: "linear-gradient(105deg, #DA6F68 2.55%, #AE4039 98.46%)",
      },
      icon: <GlobalUserIcon />,
      totalUsers: 120,
      cardName: "Total Users",
    },
    {
      bgColor: {
        background: "linear-gradient(105deg, #52AD7E 2.55%, #2E724F 98.46%)",
      },
      icon: <CompanyUserIcon />,
      totalUsers: 50,
      cardName: "Active Users",
    },
    {
      bgColor: {
        background: "linear-gradient(105deg, #6F79A8 2.55%, #49537E 98.46%)",
      },
      icon: <ActiveUserIcon />,
      totalUsers: 70,
      cardName: "Inactive Users",
    },
    {
      bgColor: {
        background: "linear-gradient(105deg, #F3A458 2.55%, #786883 98.46%)",
      },
      icon: <InactiveUserIcon />,
      totalUsers: 30,
      cardName: "Admins",
    },
  ];

  const handleClick = () => {
    router.push("/users/roles-template/add-new-roles");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("cl");
  };

  const onChange = (e) => {
    setSelectedValue(e.target.value);
    console.log("cl");
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginY: "1rem",
        }}
      >
        {userColoredCardData?.map((card, index) => (
          <UserCard
            key={index}
            bgColor={card.bgColor}
            icon={card.icon}
            totalUsers={card.totalUsers}
            cardName={card.cardName}
          />
        ))}
      </Box>
      <Typography
        variant="body2"
        sx={{ fontSize: "18px", fontWeight: "500", color: "#4B465C", mt: 3 }}
      >
        Total users with their roles
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box component="div">
        <UserTableWrapper
          handleOpenModal={handleOpenModal}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          selectedValue={selectedValue}
          onChange={onChange}
          isActive={isActive}
        />
      </Box>
    </>
  );
};

export default Page;
