"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextareaAutosize,
  Divider,
  Avatar,
} from "@mui/material";
import { useFormik } from "formik";

import { Check, CircleX } from "lucide-react";
import CaptionText from "@/components/shared-components/CaptionText";
import CustomDateField from "@/components/shared-components/CustomDateField";
import CustomButton from "@/components/shared-components/CustomButton";
import { YuppValSchema } from "@/components/shared-components/Schemas/YuppValSchema";
import CustomDropdown from "@/components/shared-components/CustomDropDown";
import CustomTextField from "@/components/shared-components/CustomTextField";
import CurrencyType from "@/components/shared-components/CurrencyType";

const SpecialAllownceRequestForm = ({ open, onClose }) => {
  const [isActive, setIsActive] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "80%",
    maxWidth: "fit-content",
    boxShadow: 24,
    borderRadius: 2,
    overflow: "auto",
  };

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      employeeName: "",
      reasonOfAllowance: "",
      amount: "",
      date: "",
      comments: "",
    },
    validationSchema: YuppValSchema(),
    onSubmit: (values) => {
      console.log("Form data", values);
      onClose();
    },
  });

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(17, 17, 17, 0.80)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        padding: 4,
      }}
    >
      <Card
        sx={{
          minWidth: "800px",
          px: 3,
          borderRadius: 2,
        }}
      >
        {/* <DialogHeading text="Special Allowance Request" />
        <CaptionText
          text=" Special Allowance Request"
          required={false}
          color={custom.muted}
        />
        <DescriptiveText text='Descriptive Text' /> */}
        <Typography
          sx={{
            fontSize: "18px",
            color: "#4B465C",
            fontWeight: 500,
            lineHeight: "28px",
            mt: 3,
          }}
        >
          Special Allowance Request
        </Typography>

        <Divider sx={{ mt: 1 }} />
        <CardContent sx={{ px: 0 }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                py: 3.5,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CaptionText text="Employee ID" />
                  <Box sx={{ width: "60%" }}>
                    <CustomTextField
                      name="employeeId"
                      value={formik.values.employeeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="AB00001"
                    />
                  </Box>
                </Box>
                <Box sx={{ alignSelf: "end", mt: 1 }}>
                  {formik.touched.employeeId && formik.errors.employeeId && (
                    <Typography color="error" variant="body2">
                      {formik.errors.employeeId}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CaptionText text="Employee Name" />
                  <Box sx={{ width: "60%" }}>
                    <CustomTextField
                      placeholder="Saleem Akhtar Muhammad Miskeen"
                      endAdornment={
                        <Box
                          sx={{
                            bgcolor: "#1047741A",
                            borderRadius: "6px",
                            p: "0px 2px",
                          }}
                        >
                          <Button
                            sx={{
                              colors: "#104774",
                              fontSize: "10px",
                              fontWeight: 600,
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      }
                      startAdornment={
                        <Avatar
                          alt="Avatar"
                          src="/company/Avatarr.png"
                          sx={{ width: 24, height: 24 }}
                        />
                      }
                      height={38}
                      sx={{ bgcolor: "#FCFCFC" }}
                      name="amount"
                      value={formik.values.amount || ""}
                      onChange={(e) =>
                        formik.setFieldValue("startDate", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CaptionText text="Reason of Allowance" />
                  <Box sx={{ width: "60%" }}>
                    <CustomDropdown
                      height={38}
                      sx={{ bgcolor: "#FCFCFC" }}
                      name="reasonOfAllowance"
                      value={formik.values.reasonOfAllowance || ""}
                      onChange={(e) =>
                        formik.setFieldValue("startDate", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CaptionText text="Amount" />
                  <Box sx={{ width: "60%" }}>
                    <CustomTextField
                      placeholder="e.g 1500"
                      endAdornment={<CurrencyType />}
                      height={38}
                      sx={{ bgcolor: "#FCFCFC" }}
                      name="amount"
                      value={formik.values.amount || ""}
                      onChange={(e) =>
                        formik.setFieldValue("startDate", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CaptionText text="Allowance Date" />
                  <Box sx={{ width: "60%" }}>
                    <CustomDateField
                      placeholder="Date"
                      height={38}
                      sx={{ bgcolor: "#FCFCFC" }}
                      name="date"
                      value={formik.values.date || ""}
                      onChange={(e) =>
                        formik.setFieldValue("Date", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CaptionText text="Comments/Remarks" />

                  <TextareaAutosize
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Type your remarks here ..."
                    minRows={1}
                    maxRows={1}
                    sx={{}}
                    style={{
                      width: "60%",
                      height: "90px",
                      padding: "10px",
                      fontSize: "13px",
                      color: "#2F2B3DE5",
                      border: "1px solid #2F2B3D40",
                      borderRadius: "6px",
                      outline: "none",
                      resize: "none",
                      backgroundColor: "#FCFCFC",
                    }}
                  />
                </Box>
                <Box sx={{ alignSelf: "end", mt: 1 }}>
                  {formik.touched.description && formik.errors.description && (
                    <Typography color="error" variant="body2">
                      {formik.errors.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <CustomButton
                variant="outlined"
                bgColor="danger"
                onClick={onClose}
                sx={{ px: 3, py: 0.4 }}
                startIcon={<CircleX size={15} />}
              >
                Cancel
              </CustomButton>

              <CustomButton
                variant="contained"
                color="primary"
                onClick={formik.handleSubmit}
                endIcon={<Check size={15} />}
                sx={{ px: 3, py: 0.5 }}
              >
                Save
              </CustomButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SpecialAllownceRequestForm;
