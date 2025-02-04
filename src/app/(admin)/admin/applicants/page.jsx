"use client";

import { Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";

const Page = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("applicants/shortlisted-applicants");
  };

  return (
    <>
      <Box sx={{}}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />

      <Box
        component="div"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        height="80vh"
      >
        {/* <GenericModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Applicants Modal"
      >
        <MultiStepFormModel handleCloseModal={handleCloseModal} />
      </GenericModal> */}
        <EmptyScreenView
          image="/applicantIcons/ApplicantsLogo.svg"
          altText="campaign"
          title="No Applicant Added"
          description="Please click the button below to add a new Employee"
          buttonText="Add Applicant"
          onButtonClick={handleClick}
          // onButtonClick={handleOpenModal}
        />
      </Box>
    </>
  );
};

export default Page;
