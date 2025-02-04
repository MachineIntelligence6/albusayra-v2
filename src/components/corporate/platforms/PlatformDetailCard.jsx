"use client";

import { ViewCard, ViewItem } from "@/components/shared-components/ViewCard";
import { Box, Divider } from "@mui/material";
import { platformDetail } from "@/utils/vendor-detail";
import {
  GlobeIcon,
  HomeIcon,
  MailIcon,
  MapIcon,
  PhoneIcon,
  ShieldIcon1,
  StarIcon,
  UserIcon,
} from "@/utils/Icons";

export default function PlatformDetailCard({ modalData }) {
  // const midIndex = Math.ceil(platformDetail.length / 2);
  // const firstPart = platformDetail.slice(0, midIndex);
  // const secondPart = platformDetail.slice(midIndex);

  const platformDetailFirstPart = [
    {
      label: "Platform ID",
      value: modalData?.platformId,
      icon: <UserIcon />,
    },
    {
      label: "Platform Type",
      value: modalData?.platformType,
      icon: <StarIcon />,
    },
    {
      label: "Country",
      value: modalData?.country?.countryName,
      icon: <GlobeIcon />,
    },
    {
      label: "Address",
      value: modalData?.address,
      icon: <HomeIcon />,
    },
    {
      label: "POC Phone Number",
      value: modalData?.pocContactNumber,
      icon: <PhoneIcon />,
    },
  ];
  const platformDetailSeconsPart = [
    {
      label: "Platform Name",
      value: modalData?.platformName,
      icon: <UserIcon />,
    },
    {
      label: "Email Address",
      value: modalData?.email,
      icon: <MailIcon />,
    },

    {
      label: "City",
      value: modalData?.city?.cityName,
      icon: <MapIcon />,
    },
    {
      label: "POC Name",
      value: modalData?.pocName,
      icon: <UserIcon />,
    },
    {
      label: "Status",
      value: modalData?.status === 1 ? "Active" : "Non active",
      icon: <ShieldIcon1 />,
    },
  ];
  return (
    <ViewCard borderTop={false} onEdit={false}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {/* First column */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {platformDetailFirstPart?.map(({ label, value, icon }, index) => (
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
                        {icon}{" "}
                      </Box>
                    )}
                    <span>{label}</span>
                  </Box>
                }
                value={<Box>{value}</Box>}
              />
              {index < platformDetailFirstPart?.length - 1 && (
                <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Second column */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {platformDetailSeconsPart?.map(({ label, value, icon }, index) => (
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
                        {icon}{" "}
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
                        fontSize: "13px",
                      }),
                    }}
                  >
                    {value}
                  </Box>
                }
              />
              {index < platformDetailSeconsPart?.length - 1 && (
                <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </ViewCard>
  );
}
