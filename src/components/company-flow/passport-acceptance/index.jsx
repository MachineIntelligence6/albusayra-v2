"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { custom } from "@/app/theme";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import PassportTable from "./table";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import CompanyEmpty from "../CompanyEmpty";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import PassportAcceptanceTable from "./table/PassportAcceptanceTable";

const PassportAcceptance = ({ params }) => {
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
              text={"Passport Return"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>
            <PassportTable />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="Passport Return">
          <EmptyScreenView
            image="/company/passport1.svg"
            altText="passport-return"
            title="No Passport Acceptance Request"
            description="Please click the button below to add passport acceptance request."
            buttonText="Create Request"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <PassportAcceptanceTable />
        </CompanyTableModal>
      )}
    </>
  );
};

export default PassportAcceptance;
