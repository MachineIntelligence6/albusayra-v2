import React, { useMemo, useState } from "react";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";

import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { ViewDetailTableData } from "@/utils/schemas/vendor.data";
import CustomButton from "@/components/shared-components/CustomButton";
import EndDateModal from "./EndDateModal";

const ViewDetailTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isActionButtonDisabled, setActionButtonDisabled] = useState(false);
  const [isTransferButtonVisible, setTransferButtonVisible] = useState(true);
  const [isTransferButtonDisabled, setTransferButtonDisabled] = useState(true);

  const pathname = usePathname();

  const onClose = () => {
    setShowPopup(false);
  };

  const handleClick = () => {
    setShowPopup(true);
    setActionButtonDisabled(true);
    setTransferButtonDisabled(false);
  };

  const fullColumns = useMemo(
    () => [
      {
        field: "platform_Name",
        headerName: "PlatForm Name",
        align: "left",
        render: (row) => (
          <CustomAvatar image={row.image} fullName={row.platform_Name} />
        ),
      },
      { field: "city", headerName: "City", align: "left" },
      { field: "start_date", headerName: "Start Date", align: "left" },
      { field: "salary_type", headerName: "Salary Type", align: "left" },
      {
        field: "commission_amount",
        headerName: "Fixed /Commission Amount",
        align: "left",
      },
      {
        field: "end_date",
        headerName: "End Date",
        align: "left",
      },
      { field: "third_pary_id", headerName: "3rd Party ID", align: "left" },

      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => (
          <CustomButton
            sx={{
              p: "5.5px 13.5px",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: "18px",
            }}
            onClick={handleClick}
            disabled={isActionButtonDisabled}
          >
            End Date
          </CustomButton>
        ),
      },
    ],
    [isActionButtonDisabled]
  );

  return (
    <Box sx={{ bgcolor: "white", overflow: "hidden" }}>
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={fullColumns}
          data={ViewDetailTableData}
          isSelectedOption={false}
        />
        {showPopup && <EndDateModal onClose={onClose} />}

        <Box
          sx={{
            direction: "rtl",
            mt: isTransferButtonDisabled ? 2 : 4,
            mr: isTransferButtonDisabled ? 1 : 28,
          }}
        >
          {isTransferButtonVisible && (
            <CustomButton
              variant="outlined"
              sx={{
                bgcolor: "#1047741A",
                color: "#104774",
                fontSize: "13px",
                fontWeight: 500,
              }}
              disabled={isTransferButtonDisabled}
            >
              Transfer to platform
            </CustomButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewDetailTable;
