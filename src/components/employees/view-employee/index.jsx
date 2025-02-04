"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import BasicInfo from "./BasicInfo";
import ContactDetail from "./ContactDetails";
import DLInfo from "./DLInfo";
import PassportInfo from "./PassportInfo";

import EmiratesId from "./EmiratesId";
import VisaInfo from "./VisaInfo";
import InsuranceInfo from "./InsuranceInfo";
import OtherInfo from "./OtherInfo";
import ViewEmployeeHeader from "../../shared-components/ViewEmployeeHeader";
import { ViewEmployeeCardData } from "../../../utils/view-employee-card-data";

import { useRouter } from "next/navigation";

const EmployeeView = () => {
  const [profile, setProfile] = useState(ViewEmployeeCardData);
  const router = useRouter();

  const handleEdit = (section) => {
    console.log(`Editing ${section}`);
    router.push("/admin/employees/incomplete-profile/form");
  };

  return (
    <Box sx={{ p: 2 }}>
      <ViewEmployeeHeader
        fullName="Saleem Akhtar"
        profileImage={"/icons/pic.svg"}
        sx={{
          borderRadius: "15px",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <BasicInfo
            profile={profile[0]}
            onEdit={() => handleEdit("Basic Info")}
          />
        </Box>
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <ContactDetail
            profile={profile[1]}
            onEdit={() => handleEdit("Contact Info")}
          />
        </Box>
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <EmiratesId
            profile={profile[2]}
            onEdit={() => handleEdit("Emirates Id")}
          />
        </Box>
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <DLInfo
            profile={profile[3]}
            onEdit={() => handleEdit("Driving License")}
          />
        </Box>
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <PassportInfo
            profile={profile[4]}
            onEdit={() => handleEdit("Passport Details")}
          />
        </Box>
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <VisaInfo
            profile={profile[5]}
            onEdit={() => handleEdit("Visa Details")}
          />
        </Box>
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <InsuranceInfo
            profile={profile[6]}
            onEdit={() => handleEdit("Visa Details")}
          />
        </Box>
        <Box sx={{ width: "calc(50% - 8px)", height: "full" }}>
          <OtherInfo
            profile={profile[7]}
            onEdit={() => handleEdit("Visa Details")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeView;
