import {
  InfoCard,
  InfoItem,
} from "@/components/shared-components/CustomInfoCard";
import {
  CalendarIcon,
  HashIcon,
  FIleIcon,
  PassportBookIcon,
} from "@/utils/Icons";
import FormattedDate from "@/utils/reusable-functions/FormattedDate ";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { getImageNameUrl } from "@/utils/reusable-functions/getImageNameUrl";
import { Box, IconButton, Typography } from "@mui/material";

export function DrivingLicenseView({ profile, onEdit, isUaeResident }) {
  return (
    <InfoCard title="DRIVING LICENSE" onEdit={onEdit}>
      <InfoItem
        label="License Number"
        value={profile?.drivingLicenseNo}
        icon={<HashIcon />}
      />
      <InfoItem
        label="Issue Date"
        value={<FormattedDate isoDate={profile?.licenseIssueDate} />}
        icon={<CalendarIcon />}
      />
      <InfoItem
        label="Expiry Date"
        value={<FormattedDate isoDate={profile?.licenseExpiryDate} />}
        icon={<CalendarIcon />}
      />
      {isUaeResident && (
        <>
          <InfoItem
            label="License Image Front"
            value={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FIleIcon />
                <Typography
                  sx={{ fontSize: 16, fontWeight: 400, color: "#2F2B3D99" }}
                >
                  {getImageNameUrl(profile?.licenseImageFront)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    window.open(profile?.licenseImageFront, "_blank")
                  }
                >
                  <RemoveRedEyeOutlinedIcon
                    sx={{ fontSize: 20, color: "#BDBDBD" }}
                  />
                </IconButton>
              </Box>
            }
            icon={<PassportBookIcon />}
          />
          <InfoItem
            label="License Image Back"
            value={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FIleIcon />
                <Typography
                  sx={{ fontSize: 16, fontWeight: 400, color: "#2F2B3D99" }}
                >
                  {getImageNameUrl(profile?.licenseImageBack)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    window.open(profile?.licenseImageBack, "_blank")
                  }
                >
                  <RemoveRedEyeOutlinedIcon
                    sx={{ fontSize: 20, color: "#BDBDBD" }}
                  />
                </IconButton>
              </Box>
            }
            icon={<PassportBookIcon />}
          />
        </>
      )}
    </InfoCard>
  );
}
