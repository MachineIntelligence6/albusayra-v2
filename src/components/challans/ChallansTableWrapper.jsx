"use client";
import React, { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation"; // Import useRou
import { challanData } from "@/utils/challans-data";
import { Download } from "lucide-react";
import { FIleIcon } from "@/utils/Icons";
import Image from "next/image";
import { StatusIndicator } from "../applicants/StatusIndicator";
import ActionMenu from "../shared-components/ActionMenu";
import DescriptiveText from "../shared-components/DescriptiveText";
import CurrencyType from "../shared-components/CurrencyType";
import {
  challanSalikFilters,
  challanTrafficFilters,
} from "@/app/constants/challan";
import { CustomTableFilter } from "../shared-components/Table-components/customTableFilter";
import TableExportRow from "../shared-components/Table-components/TableExportRow";
import CustomTable from "../shared-components/Table-components/CustomTable";
import TablePagination from "../shared-components/Table-components/TablePagination";

const columnConfig = {
  salik: [
    "invoiceMonth",
    "vendorName",
    "dateOfSalik",
    "transactionID",
    "registrationNo.",
    "salikAmount",
    "tollGate",
    "direction",
    "action",
  ],
  traffic: [
    "id",
    "bikePlateNo",
    "challanAmount",
    "challanNumber",
    "city",
    "location",
    "reason",
    "dateAndTimeOfTrafficChallan",
    "challanAttachments",
    "remarks",
    "bikeOwner",
    "createdOn",
    "status",
  ],
};

const ChallansTableWrapper = ({
  handleOpenModal,
  setCurrentPage,
  rowsPerPage,
  currentPage,
  // selectedValue,
  // onChange,
}) => {
  const [filters, setFilters] = useState(challanSalikFilters);
  const [totalEntries, setTotalEntries] = useState(10);
  const router = useRouter();
  const pathname = usePathname();
  // const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const [isBtnAdd, setIsBtnAdd] = useState(false);
  const handleRowSelect = (selectedRowIds) => {
    console.log("Selected Row IDs:", selectedRowIds);
  };

  // const handleMenuClick = (value) => {
  //   console.log("clicked menu", value);
  // };

  useEffect(() => {
    if (pathname.includes("/challans/traffic")) {
      setFilters(challanTrafficFilters);
    } else {
      setFilters(challanSalikFilters);
    }
  }, [pathname]);

  const handleFilterClick = (field) => {
    console.log(`Filter clicked for: ${field}`);
    // Add your filter logic here, such as opening a dropdown or modal
  };

  useEffect(() => {
    if (pathname.includes("/applicants/shortlisted-applicants")) {
      setIsBtnAdd(true);
    }
  }, [pathname]);

  const menuConfigurations = useMemo(
    () => ({
      salik: {
        menuItems: [{ label: "Procced", route: "/admin/challans/traffic" }],
      },
      traffic: {
        menuItems: [
          { label: "View Details", route: "/admin/applicants/view-details" },
          { label: "Proceed", route: "/admin/applicants/hold" },
          { label: "Hold", route: "/admin/applicants/hold" },
          { label: "Not Qualified", route: "/admin/applicants/not-qualified" },
        ],
      },
    }),
    []
  );

  const currentMenuConfig = useMemo(() => {
    if (pathname.includes("challan/traffic")) return menuConfigurations.traffic;
    return menuConfigurations.salik; // Default configuration
  }, [menuConfigurations, pathname]);

  // Define the full columns configuration
  const fullColumns = useMemo(
    () => [
      // Columns from the first image
      {
        field: "invoiceMonth",
        headerName: "INVOICE MONTH",
        align: "left",
        showFilter: true,
      },
      {
        field: "vendorName",
        headerName: "VENDOR NAME",
        align: "left",
        showFilter: true,
      },
      {
        field: "dateOfSalik",
        headerName: "DATE OF SALIK",
        align: "left",
        showFilter: true,
      },
      { field: "transactionId", headerName: "TRANSACTION ID", align: "left" },
      {
        field: "registrationNo",
        headerName: "REGISTRATION NO.",
        align: "left",
      },
      {
        field: "salikAmount",
        headerName: "SALIK AMOUNT",
        align: "left",
        showFilter: true,
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
                {row.salikAmount.amount}
              </Typography>
              <CurrencyType />
            </Box>
          );
        },
      },
      {
        field: "tollGate",
        headerName: "TOLL GATE",
        align: "left",
        showFilter: true,
      },
      {
        field: "direction",
        headerName: "DIRECTION",
        align: "left",
        showFilter: true,
      },

      // Columns from the second image
      {
        field: "id",
        headerName: "ID",
        align: "left",
        showFilter: true,
        render: (row) => (
          <Typography
            variant="body2"
            sx={{
              borderBottom: "1px solid #20A4D5E5",
              color: "#20A4D5E5",
              width: "fit-content",
            }}
          >
            {row.id}
          </Typography>
        ),
      },
      {
        field: "bikePlateNo",
        headerName: "BIKE PLATE NO",
        align: "left",
        showFilter: true,
      },
      {
        field: "challanAmount",
        headerName: "CHALLAN AMOUNT",
        align: "left",
        showFilter: true,
        render: (row) => {
          return (
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  padding: "4px 10px",
                  borderRadius: "3px",
                  width: 45,
                }}
              >
                {row.challanAmount.amount}
              </Typography>
              <CurrencyType />
            </Box>
          );
        },
      },
      {
        field: "challanNumber",
        headerName: "CHALLAN NUMBER",
        align: "left",
        showFilter: true,
      },
      { field: "city", headerName: "CITY", align: "left", showFilter: true },
      {
        field: "location",
        headerName: "LOCATION",
        align: "left",
        showFilter: true,
      },
      {
        field: "reason",
        headerName: "REASON",
        align: "left",
        showFilter: true,
      },
      {
        field: "dateTimeTrafficChallan",
        headerName: "DATE AND TIME OF TRAFFIC CHALLAN",
        align: "left",
      },
      {
        field: "challanAttachments",
        headerName: "CHALLAN ATTACHMENTS",
        align: "left",
        render: (row) => (
          <Box
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FIleIcon />
            <Typography variant="caption">{row?.name || "Challan"}</Typography>
            <Download size={20} />
          </Box>
        ),
      },
      { field: "remarks", headerName: "REMARKS", align: "left" },
      {
        field: "bikeOwner",
        headerName: "BIKE OWNER",
        align: "left",
        render: (row) => (
          <Box
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Image src="/challans/Avatar.png" width={20} height={20} alt="" />
            <Typography variant="caption">ABDS</Typography>
          </Box>
        ),
      },
      {
        field: "createdOn",
        headerName: "CREATED ON",
        align: "left",
        showFilter: true,
      },
      {
        field: "status",
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <StatusIndicator status={row.status} pathname={pathname} />
        ),
      },

      // Action column (shared functionality)
      {
        field: "action",
        headerName: "ACTION",
        align: "left",
        render: (row) => (
          <ActionMenu
            menuItems={currentMenuConfig?.menuItems}
            onMenuItemClick={(item) => router.push(item.route)}
          />
        ),
      },
    ],
    [currentMenuConfig?.menuItems, pathname, router]
  );

  // Dynamically set columns based on the current path
  const columns = useMemo(() => {
    // Determine the key based on the pathname
    let key = null;
    if (pathname.includes("/challans/traffic")) {
      key = "traffic";
    } else if (pathname.includes("/challans")) {
      key = "salik";
    }

    // Ensure key matches an entry in columnConfig
    if (key && columnConfig[key]) {
      return fullColumns.filter((column) =>
        columnConfig[key].includes(column.field)
      );
    }

    // Default to an empty array if no match is found
    return [];
  }, [pathname, fullColumns]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return challanData?.slice(startIndex, endIndex);
  }, [currentPage, rowsPerPage]);

  return (
    <Box sx={{ bgcolor: "white", overflow: "hidden", m: 1.5, borderRadius: 6 }}>
      <Box component="div" sx={{ m: 2 }}>
        <DescriptiveText text="Select Employee" />
        <CustomTableFilter filters={filters} />
        <Divider />
      </Box>
      <TableExportRow
        handleOpenModal={handleOpenModal}
        setTotalEntries={setTotalEntries}
        totalEntries={totalEntries}
        pathname={pathname}
        isBtnAdd={isBtnAdd}
      />
      <Box sx={{ height: "100%" }}>
        <CustomTable
          columns={columns}
          data={paginatedData}
          onRowSelect={handleRowSelect}
          handleFilterClick={handleFilterClick}
          isSelectedOption={false}
        />
        {/* Pagination Component */}
        <TablePagination
          totalEntries={totalEntries}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default ChallansTableWrapper;
