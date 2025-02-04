"use client";
import React from "react";
import { MoreVert, LocationOn, Mail, Phone } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ActionMenu from "@/components/shared-components/ActionMenu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompanyById,
  getEditDetails,
} from "@/redux/reducers/companies/companyThunk";
import { UserData } from "@/configs/UseApi";
import swal from "sweetalert";
import { generateRandomGradient } from "@/utils/reusable-functions/generateRandomGradient";

const actionMenu = [
  { label: "Edit Details", action: "edit" },
  { label: "View Details", action: "view" },
  { label: "Delete Details", action: "delete" },
];

// console.log("generateRandomGradient", generateRandomGradient());

function Listings({ setOpenCompanyModal, cardData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.companySlice);

  const handleMenuItem = (rowData, item) => {
    if (item.action === "view")
      router.push(`/admin/companies/users?id=${rowData?.id}`);
    if (item.action === "edit") {
      dispatch(getEditDetails(rowData));
      setOpenCompanyModal(true);
    }
    if (item.action === "delete") {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then((willDelete) => {
        if (willDelete) {
          const params = {
            id: rowData?.id,
            deletedBy: UserData?.Id,
            status: 3,
          };

          dispatch(deleteCompanyById(params));
          swal("Deleted!", "Your item has been deleted.", "success");
        } else {
          swal("Your item is safe!");
        }
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
          width: "100%",
        }}
      >
        {cardData?.map((element, idx) => (
          <Grid
            key={idx}
            sx={{
              width: "100%",
            }}
          >
            <Card
              sx={{
                borderRadius: "25px",
                // bgcolor: "#52AE7E",
                background: generateRandomGradient(), // Use the gradient function here
                "&:hover": { cursor: "pointer" },
                height: "100%",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                width: "100%",
              }}
            >
              <CardContent sx={{ p: 1 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Avatar
                    // src={element.icon}
                    src={element?.image ? element?.image : "/icon2.png"}
                    sx={{
                      width: 65,
                      height: 65,
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  <ActionMenu
                    menuItems={actionMenu}
                    onMenuItemClick={(item) => handleMenuItem(element, item)}
                    color="#ffff"
                  />
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                  gap={2}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: 22,
                    }}
                  >
                    {element.companyName}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "41px",
                      px: 2,
                      py: 0.75,
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      Industry: {element.industry?.industryName}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <Divider sx={{ borderColor: "rgba(242, 242, 242, 0.2)" }} />

              <CardContent sx={{ p: 1 }}>
                {[
                  {
                    icon: <LocationOn />,
                    label: "Country",
                    value: element.country?.countryName,
                  },
                  {
                    icon: <Mail />,
                    label: "Email",
                    value: element.companyContact?.email,
                  },
                  {
                    icon: <Phone />,
                    label: "Phone Number",
                    value: element.companyContact?.contactNumber,
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                    sx={{
                      color: "#F2F2F2",
                      "& .MuiTypography-root": {
                        fontSize: "1rem",
                        fontWeight: 400,
                        letterSpacing: "0.2px",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "1.3rem",
                        opacity: 0.9,
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1.5}>
                      {item.icon}
                      <Typography>{item.label}</Typography>
                    </Box>
                    <Typography sx={{ opacity: 0.9 }}>{item.value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Listings;
