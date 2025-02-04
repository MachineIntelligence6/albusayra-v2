"use client";
import { useState } from "react";
import GenericModal from "@/components/applicants/GenericModel";
import { StatusIndicator } from "@/components/applicants/StatusIndicator";
import AssetClearanceForm from "@/components/company-flow/asset-clearance/AssetClearanceForm";
import CustomizedAccordions from "@/components/company-flow/asset-clearance/CustomAccordion";
import EmptyScreenView from "@/components/shared-components/EmptyScreenView";
import { accordianTableData } from "@/utils/company-flow/asset-clarance-data";
import { DownloadIcon, FIleIcon } from "@/utils/Icons";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function AssetClearanceFormPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddSim, setIsAddSim] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => setIsModalOpen(false);

  const handleClick = () => {
    router.push("/asset-clearance/sim-clearance-form");
  };

  const items = [
    {
      title: "Bike Information",
    },
    {
      title: "Sim Information",
    },
  ];

  const column = [
    {
      field: "bikePlateNo",
      headerName: "Bike Plate No",
      align: "left",
      render: (row) => (
        <Typography variant="body2">{row.bikePlateNo}</Typography>
      ),
    },
    {
      field: "bikeCity",
      headerName: "Bike City",
      align: "left",
      render: (row) => <Typography>{row.bikeCity}</Typography>,
    },
    {
      field: "bikeOwnership",
      headerName: "Bike Ownership",
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
      field: "bikeIssueDate",
      headerName: "Date of Bike Issue",
      align: "left",
      render: (row) => <Typography>{row.bikeIssueDate}</Typography>,
    },
    {
      field: "bikeIssueTime",
      headerName: "Time of Bike Issue",
      align: "left",
      render: (row) => <Typography>{row.bikeIssueTime}</Typography>,
    },
    {
      field: "foodPermit",
      headerName: "Food Permit Provided To Rider",
      align: "left",
      render: (row) => <Typography>{row.foodPermit}</Typography>,
    },
    {
      field: "mulkiyaProvided",
      headerName: "Mulkiya Provided To Rider",
      align: "left",
      render: (row) => <Typography>{row.mulkiyaProvided}</Typography>,
    },
    {
      field: "allocationPicture",
      headerName: "Picture Of Physical Allocation To Rider",
      align: "left",
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={row.allocationIcon}
            alt="Allocation"
            style={{ height: 20 }}
          />
          <Typography sx={{ ml: 1 }}>{row.allocationText}</Typography>
        </Box>
      ),
      render: (row) => (
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <FIleIcon />
          <Typography variant="caption">
            {row?.pictureOfAllocation.text || "Challan"}
          </Typography>
          <DownloadIcon size={20} />
        </Box>
      ),
    },
    {
      field: "clearanceDate",
      headerName: "Clearance Date",
      align: "left",
      render: (row) => <Typography>{row.clearanceDate || "--"}</Typography>,
    },
    {
      field: "vendor",
      headerName: "Rider Acquiring Vendor",
      align: "left",
      render: (row) => (
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Image
            src="/company/asset-clearence/man.svg"
            width={20}
            height={20}
            alt=""
          />
          <Typography>{row.riderAcquiringVendor.name}</Typography>
        </Box>
      ),
    },
    {
      field: "companyName",
      headerName: "Rider Acquiring Company",
      align: "left",
      render: (row) => (
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Image
            src="/company/asset-clearence/man.svg"
            width={20}
            height={20}
            alt=""
          />
          <Typography>{row.riderAcquiringCompany.name}</Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      align: "left",
      render: (row) => (
        <StatusIndicator status={row.status} pathname={pathname} />
      ),
    },
  ];

  return (
    <>
      <GenericModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Applicants Modal"
      >
        <Box component="div" paddingY="60px" backgroundColor="#fff">
          <EmptyScreenView
            image="/company/Bike2.svg"
            altText="Asset Clearance"
            title="Bike Clearance Successful"
            description="The asset has been placed for clearance"
            buttonText="Add Sim"
            onButtonClick={handleClick}
          // onButtonClick={handleOpenModal}
          />
        </Box>
      </GenericModal>
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: "100%" }}>
        <AssetClearanceForm handleOpenModal={handleOpenModal} />
        <CustomizedAccordions
          column={column}
          data={accordianTableData}
          items={items}
          title="Asset History"
        />
      </Box>
    </>
  );
}
