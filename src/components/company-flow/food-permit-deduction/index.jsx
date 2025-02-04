"use client";
import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CompanyEmpty from "../CompanyEmpty";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import CompanyTableModal from "@/components/shared-components/modals/CompanyTableModal";
import { Plus } from "lucide-react";
import FoodPermitModal from "./FoodPermitModal";
import FoodPermitDeductionMainTable from "./FoodPermitDeductionMainTable";
import DetailsModal from "./DetailsModal";
import ViewDetailModal from "../employees/driving-license-request/view-detail";

const FoodPermitDeduction = ({ params }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        let isShowTable = Boolean(params?.table === "true" ? true : false);
        if (isShowTable) setShowTable(isShowTable);
    }, []);

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
                        image="/company/icons/food-permit-deduction.svg"
                        buttonText="Food Permit Deduction"
                        icon={null}
                        onButtonClick={() => setModalOpen(true)}
                    />
                </CompanyEmpty>
            )}

            {modalOpen && (
                <FoodPermitModal open={modalOpen} onClose={() => setModalOpen(false)} onViewDetails={handleViewModal} />
            )}
            {showDetailsModal && (
                <DetailsModal onClose={() => setShowDetailsModal(false)} />
            )}
        </>
    );
};

export default FoodPermitDeduction;
