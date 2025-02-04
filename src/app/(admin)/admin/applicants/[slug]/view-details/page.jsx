"use client";
import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import GenericModal from "@/components/applicants/GenericModel";
import AddIcon from "@mui/icons-material/Add";
import { usePathname } from "next/navigation";
import ProfileView from "@/components/applicants/view-details/profile-view";
import RemarksModal from "@/components/applicants/view-details/RemarkModel";
import { useRouter } from "next/navigation";
import GeneralEditForm from "@/components/applicants/edit-forms/GeneralEditForm";
import ContactEditForm from "@/components/applicants/edit-forms/ContactEditForm";
import DrivingLicenseEditForm from "@/components/applicants/edit-forms/DrivingLicenseEditForm";
import PassportDetailsEditForm from "@/components/applicants/edit-forms/PassportEditForm";
import ReferralEditForm from "@/components/applicants/edit-forms/ReferralEditfForm";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";

const Page = () => {
  const route = useRouter();
  const pathname = usePathname();
  const [isBtnShow, setIsBtnShow] = useState(false);
  const [status, setStatus] = useState("not_qualified");

  const [isModalRemarkOpen, setIsModalRemarkOpen] = useState(false);
  const [isGeneralInfoModalOpen, setIsGeneralInfoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDrivingLicenseModalOpen, setIsDrivingLicenseModalOpen] =
    useState(false);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/applicants/final-review") {
      setIsBtnShow(true);
    }
  }, [pathname]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleEdit = (section) => {
    if (section === "General Info") {
      setIsGeneralInfoModalOpen(true);
    } else if (section === "Contact Info") {
      setIsContactModalOpen(true);
    }
    if (section === "Driving License") {
      setIsDrivingLicenseModalOpen(true);
    }
    if (section === "Passport Details") {
      setIsPassportModalOpen(true);
    }
    if (section === "Referral") {
      setIsReferralModalOpen(true);
    }
  };

  const handleRemarkSave = (section) => {
    console.log(`handleRemarkSave ${section}`);
    setIsModalRemarkOpen(false);
  };

  const handleProceed = (section) => {
    console.log(`handleProceed ${section}`);
    route.push("/admin/applicants/final-review");
  };

  const handleStatusChange = (value) => {
    console.log("Status changed to:", value);
  };

  const handleOptionClick = (option) => {
    console.log("Option clicked:", isModalRemarkOpen, option);
    setIsModalRemarkOpen(true); // Set state to open modal

    // if (option.value === "not_qualified" || option.value === "hold") {
    //   console.log("Opening modal for:", option.value);
    // }
    // setStatus(option.value); // Update the status
  };

  // Remark model
  const handleCloseRemarkModal = () => {
    console.log("Setting isModalRemarkOpen to false");
    setIsModalRemarkOpen(false); // State update to false
  };

  // Generalinfo Form model
  const handleCloseGeneralInfoModal = () => {
    console.log("Setting isModalRemarkOpen to false");
    setIsGeneralInfoModalOpen(false); // State update to false
  };

  // Contactinfo Form model
  const handleCloseContactInfoModal = () => {
    console.log("Setting isModalRemarkOpen to false");
    setIsContactModalOpen(false); // State update to false
  };

  // DrivingLicense Form model
  const handleCloseDrivingLicenseInfoModal = () => {
    console.log("Setting isModalRemarkOpen to false");
    setIsDrivingLicenseModalOpen(false); // State update to false
  };

  // Contactinfo Form model
  const handleClosePassportDetailsInfoModal = () => {
    console.log("Setting isModalRemarkOpen to false");
    setIsPassportModalOpen(false); // State update to false
  };

  // Contactinfo Form model
  const handleCloseReferralInfoModal = () => {
    console.log("Setting isModalRemarkOpen to false");
    setIsReferralModalOpen(false); // State update to false
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb isBtnShow={isBtnShow} icon={<AddIcon />} />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box component="div">
        {/* remark */}
        <GenericModal open={isModalRemarkOpen} onClose={handleCloseRemarkModal}>
          <RemarksModal
            setIsModalRemarkOpen={setIsModalRemarkOpen}
            onSave={handleRemarkSave}
          />
        </GenericModal>

        {/* general Info */}
        <GenericModal
          open={isGeneralInfoModalOpen}
          onClose={handleCloseGeneralInfoModal}
          title="Applicants Modal"
        >
          <GeneralEditForm
            setIsGeneralInfoModalOpen={setIsGeneralInfoModalOpen}
            onSave={handleRemarkSave}
          />
        </GenericModal>

        {/* Contact Info */}
        <GenericModal
          open={isContactModalOpen}
          onClose={handleCloseContactInfoModal}
          title="Applicants Modal"
        >
          <ContactEditForm
            setIsContactModalOpen={setIsContactModalOpen}
            onSave={handleRemarkSave}
          />
        </GenericModal>

        {/* DrivingLicenseEditForm Info */}
        <GenericModal
          open={isDrivingLicenseModalOpen}
          onClose={handleCloseDrivingLicenseInfoModal}
          title="Applicants Modal"
        >
          <DrivingLicenseEditForm
            setIsDrivingLicenseModalOpen={setIsDrivingLicenseModalOpen}
            onSave={handleRemarkSave}
          />
        </GenericModal>

        {/* Passport Details Edit Form Info */}
        <GenericModal
          open={isPassportModalOpen}
          onClose={handleClosePassportDetailsInfoModal}
          title="Applicants Modal"
        >
          <PassportDetailsEditForm
            setIsPassportModalOpen={setIsPassportModalOpen}
            onSave={handleRemarkSave}
          />
        </GenericModal>

        {/* Referral Edit Form Info */}
        <GenericModal
          open={isReferralModalOpen}
          onClose={handleCloseReferralInfoModal}
          title="Applicants Modal"
        >
          <ReferralEditForm
            setIsReferralModalOpen={setIsReferralModalOpen}
            onSave={handleRemarkSave}
          />
        </GenericModal>

        <ProfileView
          isModalRemarkOpen={isModalRemarkOpen}
          setStatus={setStatus}
          status={status}
          handleOptionClick={handleOptionClick}
          handleStatusChange={handleStatusChange}
          handleEdit={handleEdit}
          handleChange={handleChange}
          handleProceed={handleProceed}
        />
      </Box>
    </>
  );
};

export default Page;
