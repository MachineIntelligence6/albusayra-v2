import { Chip, Box, IconButton, Typography } from "@mui/material";
import {
  InfoCard,
  InfoItem,
} from "@/components/shared-components/CustomInfoCard";
import {
  CalendarIcon,
  HashIcon,
  PassportBookIcon,
  FIleIcon,
} from "@/utils/Icons";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FormattedDate from "@/utils/reusable-functions/FormattedDate ";
import { getImageNameUrl } from "@/utils/reusable-functions/getImageNameUrl";

export function PassportDetailsView({ profile, onEdit, isUaeResident }) {
  return (
    <InfoCard title="PASSPORT DETAILS" onEdit={onEdit}>
      <InfoItem
        label="Passport Number"
        value={profile?.passportNo}
        icon={<HashIcon />}
      />
      <InfoItem
        label="Issue Date"
        value=<FormattedDate isoDate={profile?.passportIssueDate} />
        icon={<CalendarIcon />}
      />
      <InfoItem
        label="Expiry Date"
        value=<FormattedDate isoDate={profile?.passportExpiryDate} />
        icon={<CalendarIcon />}
      />
      <InfoItem
        label="Passport Copy"
        value={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FIleIcon />
            <Typography
              sx={{ fontSize: 16, fontWeight: 400, color: "#2F2B3D99" }}
            >
              {getImageNameUrl(profile?.passportImage)}
            </Typography>
            <IconButton
              size="small"
              onClick={() => window.open(profile?.passportImage, "_blank")}
            >
              <RemoveRedEyeOutlinedIcon
                sx={{ fontSize: 20, color: "#BDBDBD" }}
              />
            </IconButton>
          </Box>
        }
        icon={<PassportBookIcon />}
      />

      {isUaeResident ? (
        <InfoItem
          label="Visa Validity"
          value={
            <Chip
              label={profile?.isValidWorkVisa === true ? "Active" : "Inactive"}
              size="small"
              sx={{
                borderRadius: 1,
                bgcolor:
                  profile?.isValidWorkVisa === true ? "#28C76F29" : "red",
                color: profile?.isValidWorkVisa === true ? "#28C76F" : "white",
                fontSize: 13,
              }}
            />
          }
          icon={<PassportBookIcon />}
        />
      ) : (
        <InfoItem
          label="Visa Applied"
          value={
            <Chip
              label={
                profile?.isVisaApplied === true ? "Applied" : "Not Applied"
              }
              size="small"
              sx={{
                borderRadius: 1,
                bgcolor: profile?.isVisaApplied === true ? "#28C76F29" : "red",
                color: profile?.isVisaApplied === true ? "#28C76F" : "white",
                fontSize: 13,
              }}
            />
          }
          icon={<PassportBookIcon />}
        />
      )}
    </InfoCard>
  );
}
