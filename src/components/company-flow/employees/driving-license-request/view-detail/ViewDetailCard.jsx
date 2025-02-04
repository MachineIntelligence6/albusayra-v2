import { ViewCard, ViewItem } from "@/components/shared-components/ViewCard";
import { Box, Divider } from "@mui/material";
import { tableViewDetail } from "@/utils/vendor-detail";
import DeductionType from "../form/DeductionType";
import { useState } from "react";

export default function ViewDetailCard() {
  const [deductionType, setDeductionType] = useState("fixed"); // Example state for deductionType
  const months = ["Month 1", "Month 2", "Month 3"]; // Example months

  // Calculate the index to split the data into two parts
  const middleIndex = Math.ceil(tableViewDetail.length / 2); // Use Math.ceil to ensure the first part gets the extra item when odd
  const firstPart = tableViewDetail.slice(0, middleIndex); // First column (includes the extra item if odd)
  const secondPart = tableViewDetail.slice(middleIndex); // Second column

  return (
    <ViewCard borderTop={false} onEdit={false}>
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {/* First column with the first part of the data */}
          <Box sx={{ flex: 1, minWidth: "300px" }}>
            {firstPart.map(({ label, value, icon, currencyIcon }, index) => (
              <Box key={label}>
                <ViewItem
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {icon && (
                        <Box sx={{ width: "25px", height: "25px" }}>{icon}</Box>
                      )}
                      <span>{label}</span>
                    </Box>
                  }
                  value={
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: 500,
                        ...(label === "Status" && {
                          backgroundColor: "#28C76F29", // Light green background
                          color: "#28C76F", // Dark green text color
                          padding: "2px 10px",
                          borderRadius: "4px",
                        }),
                      }}
                    >
                      {value}
                      {currencyIcon}
                    </Box>
                  }
                />
                {index < firstPart.length - 1 && (
                  <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
                )}
              </Box>
            ))}
          </Box>

          {/* Second column with the second part of the data */}
          <Box sx={{ flex: 1, minWidth: "300px" }}>
            {secondPart.map(({ label, value, icon, currencyIcon }, index) => (
              <Box key={label}>
                <ViewItem
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {icon && (
                        <Box sx={{ width: "25px", height: "25px" }}>{icon}</Box>
                      )}
                      <span>{label}</span>
                    </Box>
                  }
                  value={
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: 500,
                        ...(label === "Status" && {
                          backgroundColor: "#28C76F29", // Light green background
                          color: "#28C76F", // Dark green text color
                          padding: "4px 12px",
                          borderRadius: "4px",
                        }),
                      }}
                    >
                      {value}
                      {currencyIcon}
                    </Box>
                  }
                />
                {index < secondPart.length - 1 && (
                  <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* DeductionType Component */}
        <Box sx={{ width: "100%" }}>
          <DeductionType deductionType={deductionType} months={months} />
        </Box>
      </Box>
    </ViewCard>
  );
}
