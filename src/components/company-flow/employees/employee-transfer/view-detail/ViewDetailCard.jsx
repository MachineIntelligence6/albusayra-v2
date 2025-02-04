"use client";

import { ViewCard, ViewItem } from "@/components/shared-components/ViewCard";
import { Box, Divider, IconButton } from "@mui/material";
import { addEmployeeViewCardData } from "@/utils/vendor-detail";
import { DownloadIcon, PdfIcon } from "@/utils/Icons";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CustomAvatar from "@/components/shared-components/CustomAvatar";
import { JpgGroupIcon } from "@/utils/icons2";

export default function ViewDetailCard() {
  const midIndex = Math.ceil(addEmployeeViewCardData.length / 2);
  const firstPart = addEmployeeViewCardData.slice(0, midIndex);
  const secondPart = addEmployeeViewCardData.slice(midIndex);

  return (
    <ViewCard borderTop={false} onEdit={false}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {/* First column */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {firstPart.map(({ label, value, icon }, index) => (
            <Box key={label}>
              <ViewItem
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {icon && (
                      <Box
                        sx={{
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        {icon}
                      </Box>
                    )}
                    <span>{label}</span>
                  </Box>
                }
                value={
                  <Box>
                    {label === "Emirates ID Copy Back" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <PdfIcon />
                        <span>{value}</span>
                        <IconButton
                          size="small"
                          sx={{ color: "#BDBDBD", p: 0, m: 0 }}
                        >
                          <RemoveRedEyeOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : label === "4PL Name" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <CustomAvatar
                          image={"/icons/Sky.png"}
                          fullName={value}
                        />
                        <span>{value}</span>
                      </Box>
                    ) : label === "Picture" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <JpgGroupIcon />
                        <span>{value}</span>
                        <DownloadIcon />
                      </Box>
                    ) : (
                      <span>{value}</span>
                    )}
                  </Box>
                }
              />
              {index < firstPart.length - 1 && (
                <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Second column */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {secondPart.map(({ label, value, icon }, index) => (
            <Box key={label}>
              <ViewItem
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {icon && (
                      <Box
                        sx={{
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        {icon}
                      </Box>
                    )}
                    <span>{label}</span>
                  </Box>
                }
                value={
                  <Box>
                    {label === "Emirates ID Copy Front" && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <PdfIcon />
                        <span>{value}</span>
                        <IconButton
                          size="small"
                          sx={{ color: "#BDBDBD", p: 0, m: 0 }}
                        >
                          <RemoveRedEyeOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                    {label !== "Emirates ID Copy Front" && value}
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
    </ViewCard>
  );
}
