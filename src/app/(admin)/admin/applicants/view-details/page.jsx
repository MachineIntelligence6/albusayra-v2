"use client";
import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import GenericModal from "@/components/applicants/GenericModel";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import AddIcon from "@mui/icons-material/Add";
import { usePathname, useSearchParams } from "next/navigation";
import ProfileView from "@/components/applicants/view-details/profile-view";
import RemarksModal from "@/components/applicants/view-details/RemarkModel";
import { useRouter } from "next/navigation";
import GeneralEditForm from "@/components/applicants/edit-forms/GeneralEditForm";
import ContactEditForm from "@/components/applicants/edit-forms/ContactEditForm";
import DrivingLicenseEditForm from "@/components/applicants/edit-forms/DrivingLicenseEditForm";
import EmiratesEditForm from "@/components/applicants/edit-forms/EmiratesEditForm";
import PassportDetailsEditForm from "@/components/applicants/edit-forms/PassportEditForm";
import ReferralEditForm from "@/components/applicants/edit-forms/ReferralEditfForm";
import { ApplicantGetById } from "@/redux/reducers/applicants/applicantThunk";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "@/configs/UseApi";
import { changeUserStatus } from "@/redux/reducers/campaign/campaignThunk";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";
import { updateEmployeeSuccess } from "@/redux/reducers/applicants/applicantSlice";

const Page = () => {
  const route = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const applicantId = searchParams.get("id");
  const { proceedDetails: ViewDetails, submitApplicantSuccess } = useSelector(
    (state) => state.applicantSlice
  );

  console.log("ViewDetails", ViewDetails);

  const { submitSuccess } = useSelector((state) => state.campaignSlice);

  const [isBtnShow, setIsBtnShow] = useState(false);
  const [status, setStatus] = useState("not_qualified");
  const [editMod, setEditMod] = useState(false);

  const [isModalRemarkOpen, setIsModalRemarkOpen] = useState(false);
  const [isGeneralInfoModalOpen, setIsGeneralInfoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDrivingLicenseModalOpen, setIsDrivingLicenseModalOpen] =
    useState(false);
  const [isEmiratesModalOpen, setIsEmiratesModalOpen] = useState(false);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isUaeResident, setIsUaeResident] = useState(false);

  useEffect(() => {
    if (pathname === "/applicants/final-review") {
      setIsBtnShow(true);
    }
  }, [pathname]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  // useEffe sidentialStatus]);

  const handleEdit = (section) => {
    // console.log(section);
    if (section === "General Info") {
      setEditMod(true);
      setIsGeneralInfoModalOpen(true);
    } else if (section === "Contact Info") {
      setEditMod(true);
      setIsContactModalOpen(true);
    }
    if (section === "Emirates ID") {
      setEditMod(true);
      setIsEmiratesModalOpen(true);
    }
    if (section === "Driving License") {
      setEditMod(true);
      setIsDrivingLicenseModalOpen(true);
    }
    if (section === "Passport Details") {
      setEditMod(true);
      setIsPassportModalOpen(true);
    }
    if (section === "Referral") {
      setEditMod(true);
      setIsReferralModalOpen(true);
    }
  };

  const handleRemarkSave = (getRemarks) => {
    const params = {
      id: applicantId,
      updatedBy: UserData?.Id,
      status: status === "not_qualified" ? 9 : 6,
      reason: getRemarks,
    };

    dispatch(changeUserStatus(params)).then(() => {
      setIsModalRemarkOpen(false);
    });
  };

  const handleProceed = () => {
    const params = {
      id: applicantId,
      updatedBy: UserData?.Id,
      status: 11,
      reason: "Proceeded to incomplete profile",
    };

    dispatch(changeUserStatus(params)).then(() => {
      // route.push("/admin/applicants/final-review");
    });
  };

  const handleStatusChange = (value) => {
    console.log("Status changed to:", value);
  };

  const handleOptionClick = (option) => {
    // console.log("Option clicked:", isModalRemarkOpen, option);
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
    console.log("Setting__");
    setIsGeneralInfoModalOpen(false); // State update to false
    setEditMod(false);
  };

  // Contactinfo Form model
  const handleCloseContactInfoModal = () => {
    console.log("Setting__handleCloseContactInfoModal");
    setIsContactModalOpen(false); // State update to false
    setEditMod(false);
  };

  // EmiratesID Form model
  const handleCloseEmiratesModal = () => {
    console.log("Setting__");
    setIsEmiratesModalOpen(false); // State update to false
    setEditMod(false);
  };
  // DrivingLicense Form model
  const handleCloseDrivingLicenseInfoModal = () => {
    console.log("Setting__");
    setIsDrivingLicenseModalOpen(false); // State update to false
    setEditMod(false);
  };

  // Contactinfo Form model
  const handleClosePassportDetailsInfoModal = () => {
    console.log("Setting__");
    setIsPassportModalOpen(false); // State update to false
    setEditMod(false);
  };

  // Contactinfo Form model
  const handleCloseReferralInfoModal = () => {
    console.log("Setting__");
    setIsReferralModalOpen(false); // State update to false
    setEditMod(false);
  };

  useEffect(() => {
    if (applicantId) {
      dispatch(ApplicantGetById({ id: applicantId }));
    }
  }, [dispatch, applicantId]);

  useEffect(() => {
    if (editMod) {
      dispatch(ApplicantGetById({ id: applicantId }));
    }
  }, [dispatch, applicantId, editMod]);

  useEffect(() => {
    if (submitApplicantSuccess) {
      dispatch(ApplicantGetById({ id: applicantId })).then(() => {
        // dispatch(updateEmployeeSuccess());
      });
    }
  }, [dispatch, applicantId, submitApplicantSuccess]);

  useEffect(() => {
    if (submitSuccess) {
      dispatch(ApplicantGetById({ id: applicantId }));
      dispatch(updateSuccess());
    }
  }, [submitSuccess]);

  useEffect(() => {
    // ViewDetails?.emiratesId
    if (ViewDetails?.residentialStatus === "UAE Resident") {
      setIsUaeResident(true);
    }
  }, [ViewDetails?.residentialStatus]);

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
            isUaeResident={isUaeResident}
            setIsUaeResident={setIsUaeResident}
            handleCloseGeneralInfoModal={handleCloseGeneralInfoModal}
            onSave={handleRemarkSave}
            EditingData={ViewDetails}
          />
        </GenericModal>

        {/* Contact Info */}
        <GenericModal
          open={isContactModalOpen}
          onClose={handleCloseContactInfoModal}
          title="Applicants Modal"
        >
          <ContactEditForm
            isUaeResident={isUaeResident}
            setIsUaeResident={setIsUaeResident}
            EditingData={ViewDetails}
            handleCloseContactInfoModal={handleCloseContactInfoModal}
            onSave={handleRemarkSave}
          />
        </GenericModal>

        {/* Emirates Info */}
        <GenericModal
          open={isEmiratesModalOpen}
          onClose={handleCloseEmiratesModal}
          title="Applicants Modal"
        >
          <EmiratesEditForm
            isUaeResident={isUaeResident}
            handleCloseEmiratesModal={handleCloseEmiratesModal}
            EditingData={ViewDetails}
          />
        </GenericModal>

        {/* DrivingLicenseEditForm Info */}
        <GenericModal
          open={isDrivingLicenseModalOpen}
          onClose={handleCloseDrivingLicenseInfoModal}
          title="Applicants Modal"
        >
          <DrivingLicenseEditForm
            handleCloseDrivingLicenseInfoModal={
              handleCloseDrivingLicenseInfoModal
            }
            isUaeResident={isUaeResident}
            EditingData={ViewDetails}
          />
        </GenericModal>

        {/* Passport Details Edit Form Info */}
        <GenericModal
          open={isPassportModalOpen}
          onClose={handleClosePassportDetailsInfoModal}
          title="Applicants Modal"
        >
          <PassportDetailsEditForm
            handleClosePassportDetailsInfoModal={
              handleClosePassportDetailsInfoModal
            }
            isUaeResident={isUaeResident}
            EditingData={ViewDetails}
          />
        </GenericModal>

        {/* Referral Edit Form Info */}
        <GenericModal
          open={isReferralModalOpen}
          onClose={handleCloseReferralInfoModal}
          title="Applicants Modal"
        >
          <ReferralEditForm
            handleCloseReferralInfoModal={handleCloseReferralInfoModal}
            EditingData={ViewDetails}
          />
        </GenericModal>

        <ProfileView
          isModalRemarkOpen={isModalRemarkOpen}
          isUaeResident={isUaeResident}
          setStatus={setStatus}
          ViewDetails={ViewDetails}
          status={status}
          handleOptionClick={handleOptionClick}
          handleStatusChange={handleStatusChange}
          handleEdit={handleEdit}
          handleChange={handleChange}
          handleProceed={handleProceed}
          // handleProceed={handleRemarkSave}
        />
      </Box>
    </>
  );
};

export default Page;
