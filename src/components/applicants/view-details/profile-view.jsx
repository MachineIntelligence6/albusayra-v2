"use client";

import { Box, Card, Typography, Avatar, IconButton } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DoneIcon from "@mui/icons-material/Done";
import CustomButton from "@/components/shared-components/CustomButton";

import { GeneralInfoView } from "./General-info";
import { ContactInfoView } from "./Contact-info";
import { DrivingLicenseView } from "./Driving-license";
import { EmiratesIDView } from "./Emirates-ID";
import { PassportDetailsView } from "./Passport-details";
import { ReferralView } from "./Referral";
import { StatusDropdown } from "@/components/shared-components/CustomColoredDropdown";
import StatusAlert from "./StatusAlert";

export default function ProfileView({
  isModalRemarkOpen,
  isUaeResident,
  ViewDetails,
  status,
  setStatus,
  handleChange,
  handleEdit,
  handleOptionClick,
  handleProceed,
}) {
  return (
    <Box sx={{ pt: 2 }}>
      <Card sx={{ mb: 3 }}>
        <Box
          sx={{
            height: 120,
            background:
              "url(/icons/banner1.svg) lightgray 50% / cover no-repeat",
          }}
        />
        <Box sx={{ px: 3, pb: 2, mt: -5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "baseline" }}>
              {/* Image Box */}
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={ViewDetails?.image}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "4px solid white",
                    borderRadius: "10px",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 15,
                    right: -10,
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "white" },
                  }}
                  size="small"
                >
                  <CameraAltOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
              {/* Image Box */}

              <Typography
                sx={{ fontSize: 25, fontWeight: 500, color: "#2F2B3DE5" }}
              >
                {ViewDetails?.fullName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
              <StatusDropdown
                value={status}
                onChange={handleChange}
                disabled={false}
                error={false}
                onOptionClick={handleOptionClick}
                placeholder="status"
              />
              <CustomButton
                variant="contained"
                endIcon={<DoneIcon sx={{ width: "15px" }} />}
                sx={{ mt: 2 }}
                type="button"
                onClick={() => {
                  handleProceed();
                }}
              >
                Proceed
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Card>

      <StatusAlert
        message={
          ViewDetails?.status === 10
            ? `Reason: ${ViewDetails?.reason || ""}`
            : ViewDetails?.status === 6
            ? `Reason: ${ViewDetails?.reason || ""}`
            : ViewDetails?.status === 9
            ? `Reason: ${ViewDetails?.reason || ""}`
            : `Application is proceeded`
        }
        status="status"
        type={ViewDetails?.status}
        statusText={
          ViewDetails?.status === 10
            ? "Final Review"
            : ViewDetails?.status === 6
            ? "Hold"
            : "Incomplete"
        }
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // For extra-small and small screens
            sm: "1fr", // Optionally specify for small screens (e.g., tablets)
            md: "1fr 1fr", // For medium and larger screens
          },
          gap: 2,
        }}
      >
        <GeneralInfoView
          profile={ViewDetails}
          onEdit={() => handleEdit("General Info")}
        />
        <ContactInfoView
          profile={ViewDetails}
          isUaeResident={isUaeResident}
          onEdit={() => handleEdit("Contact Info")}
        />
        {isUaeResident ? (
          <EmiratesIDView
            profile={ViewDetails}
            onEdit={() => handleEdit("Emirates ID")}
          />
        ) : (
          ""
        )}
        <DrivingLicenseView
          profile={ViewDetails}
          isUaeResident={isUaeResident}
          onEdit={() => handleEdit("Driving License")}
        />
        <PassportDetailsView
          profile={ViewDetails}
          isUaeResident={isUaeResident}
          onEdit={() => handleEdit("Passport Details")}
        />
        <ReferralView
          profile={ViewDetails}
          onEdit={() => handleEdit("Referral")}
        />
      </Box>
    </Box>
  );
}
