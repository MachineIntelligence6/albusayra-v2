"use client";
import { useEffect, useMemo, useState } from "react";
import ApplicantsTableWrapper from "@/components/applicants/ApplicantsTableWrapper";
import { Box, Divider } from "@mui/material";
import GenericModal from "@/components/applicants/GenericModel";
import MultiStepFormModel from "@/components/applicants/MultiStepFormModel";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignListByStatus } from "@/redux/reducers/applicants/applicantThunk";
import { usePathname } from "next/navigation";
// import ApplicantsTableWrapper from "./ApplicantsTableWrapper";
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";
import { updateEmployeeSuccess } from "@/redux/reducers/applicants/applicantSlice";
import { updateSuccessBank } from "@/redux/reducers/dataBank/dataBankSlice";

const Page = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const { getListByStatus, submitApplicantSuccess } = useSelector(
    (state) => state.applicantSlice
  );
  const { submitSuccess } = useSelector((state) => state.campaignSlice);
  const { statusChangeSuccessBulk } = useSelector(
    (state) => state.dataBankSlice
  );

  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    dispatch(updateEmployeeSuccess());
    setIsModalOpen(false);
  };

  // Determine statuses dynamically based on the URL
  const filteredStatuses = useMemo(() => {
    if (pathname.includes("hold")) {
      return [6]; // Hold
    }
    if (pathname.includes("shortlisted-applicants")) {
      return [7]; // ShortListed
    }
    if (pathname.includes("not-qualified")) {
      return [9]; // NotQualified
    }
    if (pathname.includes("final-review")) {
      return [10]; // Final
    }

    // return ALL_STATUSES; // Default: All statuses
  }, [pathname]);

  useEffect(() => {
    const params = {
      page: currentPage,
      pageLength: pageSize,
      statuses: filteredStatuses,
      filter2: search,
      desc: "false",
      orderBy: "CreatedBy",
    };
    dispatch(getCampaignListByStatus(params));
  }, [filteredStatuses, dispatch, currentPage, pageSize, search]);

  useEffect(() => {
    if (submitSuccess) {
      // campaign
      const params = {
        page: currentPage,
        pageLength: pageSize,
        statuses: filteredStatuses,
        desc: "false",
        orderBy: "CreatedBy",
      };
      dispatch(getCampaignListByStatus(params));
      dispatch(updateSuccess()); // campaign
    }
  }, [filteredStatuses, dispatch, submitSuccess, currentPage, pageSize]);

  // DataBank
  useEffect(() => {
    if (statusChangeSuccessBulk) {
      const params = {
        page: currentPage,
        pageLength: pageSize,
        statuses: filteredStatuses,
        desc: "false",
        orderBy: "CreatedBy",
      };
      dispatch(getCampaignListByStatus(params));
      dispatch(updateSuccessBank()); // DataBank
    }
  }, [
    filteredStatuses,
    dispatch,
    statusChangeSuccessBulk,
    currentPage,
    pageSize,
  ]);

  // for Submit Form
  useEffect(() => {
    if (submitApplicantSuccess) {
      const params = {
        page: currentPage,
        pageLength: pageSize,
        statuses: filteredStatuses,
        desc: "false",
        orderBy: "CreatedBy",
      };
      dispatch(getCampaignListByStatus(params));
      dispatch(updateEmployeeSuccess());
    }
  }, [
    filteredStatuses,
    dispatch,
    submitApplicantSuccess,
    currentPage,
    pageSize,
  ]);

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
          <MultiStepFormModel
            applicantId={selectedApplicantId}
            handleCloseModal={handleCloseModal}
          />
        </GenericModal>
        {/* {getListByStatus?.data?.length > 0 ? ( */}
        <ApplicantsTableWrapper
          handleOpenModal={handleOpenModal}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          filteredStatuses={filteredStatuses}
          search={search}
          setSearch={setSearch}
          setSelectedApplicantId={setSelectedApplicantId}
        />
        {/* ) : (
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            height="80vh"
          >
            <EmptyScreenView
              image="/applicantIcons/ApplicantsLogo.svg"
              altText="campaign"
              title="No Applicant Added"
              description="Please click the button below to add a new Employee"
              buttonText="Add Applicant"
              onButtonClick={handleOpenModal}
            />
          </Box>
        )} */}
      </Box>
    </>
  );
};

export default Page;
