"use client";
import { Avatar, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import Link from "next/link";
import AddEmployeeForm from "./AddEmployeeForm";
import SuccessModal from "./SuccessModal";
import { employeeData } from "../data";
import { addEmployeeFormTabs } from "@/utils/hard-data/inventoryFormTab";

const AddEmployee = () => {
  const [formtabs, setFormTabs] = useState(addEmployeeFormTabs);
  const [selectedTab, setSelectedTab] = useState(addEmployeeFormTabs[0]);
  const [isSuccess, setIsSuccess] = useState(false);
  // const handleProductChange = (event) => {
  //     setSelectedProduct(event.target.value);
  // };

  const handleActiveFormTab = (activeTab) => {
    if (typeof activeTab === "object") {
      setSelectedTab(activeTab);
      setFormTabs((prev) => {
        return prev.map((item) => {
          if (item.id === activeTab.id) {
            return { ...item, isActive: true };
          } else {
            return { ...item, isActive: false };
          }
        });
      });
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <Box>
      <Box component="div" sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <Box
              sx={{ width: "100%", bgcolor: "#104774", borderRadius: 6, pb: 2 }}
            >
              <Box sx={{ color: "white", px: 2, py: 3 }}>
                <Avatar
                  src="/images/profile-f-f.png"
                  sx={{ width: 70, height: 70, mb: 1 }}
                />
                <Box>
                  <Typography variant="body1">
                    Saleem Akhtar Muhammad Miskeen
                  </Typography>
                  <Typography variant="subtitle1">
                    saleemakhtar@gmail.com
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                {employeeData?.map((item) => (
                  <Box
                    key={item.key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      borderTop: "1px solid #B4BFC7",
                    }}
                  >
                    <Typography
                      sx={{ color: "#B4BFC7", fontWeight: 500, fontSize: 13 }}
                    >
                      {item.key}
                    </Typography>
                    <Typography
                      sx={{ color: "#fff", fontWeight: 500, fontSize: 13 }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 4,
                  alignItems: "center",
                  borderTop: "1px solid #B4BFC7",
                  textDecoration: "underline",
                  textDecorationColor: "white",
                }}
              >
                <Link href={"#"}>
                  {" "}
                  <Typography variant="h6" sx={{ color: "white" }}>
                    View All Details
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid size={9}>
            <Box
              sx={{
                width: "100%",
                pb: 2,
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                borderRadius: 6,
                px: 2,
                bgcolor: "white",
              }}
            >
              <AddEmployeeForm
                formtabs={formtabs}
                selectedTab={selectedTab}
                onClickTab={handleActiveFormTab}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isSuccess && (
        <SuccessModal open={isSuccess} onClose={() => setIsSuccess(false)} />
      )}
    </Box>
  );
};

export default AddEmployee;
