import React, { useMemo } from "react";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { Box } from "@mui/material";
import moment from "moment";

const IncompleteEmployeeTableWrapper = ({ tableData, selectedTab }) => {
  const fullColumnsEmirates = useMemo(
    () => [
      {
        field: "createdDate",
        headerName: "Updated Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.createdDate
              ? moment(row.createdDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousIssueDate",
        headerName: "EID Previous Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousIssueDate
              ? moment(row.previousIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedIssueDate",
        headerName: "EID New Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedIssueDate
              ? moment(row.updatedIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousExpiryDate",
        headerName: "EID Previous Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousExpiryDate
              ? moment(row.previousExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedExpiryDate",
        headerName: "EID New Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedExpiryDate
              ? moment(row.updatedExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
    ],
    []
  );
  const fullColumnsDrivingLicense = useMemo(
    () => [
      {
        field: "createdDate",
        headerName: "Updated Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.createdDate
              ? moment(row.createdDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousIssueDate",
        headerName: "Driving License Previous Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousIssueDate
              ? moment(row.previousIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedIssueDate",
        headerName: "Driving License New Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedIssueDate
              ? moment(row.updatedIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousExpiryDate",
        headerName: "Driving License Previous Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousExpiryDate
              ? moment(row.previousExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedExpiryDate",
        headerName: "Driving License New Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedExpiryDate
              ? moment(row.updatedExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
    ],
    []
  );
  const fullColumnsPassport = useMemo(
    () => [
      {
        field: "createdDate",
        headerName: "Updated Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.createdDate
              ? moment(row.createdDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousIssueDate",
        headerName: "Passport  Previous Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousIssueDate
              ? moment(row.previousIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedIssueDate",
        headerName: "Passport  New Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedIssueDate
              ? moment(row.updatedIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousExpiryDate",
        headerName: "Passport Previous Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousExpiryDate
              ? moment(row.previousExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedExpiryDate",
        headerName: "Passport New Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedExpiryDate
              ? moment(row.updatedExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
    ],
    []
  );
  const fullColumnsVisa = useMemo(
    () => [
      {
        field: "createdDate",
        headerName: "Updated Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.createdDate
              ? moment(row.createdDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousIssueDate",
        headerName: "Visa  Previous Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousIssueDate
              ? moment(row.previousIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedIssueDate",
        headerName: "Visa  New Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedIssueDate
              ? moment(row.updatedIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "previousExpiryDate",
        headerName: "Visa Previous Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.previousExpiryDate
              ? moment(row.previousExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "updatedExpiryDate",
        headerName: "Visa New Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.updatedExpiryDate
              ? moment(row.updatedExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
    ],
    []
  );
  const fullColumnsInsurance = useMemo(
    () => [
      {
        field: "createdDate",
        headerName: "Updated Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.createdDate
              ? moment(row.createdDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "miPreviousIssueDate",
        headerName: "Med. Inc. Previous Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.miPreviousIssueDate
              ? moment(row.miPreviousIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "miUpdatedIssueDate",
        headerName: "Med. Inc. New Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.miUpdatedIssueDate
              ? moment(row.miUpdatedIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "miPreviousExpiryDate",
        headerName: "Med. Inc. Previous Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.miPreviousExpiryDate
              ? moment(row.miPreviousExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "miUpdatedExpiryDate",
        headerName: "Med. Inc. New Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.miUpdatedExpiryDate
              ? moment(row.miUpdatedExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "acPreviousIssueDate",
        headerName: "Acc. Inc. Previous Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.acPreviousIssueDate
              ? moment(row.acPreviousIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "acUpdatedIssueDate",
        headerName: "Acc. Inc. New Issue Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.acUpdatedIssueDate
              ? moment(row.acUpdatedIssueDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "acPreviousExpiryDate",
        headerName: "Acc. Inc. Previous Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.acPreviousExpiryDate
              ? moment(row.acPreviousExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
      {
        field: "acUpdatedExpiryDate",
        headerName: "Acc. Inc. New Expiry Date",
        align: "left",
        render: (row) => (
          <Box sx={{ textTransform: "capitalize" }}>
            {row?.acUpdatedExpiryDate
              ? moment(row.acUpdatedExpiryDate).format("DD/MM/YYYY")
              : "-"}
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <>
      <CustomTable
        columns={
          selectedTab?.id === "3"
            ? fullColumnsEmirates
            : selectedTab?.id === "4"
            ? fullColumnsDrivingLicense
            : selectedTab?.id === "5"
            ? fullColumnsPassport
            : selectedTab?.id === "6"
            ? fullColumnsVisa
            : selectedTab?.id === "7"
            ? fullColumnsInsurance
            : []
        }
        data={tableData}
      />
    </>
  );
};

export default IncompleteEmployeeTableWrapper;
