import { Box, Tabs, Tab, Typography } from "@mui/material";
import CustomButton from "./CustomButton";

export const CustomPermissionTabs = ({
  tabData,
  onClick,
  handleChange,
  selectedTab,
}) => {

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1047741A",
            borderRadius: 2,
            padding: "10px",
            width: "fit-content",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { display: "none" },
            }}
            sx={{
              "& .MuiTab-root": {
                minWidth: 150,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 14,
                borderRadius: 2,
                padding: "7.5px 19.5px",
                color: "#413E4F",
                display: "flex",
                alignItems: "center",
                gap: 2,
              },
              "& .Mui-selected": {
                backgroundColor: "#104774",
                color: "#fff",
                display: "flex",
              },
            }}
          >
            {tabData.map((tab, index) => (
              <Tab
                key={index}
                // icon={tab.icon}
                label={
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <Typography variant="body1" sx={{ color: "#fff" }}>
                      {tab.icon}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white", fontSize: "14px", fontWeight: "500", lineHeight: "22px" }}>
                      {tab.label}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
        <Box>
          <CustomButton variant="outlined" onClick={onClick} sx={{fontSize: "15px", fontWeight: "500", lineHeight:"22px"}}>
            Edit
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};
