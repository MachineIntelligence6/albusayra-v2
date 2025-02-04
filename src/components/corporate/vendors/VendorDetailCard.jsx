"use client";

import { ViewCard, ViewItem } from "@/components/shared-components/ViewCard";
import { Box, Divider, IconButton } from "@mui/material";
import { vendorDetail } from "@/utils/vendor-detail";
import { HomeIcon, PdfIcon } from "@/utils/Icons";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  GlobeIcon,
  LicenseIcon,
  MailIcon,
  MapIcon,
  PhoneIcon,
  ReceieptTaxIcon,
  SendIcon,
  ShieldIcon1,
  UserIcon,
} from "@/utils/Icons";
import { toast } from "react-hot-toast";

export default function VendorDetailCard({ modalData }) {
  // const midIndex = Math.ceil(vendorDetail.length / 2);
  // const firstPart = vendorDetail.slice(0, midIndex);
  // const secondPart = vendorDetail.slice(midIndex);

  const vendorDetailFirstPart = [
    {
      label: "Vendor ID",
      value: modalData?.vendorNo,
      icon: <UserIcon />,
    },
    {
      label: "Tax Register",
      value: modalData?.taxRegistered,
      icon: <ReceieptTaxIcon />,
    },
    {
      label: "Email Address",
      value: modalData?.email,
      icon: <MailIcon />,
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
      label: "POC Name",
      value: modalData?.pocName,
      icon: <UserIcon />,
    },
    {
      label: "Status",
      value: modalData.status === 1 ? "Active" : "Non active",
      icon: <ShieldIcon1 />,
    },
  ];

  const vendorDetailSeconsPart = [
    {
      label: "Vendor Name",
      value: modalData?.vendorName,
      icon: <UserIcon />,
    },
    {
      label: "Vendor Type",
      value: modalData?.vendorType,
      icon: <SendIcon />,
    },
    {
      label: "Phone Number",
      value: modalData?.contactNumber,
      icon: <PhoneIcon />,
    },
    {
      label: "City",
      value: modalData?.city?.cityName,
      icon: <MapIcon />,
    },
    {
      label: "TRN",
      value: modalData?.trnNo,
      icon: <ReceieptTaxIcon />,
    },
    {
      label: "POC Phone Number",
      value: modalData?.pocContactNumber,
      icon: <PhoneIcon />,
    },
    {
      label: "Vendor Agreement",
      value: modalData?.vendorAgreement,
      icon: <LicenseIcon />,
    },
  ];
  return (
    <ViewCard borderTop={false} onEdit={false}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {/* First column */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {vendorDetailFirstPart?.map(({ label, value, icon }, index) => (
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
              {index < vendorDetailFirstPart?.length - 1 && (
                <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Second column */}
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          {vendorDetailSeconsPart?.map(({ label, value, icon }, index) => (
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
                  <Box>
                    {label === "Vendor Agreement" && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <PdfIcon />
                        <span>
                          {value?.split("/").pop() || "No document available"}
                        </span>
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (value) {
                              window.open(value, "_blank");
                            } else {
                              toast.error("No vendor agreement available.");
                            }
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon
                            color="#BDBDBD"
                            sx={{ fontSize: 20 }}
                          />
                        </IconButton>
                      </Box>
                    )}
                    {label !== "Vendor Agreement" && value}
                  </Box>
                }
              />
              {index < vendorDetailSeconsPart?.length - 1 && (
                <Divider sx={{ borderStyle: "dotted", marginTop: 1 }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </ViewCard>
  );
}
