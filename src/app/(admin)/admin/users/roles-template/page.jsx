"use client";

import { Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
// import { useState } from "react";
// import MultiStepFormModel from "@/components/applicants/MultiStepFormModel";
// import GenericModal from "@/components/applicants/GenericModel";

const Page = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  //   console.log("cl");
  // }

  // const handleCloseModal = () => setIsModalOpen(false);

  const handleClick = () => {
    router.push("/admin/users/roles-template/add-new-roles");
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />

      <Box component="div" display="flex" justifyContent="center" flexDirection="column" alignItems="center" height="80vh">
        {/* <GenericModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Applicants Modal"
      >
        <MultiStepFormModel handleCloseModal={handleCloseModal} />
      </GenericModal> */}
        <EmptyScreenView
          image="/roles-template/Layer_1.svg"
          altText="template page icon"
          title="No Roles Added"
          description="Please click the button below to add new roles."
          buttonText="Add Roles"
          onButtonClick={handleClick}
        // onButtonClick={handleOpenModal}
        />
      </Box>
    </>
  );
};

export default Page;
