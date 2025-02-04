import { custom } from "@/app/theme";
import { getInitials } from "@/utils/reusable-functions/getInitials";
import { Avatar, Box, Typography } from "@mui/material";

const SidebarProfileCard = ({ UserData }) => {
  return (
    <Box component="div" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {UserData?.Image ? (
        <Avatar src={UserData?.Image} sx={{ width: "36px", height: "36px" }} />
      ) : (
        <span className="menu-avatar">{getInitials(UserData?.Fullname)}</span>
      )}
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            fontSize: 15,
            color: custom.white,
            lineHeight: 1.5,
          }}
        >
          {UserData?.Fullname}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, color: "#bdbbbb", fontSize: 10 }}
        >
          {UserData?.Email}
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarProfileCard;
