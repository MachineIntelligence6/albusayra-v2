"use client";

import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import GenericModal from "@/components/applicants/GenericModel";
import { usePathname } from "next/navigation";
import ChallansForm from "@/components/challans/ChallansForm";
import AddUserForm from "@/components/users/AddUserForm";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isBtnShow, setIsBtnShow] = useState(false);
  const [isChallan, setIsChallan] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.push("/users/roles-template/add-new-roles");
  };

  useEffect(() => {
    if (pathname === "/challans/traffic") {
      setIsBtnShow(true);
      setIsChallan(true);
    }
  }, [pathname]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />

      <Box component="div">
        <GenericModal
          open={isModalOpen}
          onClose={handleCloseModal}
          title="Applicants Modal"
        >
          <AddUserForm handleCloseModal={handleCloseModal} />
        </GenericModal>
        <Box sx={{ mt: 15 }}>
          <EmptyScreenView
            image="/users/Frame.svg"
            altText="user page icon"
            title="No Users"
            description="Please click the button below to add new user. "
            buttonText="Add Users"
            //   onButtonClick={handleClick}
            onButtonClick={handleOpenModal}
          />
        </Box>
      </Box>
    </>
  );
};

export default Page;
