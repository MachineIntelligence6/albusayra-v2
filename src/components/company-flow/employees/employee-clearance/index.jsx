"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { custom } from "@/app/theme";
import { PlusIcon } from "lucide-react";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import ClearanceTable from "./table";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import EmployeeClearanceTable from "./table/EmployeeClearanceTable";
import CompanyEmpty from "../../CompanyEmpty";

const EmployeeClearanceEmptyScreen = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let isShowTable = Boolean(params?.table === "true" ? true : false);
    setShowTable(isShowTable);
  }, []);

  const btnProps = {
    text: "Clearance Request",
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
              text={"Employee Clearance"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>
            <ClearanceTable />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="Employee Clearance">
          <EmptyScreenView
            image="/company/Boxx.svg"
            altText="clearance"
            title="No Employees Clearance Request"
            description="Please click the button below to add employee clearance request."
            buttonText="Clearance Request"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <EmployeeClearanceTable />
        </CompanyTableModal>
      )}
    </>
  );
};

export default EmployeeClearanceEmptyScreen;
