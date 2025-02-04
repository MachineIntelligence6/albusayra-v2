"use client";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import CompanyEmpty from "../../CompanyEmpty";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import TransferTable from "./table";

const dropdownOptions = [
  {
    label: "Transfer",
  },
  {
    value: "transfer_of_platform_acquiring",
    label: "Transfer of Platform (Acquiring)",
  },
  {
    value: "transfer_of_platform_providing",
    label: "Transfer of Platform (Providing)",
  },
];

const EmployeeTransferEmptyScreen = ({ params }) => {
  const [selectedValue, setSelectedValue] = useState(dropdownOptions[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let isShowTable = Boolean(params?.table === "true" ? true : false);
    setShowTable(isShowTable);
  }, []);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    if (newValue.value === "transfer_of_platform_acquiring") {
      setModalOpen(true);
    }
  };

  return (
    <>
      {showTable ? (
        <Box>
          <CompanyHeader>
            <DescriptiveText
              text={"Employee Transfer"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>Any....</Box>
        </Box>
      ) : (
        <CompanyEmpty
          heading="Employee Transfer"
          btnDropdown={{
            options: dropdownOptions,
            selectedValue: selectedValue,
            setSelectedValue: handleChange,
          }}
        >
          <EmptyScreenView
            altText="transfer"
            image="/company/transfer.svg"
            title="Platform Transfer Request"
            description="Please click the button below to platform transfer request."
            buttonText="Platform transfer Request"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <Box>
          <CompanyTableModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <TransferTable />
          </CompanyTableModal>
        </Box>
      )}
    </>
  );
};

export default EmployeeTransferEmptyScreen;
