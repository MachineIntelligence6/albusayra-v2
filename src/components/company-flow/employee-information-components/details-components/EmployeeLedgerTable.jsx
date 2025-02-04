import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { ledgerTable } from "@/utils/company-flow/employee-inforamtion-base.data";
import { Box } from "@mui/material";
import React, { useMemo } from "react";

const EmployeeLedgerTable = () => {
  const columns = useMemo(() => {
    return [
      { field: "date", headerName: "Transaction Date", align: "left" },
      { field: "ref", headerName: "Ref #", align: "left" },
      { field: "narration", headerName: "Narration", align: "left" },
      { field: "debit", headerName: "DEBIT", align: "left" },
      { field: "credit", headerName: "Credit", align: "left" },
      { field: "balance", headerName: "Balance", align: "left" },
    ];
  }, []);

  return (
    <Box sx={{ px: 1 }}>
      <CustomTable
        columns={columns}
        data={ledgerTable}
        isSelectedOption={false}
        headTextTransform="upperCase"
        isFiltered={true}
      />
    </Box>
  );
};

export default EmployeeLedgerTable;
