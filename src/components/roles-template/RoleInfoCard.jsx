
import React from "react";
import { Box } from "@mui/material";
import { InfoCard, InfoItem } from "@/components/shared-components/CustomInfoCard";

const RoleInfoCard = ({ title, data, onEdit }) => {
  // Split data into two groups to display in two columns
  const half = Math.ceil(data.length / 2);
  const firstColumnData = data.slice(0, half);
  const secondColumnData = data.slice(half);

  // Custom styles for "Administrator" and "Status"
  const customStyles = {
    administratorStyle: {
      backgroundColor: '#28C76F29',
      color: '#28C76F',
      padding: "6px 10px",
      borderRadius: "4px",
    },
    statusStyle: {
      backgroundColor: '#28C76F29',
      color: '#28C76F',
      padding: "6px 10px",
      borderRadius: "4px",
      //   marginBotton:"30px"
    },
  };

  return (
    <InfoCard title={title} onEdit={onEdit}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ width: "48%" }}>
          {firstColumnData.map((item, index) => (
            <InfoItem
              key={index}
              icon={item.icon}
              label={
                <>
                  {item.label}
                </>
              }
              value={
                item.label === "Role" ? (
                  <span style={customStyles.administratorStyle}>{item.value}</span>
                ) : (
                  item.value
                )
              }
              sx={item.valueStyle || {}}
            />
          ))}
        </Box>
        <Box sx={{ width: "48%" }}>
          {secondColumnData.map((item, index) => (
            <InfoItem
              key={index}
              icon={item.icon}
              label={
                <>
                  {item.label}
                </>
              }
              value={
                item.label === "Status" ? (
                  <span style={customStyles.statusStyle}>{item.value}</span>
                ) : (
                  item.value
                )
              }
              sx={item.valueStyle || {}}
            />
          ))}
        </Box>
      </Box>
    </InfoCard>
  );
};

export default RoleInfoCard;
