"use client";
// import React from "react";
// import { Box, Divider } from "@mui/material";
// import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
// import EmployeeTableWrapper from "@/components/employees/incomplete-form/Table";

// const page = () => {
//   return (
//     <>
//       <Box sx={{ px: 2 }}>
//         <DynamicBreadcrumb />
//       </Box>
//       <Divider sx={{ mt: 2 }} />
//       <Box>
//         <EmployeeTableWrapper />
//       </Box>
//     </>
//   );
// };

// export default page;

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
import { updateSuccess } from "@/redux/reducers/campaign/campaignSlice";
import { updateEmployeeSuccess } from "@/redux/reducers/applicants/applicantSlice";
import { updateSuccessBank } from "@/redux/reducers/dataBank/dataBankSlice";
import EmployeeTableWrapper from "@/components/employees/incomplete-form/Table";

const Page = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const { submitApplicantSuccess } = useSelector(
    (state) => state.applicantSlice
  );
  const { submitSuccess } = useSelector((state) => state.campaignSlice); // for change status globally
  const { statusChangeSuccessBulk } = useSelector(
    (state) => state.dataBankSlice
  ); // for change status globally

  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    dispatch(updateEmployeeSuccess());
    setSelectedApplicantId(null);
    setIsModalOpen(false);
  };

  // Determine statuses dynamically based on the URL
  const filteredStatuses = useMemo(() => {
    if (pathname.includes("admin/employees/inactive-employee")) {
      return [2]; // InActive Employee
    }
  }, [pathname]);

  // On Load Table
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

  // campaign -- getCampaignListByStatus
  useEffect(() => {
    if (submitSuccess) {
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

  // DataBank -- getCampaignListByStatus
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

  // for Submit Form -- getCampaignListByStatus
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
            setSelectedApplicantId={setSelectedApplicantId}
            handleCloseModal={handleCloseModal}
          />
        </GenericModal>
        <EmployeeTableWrapper
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
      </Box>
    </>
  );
};

export default Page;
