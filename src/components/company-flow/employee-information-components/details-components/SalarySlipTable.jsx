import { custom } from "@/app/theme";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import CustomTable from "@/components/shared-components/Table-components/CustomTable";
import { salarySlipTable } from "@/utils/company-flow/employee-inforamtion-base.data";
import { Avatar, Box } from "@mui/material";
import { Download, FileText } from "lucide-react";
import React, { useMemo } from "react";

const SalarySlipTable = () => {
  const columns = useMemo(() => {
    return [
      { field: "bikeNo", headerName: "Bike Plate No", align: "left" },
      { field: "bikeCity", headerName: "Bike City", align: "left" },
      {
        field: "bikeOwnership",
        headerName: "Bike Ownership",
        align: "left",
        render: (row) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={row.bikeOwnership.image}
                sx={{ width: 35, height: 35 }}
              />
              <DescriptiveText
                text={row.bikeOwnership.name}
                fontSize={14}
                fontWeight={500}
                color={custom.primaryText}
              />
            </Box>
          );
        },
      },
      {
        field: "bikeIssueDate",
        headerName: "Date of Bike Issue",
        align: "left",
      },
      {
        field: "bikeIssueTime",
        headerName: "Time of Bike Issue",
        align: "left",
      },
      {
        field: "foodPermit",
        headerName: "Food Permit Provided To Rider",
        align: "left",
      },
      {
        field: "mulkiya",
        headerName: "Mulkiya provided to Rider",
        align: "left",
      },
      {
        field: "picture",
        headerName: "Picture of physical allocation to Rider",
        align: "left",
        render: (row) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FileText size={20} color={custom.errorButton} />
              <DescriptiveText
                text={row.picture}
                fontSize={15}
                fontWeight={400}
                color={custom.primaryText}
              />
              <Download size={20} color="#2F2B3DE5" />
            </Box>
          );
        },
      },
      { field: "clearnaceDate", headerName: "Clearance  Date", align: "left" },
      {
        field: "vendor",
        headerName: "Rider Acquiring Vendor",
        align: "left",
        render: (row) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={row.vendor.image} sx={{ width: 35, height: 35 }} />
              <DescriptiveText
                text={row.vendor.name}
                fontSize={14}
                fontWeight={500}
                color={custom.primaryText}
              />
            </Box>
          );
        },
      },
      {
        field: "company",
        headerName: "Rider Acquiring Company",
        align: "left",
        render: (row) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={row.company.image} sx={{ width: 35, height: 35 }} />
              <DescriptiveText
                text={row.company.name}
                fontSize={14}
                fontWeight={500}
                color={custom.primaryText}
              />
            </Box>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        align: "left",
        render: (row) => {
          return (
            <Box
              sx={{
                backgroundColor: "#28C76F29",
                color: "#28C76F",
                padding: "4px 12px",
                borderRadius: "4px",
                width: "fit-content",
                textAlign: "center",
              }}
            >
              {row.status}
            </Box>
          );
        },
      },
    ];
  }, []);

  return (
    <Box sx={{ px: 1 }}>
      <CustomTable
        columns={columns}
        data={salarySlipTable}
        isSelectedOption={false}
        isFiltered={true}
        headingTextColor="#2F2B3D8C"
      />
    </Box>
  );
};

export default SalarySlipTable;
