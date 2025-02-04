"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { custom } from "@/app/theme";
import { PlusIcon } from "lucide-react";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import DLTable from "./table";
import CompanyEmpty from "../../CompanyEmpty";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import DLModalTable from "./table/DLModalTable";

const DrivingLicenseRequest = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let isShowTable = Boolean(params?.table === "true" ? true : false);
    setShowTable(isShowTable);
  }, []);

  const btnProps = {
    text: "Driving License Request",
    endIcon: <PlusIcon size={16} />,
    onClick: () => {
      setModalOpen(true);
    },
  };

  return (
    <>
      {showTable ? (
        <Box>
          <CompanyHeader btnProps={btnProps}>
            <DescriptiveText
              text={"Driving License Request"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>
            <DLTable />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="Driving License Request">
          <EmptyScreenView
            image="/company/dlRequest.svg"
            altText="adv"
            title="No Driving License Request"
            description="Please click the button below to add driving license request."
            buttonText="Driving License Request"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <DLModalTable />
        </CompanyTableModal>
      )}
    </>
  );
};

export default DrivingLicenseRequest;
