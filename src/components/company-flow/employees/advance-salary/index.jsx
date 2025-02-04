"use client";

import { Box } from "@mui/material";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { custom } from "@/app/theme";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import AdvanceSalaryTable from "./table";
import CompanyEmpty from "../../CompanyEmpty";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import AdvanceSalaryRequestTable from "./table/AdvanceSalaryTable";

const AdvanceSalaryEmptyScreen = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let isShowTable = Boolean(params?.table === "true" ? true : false);
    setShowTable(isShowTable);
  }, []);

  const btnProps = {
    text: "Request Advance Salary",
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
              text={"Advance Salary"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>
            <AdvanceSalaryTable />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="Advance Salary" btnProps={btnProps}>
          <EmptyScreenView
            image="/company/advance-salary.svg"
            altText="adv"
            description="Please click the button below to add advance salary request."
            buttonText="Advance Salary Request"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <AdvanceSalaryRequestTable />
        </CompanyTableModal>
      )}
    </>
  );
};

export default AdvanceSalaryEmptyScreen;
