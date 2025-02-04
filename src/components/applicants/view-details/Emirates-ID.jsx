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
  CheckIcon,
  IdIcon,
} from "@/utils/Icons";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FormattedDate from "@/utils/reusable-functions/FormattedDate ";
import { getImageNameUrl } from "@/utils/reusable-functions/getImageNameUrl";

export function EmiratesIDView({ profile, onEdit }) {
  return (
    <InfoCard title="EMIRATED ID" onEdit={onEdit}>
      <InfoItem
        label="Nationality"
        value={profile?.nationality}
        icon={<CheckIcon />}
      />
      <InfoItem
        label="Emirates ID"
        value={profile?.emiratesId}
        icon={<IdIcon />}
      />
      <InfoItem
        label="Emirates ID Front"
        value={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FIleIcon />
            <Typography
              sx={{ fontSize: 16, fontWeight: 400, color: "#2F2B3D99" }}
            >
              {getImageNameUrl(profile?.emiratesIdImageFront)}
            </Typography>
            <IconButton
              size="small"
              onClick={() =>
                window.open(profile?.emiratesIdImageFront, "_blank")
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
        label="Emirates ID Back"
        value={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FIleIcon />
            <Typography
              sx={{ fontSize: 16, fontWeight: 400, color: "#2F2B3D99" }}
            >
              {getImageNameUrl(profile?.emiratesIdImageBack)}
            </Typography>
            <IconButton
              size="small"
              onClick={() =>
                window.open(profile?.emiratesIdImageBack, "_blank")
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
        label="Emirates ID Issue Date"
        value={<FormattedDate isoDate={profile?.emiratesIdIssueDate} />}
        icon={<CalendarIcon />}
      />
      <InfoItem
        label="Emirates ID Expiry Date"
        value={<FormattedDate isoDate={profile?.emiratesIdExpiryDate} />}
        icon={<CalendarIcon />}
      />
      <InfoItem
        label="Residency/Iqama Scanned"
        value={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FIleIcon />
            <Typography
              sx={{ fontSize: 16, fontWeight: 400, color: "#2F2B3D99" }}
            >
              {getImageNameUrl(profile?.iqamaDocImage)}
            </Typography>
            <IconButton
              size="small"
              onClick={() => window.open(profile?.iqamaDocImage, "_blank")}
            >
              <RemoveRedEyeOutlinedIcon
                sx={{ fontSize: 20, color: "#BDBDBD" }}
              />
            </IconButton>
          </Box>
        }
        icon={<PassportBookIcon />}
      />
    </InfoCard>
  );
}
