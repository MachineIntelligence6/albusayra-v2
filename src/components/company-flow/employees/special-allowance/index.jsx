"use client";
import React, { useEffect, useState } from "react";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { Box } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import CompanyEmpty from "../../CompanyEmpty";
import SpecialAllowanceModalTable from "./table/SpecialAllowanceModalTable";
import SpecialAllowanceTable from "./table";
import SpecialAllownceRequestForm from "./form-modal/SpecialAllownceRequestForm";

const SpecialAllowance = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);

  // useEffect(() => {
  //   let isShowTable = Boolean(params?.table === "true" ? true : false);
  //   setShowTable(isShowTable);
  // }, []);

  const onTopBtnClick = () => {
    setShowPopup(true);
  };

  const [showPopup, setShowPopup] = useState(false);

  const onClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showTable ? (
        <Box>
          <CompanyHeader
            btnProps={{
              text: "Create Request",
              icon: null,
              onClick: onTopBtnClick,
            }}
          >
            <DescriptiveText
              text={"Special Allowance"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>
            <SpecialAllowanceTable />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="Special Allowance">
          <EmptyScreenView
            image="/company/allownce.svg"
            altText="special-allownce"
            title="No Special Allowance Request"
            description="Please click the button below to add special allowance request."
            buttonText="loan Request"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <SpecialAllowanceModalTable />
        </CompanyTableModal>
      )}
      {showPopup && (
        <SpecialAllownceRequestForm onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default SpecialAllowance;
