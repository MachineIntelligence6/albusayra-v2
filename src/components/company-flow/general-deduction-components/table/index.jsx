import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";
import Link from "next/link";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import CurrencyType from "@/components/shared-components/CurrencyType";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { useRouter } from "next/navigation";
import { generalDeductionTableData } from "../../employees/data";
import GeneralDeductionViewModal from "../view-detail";

const filters = [
  { id: 1, filterName: "Employee ID", placeholder: "e.g" },
  { id: 3, filterName: "Employee Name", placeholder: "e.g" },

  {
    id: 2,
    filterName: "Status",
    placeholder: "Please Select",
    options: [
      { id: 1, label: "Option-1", value: "option-1" },
      { id: 2, label: "Option-2", value: "option-2" },
      { id: 3, label: "Option-3", value: "option-3" },
    ],
  },
];

const GeneralDeductionTable = () => {
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };

  const handleMenuClick = (value) => {
    console.log("clicked menu", value);
    if (value.action === "view") setShowModal(true);
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
  };

  const MenuItems = useMemo(
    () => [{ label: "View Details", action: "view" }],
    []
  );
  const fullColumns = useMemo(() => {
    return [
      {
        field: "id",
        headerName: "ID",
        align: "left",
        render: (row) => (
          <Link
            href="#"
            style={{
              color: "#20A4D5E5",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            {row.id}
          </Link>
        ),
      },
      {
        field: "createdDate",
        headerName: "Created Date",
        align: "left",
      },
      {
        field: "name",
        headerName: "full name as per emirates Id",
        align: "left",
        render: (row) => (
          <CustomAvatar
            fullName={row.name}
            image={row.image}
            email="abce@gmail.com"
          />
        ),
      },
      {
        field: "deductionReason",
        headerName: "Reason of Deduction",
        align: "left",
      },

      {
        field: "deductionAmount",
        headerName: "Amount",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ fontSize: "13px" }}>
              {row.deductionAmount}
            </Typography>
            {row.deductionAmount !== "--" && <CurrencyType />}
          </Box>
        ),
      },
      {
        field: "remarks",
        headerName: "Remarks",
        align: "left",
      },

      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => (
          <ActionMenu menuItems={MenuItems} onMenuItemClick={handleMenuClick} />
        ),
      },
    ];
  }, []);

  return (
    <Box sx={{ mx: 2, bgcolor: "white" }}>
      <TableFilters bottomBorder={false} filters={filters} />
      <TableExportRow isBtnAdd={false} />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={fullColumns}
          data={generalDeductionTableData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
          isSelectedOption={false}
        />
        <TablePagination />
      </Box>
      {showModal && <GeneralDeductionViewModal onClose={onClose} />}
    </Box>
  );
};

export default GeneralDeductionTable;
