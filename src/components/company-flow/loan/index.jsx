"use client";
import React, { useEffect, useState } from "react";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import FoodPermitDeductionMainTable from "../food-permit-deduction/FoodPermitDeductionMainTable";
import CompanyEmpty from "../CompanyEmpty";
import LoanTableModal from "./LoadTableModal";

const Loan = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let isShowTable = Boolean(params?.table === "true" ? true : false);
    if (isShowTable) setShowTable(isShowTable);
  }, [params?.table]);

  const handleViewModal = (item) => {
    console.log(item);
    if (item?.action === "view") setShowDetailsModal(true);
  };

  return (
    <>
      {showTable ? (
        <FoodPermitDeductionMainTable
          onTopBtnClick={() => setModalOpen(true)}
          onViewModal={handleViewModal}
        />
      ) : (
        <CompanyEmpty heading="Food Permit Deduction">
          <EmptyScreenView
            image="/loan/Piggy_Bank.svg"
            buttonText="Loan Request"
            altText="user page icon"
            title="No Loan Request"
            description="Please click the button below to add loan request."
            //   onButtonClick={handleClick}
            onButtonClick={() => setModalOpen(true)}
          />
        </CompanyEmpty>
      )}

      {modalOpen && (
        <LoanTableModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onViewDetails={handleViewModal}
        />
      )}
    </>
  );
};

export default Loan;
