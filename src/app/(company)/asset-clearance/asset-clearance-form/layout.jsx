"use client"
import { custom } from "@/app/theme";
import CompanyHeader from "@/components/shared-components/CompanyHeader";
import DescriptiveText from "@/components/shared-components/DescriptiveText";
import SideCard from "@/components/shared-components/SideCard";
import { AssetClearanceData } from "@/utils/company-flow/asset-clarance-data";
import { Box } from "@mui/material";

export default function AssetClearanceLayout({ children }) {
  return (
    <Box mx={2} mb={2}>
      <CompanyHeader>
        <DescriptiveText
          text={"Asset Clearance /"}
          fontSize={18}
          fontWeight={500}
          color={custom.muted}
        />
        <DescriptiveText
          text={"Asset Clearance Form"}
          fontSize={18}
          fontWeight={500}
          color={custom.primaryText}
        />
      </CompanyHeader>
      <Box display="flex" gap={2} mt={2}>
        <SideCard
          avatarSrc="/company/asset-clearence/man.svg"
          name="Saleem Akhtar Muhammad Miskeen"
          email="saleemakhtar@gmail.com"
          contractData={AssetClearanceData}
        />
        {/*  Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // bgcolor: "background.default",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
