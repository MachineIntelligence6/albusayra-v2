"use client";
import React, { useEffect, useState } from "react";
import CompanyEmpty from "../CompanyEmpty";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { Box } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import GeneralDeductionModalTable from "./table/GeneralDeductionModalTable";
import GeneralDeductionTable from "./table";

const GereralDeduction = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let isShowTable = Boolean(params?.table === "true" ? true : false);
    setShowTable(isShowTable);
  }, []);

  return (
    <>
      {showTable ? (
        <Box>
          <CompanyHeader>
            <DescriptiveText
              text={"General Deduction"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>
            <GeneralDeductionTable />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="General Deduction">
          <EmptyScreenView
            image="/company/icons/general-deduction.svg"
            buttonText="General Deduction"
            icon={null}
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <GeneralDeductionModalTable />
        </CompanyTableModal>
      )}
    </>
  );
};

export default GereralDeduction;
