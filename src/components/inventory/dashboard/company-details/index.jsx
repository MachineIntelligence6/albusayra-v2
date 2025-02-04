"use client";
import DynamicBreadcrumb from "@/components/shared-components/BreadCrumb";
import { Box, Divider, Typography } from "@mui/material";
import React, { useMemo } from "react";
import {
  Bike,
  CircleCheck,
  Download,
  HandCoins,
  ImageIcon,
  Network,
} from "lucide-react";
import MainCard from "./MainCard";
import DetailsCard from "./DetailsCard";
import Grid from "@mui/material/Grid2";
import TableFilters from "@/components/shared-components/Table-components/TableFilters";
import TableExportRow from "@/components/shared-components/Table-components/TableExportRow";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import { DashboardDetailTable } from "@/utils/hard-data/inventory-data";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { redirect, useRouter } from "next/navigation";
import { custom } from "@/app/theme";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import TablePagination from "@/components/shared-components/Table-components/TablePagination";

const menuItems = [
  { label: "View Details", action: "view_details" },
  { label: "Edit Details", action: "edit_details" },
  { label: "Delete", action: "delete" },
];

const DashboardFilters = [
  { id: 1, filterName: "Bike Plate Number", placeholder: "1211" },
  {
    id: 4,
    filterName: "Bike City",
    placeholder: "Islamabad",
    options: [
      { id: 1, label: "Islamabad", value: "islamabad" },
      { id: 2, label: "Rawalpindi", value: "rawalpindi" },
      { id: 3, label: "Peshawar", value: "peshawar" },
    ],
  },
  {
    id: 3,
    filterName: "Bike Ownership",
    placeholder: "Own/Rent",
    options: [
      { id: 1, label: "Own", value: "own" },
      { id: 2, label: "Rent", value: "rent" },
    ],
  },
  { id: 2, filterName: "Bike Cost", placeholder: "$1000" },
  {
    id: 3,
    filterName: "Allocated Rider",
    options: [
      { id: 1, label: "Islamabad", value: "islamabad" },
      { id: 2, label: "Rawalpindi", value: "rawalpindi" },
      { id: 3, label: "Peshawar", value: "peshawar" },
    ],
  },
];
const CompanyDetails = () => {
  const router = useRouter();

  const handleAction = (obj) => {
    if (obj.action === "view_details")
      router.push("/admin/inventory/company/bike-details");
  };

  const handleAddInventory = () => {
    router.push("/admin/inventory/add-inventory");
  };

  const columns = useMemo(() => {
    return [
      {
        field: "bike_plate",
        showFilter: true,
        headerName: "Bike Plate",
        align: "left",
      },

      {
        field: "bike_picture",
        showFilter: true,
        headerName: "Bike Picture",
        align: "left",
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ImageIcon size={22} />
            <Typography>{row.bike_picture}</Typography>
            <Download size={22} />
          </Box>
        ),
      },
      {
        field: "bike_ownership",
        showFilter: true,
        headerName: "Bike Ownership",
        align: "left",
      },
      {
        field: "bike_insurance",
        showFilter: true,
        headerName: "Bike Insurance",
        align: "left",
      },
      {
        field: "bike_insurance",
        showFilter: true,
        headerName: "Bike Insurance",
        align: "left",
      },
      {
        field: "bike_cost",
        showFilter: true,
        headerName: "Bike Cost",
        align: "left",
      },
      {
        field: "status",
        showFilter: true,
        headerName: "STATUS",
        align: "left",
        render: (row) => (
          <Box
            sx={{
              backgroundColor:
                row.status === "Allocated" ? "#D9F0FF" : "#FFE5E5",
              color:
                row.status === "Allocated"
                  ? "#007FFF"
                  : row.status === "expired"
                  ? "#FF0000"
                  : "#FF0000",
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              width: "fit-content",
              px: 4,
              textTransform: "capitalize",
            }}
          >
            {row.status}
          </Box>
        ),
      },
      {
        field: "allocated_company",
        showFilter: true,
        headerName: "Allocated Company",
        align: "left",
        render: (row) => {
          return (
            <CustomAvatar
              image={row?.allocated_company?.icon}
              email={row?.allocated_company?.email}
              fullName={row?.allocated_company?.name}
            />
          );
        },
      },
      {
        field: "allocated_rider",
        showFilter: true,
        headerName: "Allocated Rider",
        align: "left",
        render: (row) => (
          <CustomAvatar
            image={row?.allocated_rider?.icon}
            email={row?.allocated_rider?.email}
            fullName={row?.allocated_rider?.name}
          />
        ),
      },
      {
        field: "employee_id",
        showFilter: true,
        headerName: "Employee ID",
        align: "left",
      },
      {
        field: "bike_city",
        showFilter: true,
        headerName: "Bike City",
        align: "left",
      },
      {
        field: "working_city",
        showFilter: true,
        headerName: "Working City",
        align: "left",
      },

      {
        field: "action",
        headerName: "Action",
        align: "left",

        render: (row) => (
          <ActionMenu menuItems={menuItems} onMenuItemClick={handleAction} />
        ),
      },
    ];
  }, []);

  return (
    <Box component="section">
      <Box
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <DynamicBreadcrumb />
      </Box>
      <Divider sx={{ mt: 2 }} />

      <Box
        component="div"
        sx={{
          mt: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid size={3} height={"90vh"}>
            <DetailsCard />
          </Grid>
          <Grid size={9} height={"90vh"}>
            <Box
              sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
            >
              <MainCard
                bgColor="#23567F"
                data={{
                  icon: <Bike size={24} color="#23567F" />,
                  text: "Total Bikes",
                  count: "50",
                }}
              />
              <MainCard
                bgColor="#338BE3"
                data={{
                  icon: (
                    <Network
                      style={{ transform: "rotate(180deg)" }}
                      size={24}
                      color="#338BE3"
                    />
                  ),
                  text: "Allocated",
                  count: "50",
                }}
              />
              <MainCard
                bgColor="#01AB9C"
                data={{
                  icon: <CircleCheck size={24} color="#01AB9C" />,
                  text: "Available Inventory",
                  count: "40",
                }}
              />
              <MainCard
                bgColor="#FFAC30"
                data={{
                  icon: <HandCoins size={24} color="#FFAC30" />,
                  text: "Rental Bikes",
                  count: "50",
                }}
              />
            </Box>

            <Box
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                borderRadius: 6,
                width: "100%",
                minHeight: 670,
                my: 2,
              }}
            >
              <Box sx={{ p: 3, borderBottom: "1px solid #2F2B3D1F" }}>
                <DescriptiveText
                  text="Bike Details"
                  fontSize={18}
                  fontWeight={500}
                  color={custom.breadcrumbText}
                />
              </Box>
              <Box sx={{ border: "1px solid #2F2B3D1F", pb: 2 }}>
                <TableFilters
                  textFieldWidth={200}
                  bottomBorder={false}
                  filters={DashboardFilters}
                />
              </Box>
              <Box component="div" sx={{ px: 2 }}>
                <TableExportRow
                  btnText="Add Inventory"
                  isBtnAdd={true}
                  handleOpenModal={handleAddInventory}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CustomTable
                  columns={columns}
                  data={DashboardDetailTable}
                  headTextTransform="uppercase"
                />
                <TablePagination />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
