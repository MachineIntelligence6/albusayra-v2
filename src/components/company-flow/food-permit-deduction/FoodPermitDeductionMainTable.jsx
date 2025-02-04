import { custom } from "@/app/theme";
import { StatusIndicator } from "@/components/applicants/StatusIndicator";
import ActionMenu from "@/components/shared-components/ActionMenu";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import CurrencyType from "@/components/shared-components/CurrencyType";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CustomButton from "@/components/shared-components/CustomButton";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { mainTableData } from "@/utils/company-flow/food-permit-deduction.data";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";

const tableFiltersData = [
  {
    id: 2,
    filterName: "ID",
    placeholder: "3212",
  },
  {
    id: 3,
    filterName: "EMP Current Acquiring Company",
    placeholder: "Rider/any other",
    options: [
      { value: "rider", label: "Rider" },
      { value: "any_other", label: "Any Other" },
    ],
  },
  {
    id: 4,
    filterName: "Acquiring Company City",
    placeholder: "e.g Rashid",
    options: [
      { value: "rider", label: "Rider" },
      { value: "any_other", label: "Any Other" },
    ],
  },
];

const actionMenu = [{ label: "View Details", action: "view" }];
const FoodPermitDeductionMainTable = ({ onTopBtnClick, onViewModal }) => {
  const columns = useMemo(() => {
    return [
      {
        field: "id",
        headerName: "ID",
        align: "left",
        render: (row) => (
          <Typography
            variant="body2"
            sx={{
              borderBottom: "1px solid #20A4D5E5",
              color: "#20A4D5E5",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            {row.id}
          </Typography>
        ),
      },
      {
        field: "date",
        headerName: "Created Date",
        align: "left",
      },
      {
        field: "fullName",
        headerName: "FULL NAME AS PER EMIRATES ID",
        align: "left",
        render: (row) => (
          <CustomAvatar
            fullName={row.fullName}
            image={row.image}
            email="abce@gmail.com"
          />
        ),
      },
      {
        field: "amountChargedToRider",
        headerName: "Amount Charged To Rider",
        align: "left",
        render: (row) => {
          return (
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <Typography
                variant="caption"
                sx={{
                  padding: "4px 10px",
                  borderRadius: "3px",
                  width: 45,
                }}
              >
                {row.amountChargedToRider}
              </Typography>
              <CurrencyType />
            </Box>
          );
        },
      },
      {
        field: "deductionType",
        headerName: "Deduction Type",
        align: "left",
      },
      {
        field: "installmentPlans",
        headerName: "Installment Plans",
        align: "left",
      },
      {
        field: "approvalDate",
        headerName: "Installment Plans",
        align: "left",
      },
      {
        field: "status",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              bgcolor: "#7367F029",
              color: "#7367F0",
              padding: "4px 8px",
              borderRadius: "5px",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {row.status}
          </Box>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => (
          <ActionMenu menuItems={actionMenu} onMenuItemClick={onViewModal} />
        ),
      },
    ];
  }, []);

  return (
    <Box>
      <CompanyHeader
        btnProps={{
          text: "Food Permit Deduction",
          icon: null,
          onClick: onTopBtnClick,
        }}
      >
        <DescriptiveText
          text={"Food Permit Deduction"}
          fontSize={18}
          fontWeight={500}
          color={custom.dreadcrumbText}
        />
      </CompanyHeader>
      <Box sx={{ p: 2 }}>
        <TableFilters filters={tableFiltersData} heading="select Empoyee" />
        <TableExportRow isBtnAdd={false} />
        <CustomTable
          columns={columns}
          data={mainTableData}
          headTextTransform="upperCase"
        />
      </Box>
    </Box>
  );
};

export default FoodPermitDeductionMainTable;
