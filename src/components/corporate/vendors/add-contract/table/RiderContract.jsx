// import CampaignsWrapper from "@/components/Campaigns";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { AddContractRiderData } from "@/components/company-flow/employees/data";
import CurrencyType from "@/components/shared-components/CurrencyType";
import moment from "moment";
import swal from "sweetalert";
import {
  VendorContractDelete,
  VendorContractGetByStatus,
} from "@/redux/reducers/vendorContract/vendorContractThunk";
import { UserData } from "@/configs/UseApi";
import { useDispatch } from "react-redux";

const RiderContract = ({ tableData, setEditId, vendorId, view ,currencyType}) => {
  const dispatch = useDispatch();
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((result) => {
      // debugger
      if (result) {
        const payload = {
          id: id,
          deletedBy: UserData?.Id,
          status: 3,
        };
        dispatch(VendorContractDelete(payload)).then(() => {
          const param = {
            page: 1,
            pageLength: "",
            statuses: [1, 2],
            filter: view == "rider" ? "Rider" : "Asset",
            filter2: "",
            filter3: "",
            desc: false,
            orderBy: "",
            parentId: vendorId,
          };
          dispatch(VendorContractGetByStatus(param));
        });
      }
    });
  };
  const handleMenuClick = (value, row) => {
    if (value.action === "edit") {
      setEditId(row.id);
    } else if (value.action === "delete") {
      handleDelete(row.id);
    } else {
    }
  };

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
  };

  const MenuItems = useMemo(
    () => [
      { label: "Edit", action: "edit" },
      { label: "Delete", action: "delete" },
    ],
    []
  );
  const fullColumns = useMemo(() => {
    return [
      {
        field: "contractName",
        headerName: "Contract Name",
        align: "left",
        render: (row) => <Typography>{row?.contractName}</Typography>,
      },
      {
        field: "signingDate",
        headerName: "Contract signing date",
        align: "left",
        render: (row) => (
          <Typography>
            {row.signingDate
              ? moment(row?.signingDate).format("DD/MM/YYYY")
              : "-"}
          </Typography>
        ),
      },
      {
        field: "startDate",
        headerName: "Contract Start Date",
        align: "left",
        render: (row) => (
          <Typography>
            {row.startDate ? moment(row?.startDate).format("DD/MM/YYYY") : "-"}
          </Typography>
        ),
      },
      {
        field: "endDate",
        headerName: "Contract End Date",
        align: "left",
        render: (row) => (
          <Typography>
            {row.endDate ? moment(row?.endDate).format("DD/MM/YYYY") : "-"}
          </Typography>
        ),
      },
      {
        field: "fixedAmount",
        headerName: "Fixed Amount Rider",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{row?.fixedAmount}</Typography>
            <CurrencyType type={currencyType}/>
          </Box>
        ),
      },
      {
        field: "commissionAmount",
        headerName: "Commission Amount",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{row?.commissionAmount}</Typography>
            <CurrencyType type={currencyType}/>
          </Box>
        ),
      },

      {
        field: "status",
        headerName: "Status",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              bgcolor: row.status === 1 ? "#28C76F29" : "#FF4C5129",
              color: row.status === 1 ? "#28C76F" : "#FF4C51",
              borderRadius: "4px",
              p: "2px 10px;",
              textAlign: "center",
              width: "fit-content",
            }}
          >
            <Typography>
              {row.status === 1 ? "Active" : "Non active"}
            </Typography>
          </Box>
        ),
      },

      {
        field: "action",
        headerName: "Action",
        align: "left",
        render: (row) => (
          <ActionMenu
            menuItems={MenuItems}
            onMenuItemClick={(value) => handleMenuClick(value, row)}
          />
        ),
      },
    ];
  }, []);

  return (
    <Box sx={{ bgcolor: "white" }}>
      {/* <TableFilters bottomBorder={false} filters={filters} /> */}
      {/* <TableExportRow isBtnAdd={false} /> */}
      <CustomTable
        columns={fullColumns}
        data={tableData?.data}
        onRowSelect={handleRowSelect}
        handleFilterClick={handleFilterClick}
        isSelectedOption={false}
      />
      {/* <TablePagination /> */}
    </Box>
  );
};

export default RiderContract;
