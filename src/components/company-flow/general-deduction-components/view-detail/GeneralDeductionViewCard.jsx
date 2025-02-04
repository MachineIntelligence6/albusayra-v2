"use client";

import { ViewCard, ViewItem } from "@/components/shared-components/ViewCard";
import { Box, Divider, } from "@mui/material";
import { vendorDetail } from "@/utils/vendor-detail";

export default function GeneralDeductionViewCard() {
  // Find the index of the object with the "Status" label
  const statusIndex = vendorDetail.findIndex((item) => item.label === "Status");

  // Split the data into two parts based on the "Status" field
  const firstPart = vendorDetail.slice(0, statusIndex + 1); // Includes "Status"
  const secondPart = vendorDetail.slice(statusIndex + 1); // Excludes "Status"

  return (
    <ViewCard borderTop={false} onEdit={false}>
      {/* Display Vendor ID as title */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {/* First column: Contains fields before and including 'Status' */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {firstPart.map(({ label, value, icon }, index) => (
            <Box key={label}>
              <ViewItem
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* Render icon if it exists */}
                    {icon && (
                      <Box
                        sx={{
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        {icon} {/* Render the icon directly if it's a valid JSX component */}
                      </Box>
                    )}
                    <span>{label}</span>
                  </Box>
                }
                value={
                  <Box
                    sx={{
                      ...(label === "Status" && {
                        backgroundColor: "#28C76F29",
                        color: "#28C76F",
                        padding: "2px 10px",
                        borderRadius: "4px",
                        fontWeight: 500,
                        fontSize: '13px',
                      }),
                    }}
                  >
                    {value}
                  </Box>
                }
              />
              {index < firstPart.length - 1 && (
                <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Second column: Contains fields after 'Status' */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {secondPart.map(({ label, value, icon }, index) => (
            <Box key={label}>
              <ViewItem
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* Render icon if it exists */}
                    {icon && (
                      <Box
                        sx={{
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        {icon} {/* Render the icon directly if it's a valid JSX component */}
                      </Box>
                    )}
                    <span>{label}</span>
                  </Box>
                }
                value={<Box>{value}</Box>}
              />
              {index < secondPart.length - 1 && (
                <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </ViewCard>
  );
}
