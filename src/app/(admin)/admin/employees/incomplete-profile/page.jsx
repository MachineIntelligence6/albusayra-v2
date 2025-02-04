"use client";
import { useEffect, useMemo, useState } from "react";
import ApplicantsTableWrapper from "@/components/applicants/ApplicantsTableWrapper";
import { Box, Divider } from "@mui/material";
import GenericModal from "@/components/applicants/GenericModel";
import MultiStepFormModel from "@/components/applicants/MultiStepFormModel";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { submitSuccess } = useSelector((state) => state.campaignSlice); // for change status globally
  const { statusChangeSuccessBulk } = useSelector(
    (state) => state.dataBankSlice
  ); // for change status globally

  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  // Determine statuses dynamically based on the URL
  const filteredStatuses = useMemo(() => {
    if (pathname.includes("admin/employees/incomplete-profile")) {
      return [11]; // Hold
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

  return (
    <>
      <Box sx={{ px: 2 }}>
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box component="div">
        <EmployeeTableWrapper
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          filteredStatuses={filteredStatuses}
          search={search}
          setSearch={setSearch}
        />
      </Box>
    </>
  );
};

export default Page;
