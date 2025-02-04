"use client";
import React, { useEffect, useState } from "react";
import CompanyEmpty from "../CompanyEmpty";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { Box } from "@mui/material";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import { custom } from "@/app/theme";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import PassportReturnTable from "./table/PassportReturnTable";
import PassportReturnRequestTable from "./table";

const PassportReturn = ({ params }) => {
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
            <PassportReturnRequestTable />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="Passport Return">
          <EmptyScreenView
            image="/company/passportReturn.svg"
            altText="passport-return"
            title="Passport Return Request"
            description="Please click the button below to add passport return request."
            buttonText="Create Request"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <PassportReturnTable />
        </CompanyTableModal>
      )}
    </>
  );
};

export default PassportReturn;
