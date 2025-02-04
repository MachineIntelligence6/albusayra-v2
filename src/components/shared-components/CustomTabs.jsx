import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { custom } from "@/app/theme";

const CustomTabs = ({ tabs, activeTab, handleTabChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="custom tabs" 
       TabIndicatorProps={{
          style: { backgroundColor: custom.deepBlue, height: 5,}, // Active tab bottom line
        }}
        sx={{
          "& .mui-1wxkzlj-MuiTabs-flexContainer": {
            justifyContent:"space-between",
          }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab}   
          sx={{
              color: activeTab === index ? custom.deepBlue : "#2F2B3D99", // Active and inactive tab colors
              fontWeight:  "500",
              textTransform: "capitalize",
              fontSize: "1rem",
              lineHeight:"22px",
              "&.Mui-selected": {
                color: custom.deepBlue, // Active tab color
              },
            }}/>
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;
