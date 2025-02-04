"use client";
import { Box } from "@mui/material";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { custom } from "@/app/theme";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import CompanyEmpTableWrapper from "./CompanyEmpTableWrapper";
import CompanyEmpty from "../CompanyEmpty";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import EmployeesModal from "./EmployeesModal";

const CompanyEmployees = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let isShowTable = Boolean(params?.table === "true" ? true : false);
    setShowTable(isShowTable);
  }, []);

  const btnProps = {
    text: "Add Employee",
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
              text={"Employees"}
              fontSize={18}
              fontWeight={500}
              color={custom.dreadcrumbText}
            />
          </CompanyHeader>
          <Box sx={{ p: 2 }}>
            <CompanyEmpTableWrapper />
          </Box>
        </Box>
      ) : (
        <CompanyEmpty heading="Employees">
          <EmptyScreenView
            image="/company/icons/employee-empty.svg"
            altText="adv"
            title="No Employee Added"
            description="Please click the button below to add a new Employee."
            buttonText="Add Employee"
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}
      {modalOpen && (
        <CompanyTableModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <EmployeesModal />
        </CompanyTableModal>
      )}
    </>
  );
};

export default CompanyEmployees;
