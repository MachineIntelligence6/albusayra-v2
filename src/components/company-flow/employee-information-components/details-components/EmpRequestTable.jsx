import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { empRequestTableData } from "@/utils/company-flow/employee-inforamtion-base.data";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";

const EmpRequestTable = () => {
  const columns = useMemo(() => {
    return [
      { field: "date", headerName: "Transaction Date", align: "left" },
      { field: "visaLoan", headerName: "Visa Loan", align: "left" },
      { field: "reasonOfLoan", headerName: "Reason Of Loan", align: "left" },
      {
        field: "amoount",
        headerName: "Amount",
        align: "left",
        render: (row) => {
          return (
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <Typography
                variant="caption"
                sx={{
                  padding: "4px 10px",
                  borderRadius: "3px",
                  width: 45,
                }}
              >
                {row.amount}
              </Typography>
              <CurrencyType />
            </Box>
          );
        },
      },
      {
        field: "createdBy",
        headerName: "Created By",
        align: "left",
        render: (row) => (
          <CustomAvatar
            fullName={row.createdBy.name}
            email={row.createdBy.email}
            image={row.createdBy.image}
          />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        align: "left",
        render: (row) => {
          return (
            <Box
              sx={{
                backgroundColor:
                  row.status === "Pending" ? "#7367F029" : "#28C76F29",
                color: row.status === "Pending" ? "#7367F0" : "#28C76F",
                padding: "4px 12px",
                borderRadius: "4px",
                width: "fit-content",
                textAlign: "center",
              }}
            >
              {row.status}
            </Box>
          );
        },
      },
    ];
  }, []);
  return (
    <Box sx={{ px: 1 }}>
      <CustomTable
        columns={columns}
        data={empRequestTableData}
        isSelectedOption={false}
        headTextTransform="upperCase"
        isFiltered={true}
      />
    </Box>
  );
};

export default EmpRequestTable;
