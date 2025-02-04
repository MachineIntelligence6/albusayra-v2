"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControlLabel,
  Modal,
  useTheme,
  useMediaQuery,
  TextareaAutosize,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import { YuppValSchema } from "./Schemas/YuppValSchema";
import IOSSwitch from "../ui/switch-button";
import CustomButton from "./CustomButton";
import CustomDateField from "./CustomDateField";
import DescriptiveText from "./DescriptiveText";
import CaptionText from "./CaptionText";
import DialogHeading from "./DialogHeading";
import { custom } from "@/app/theme";
import { Check, CircleX } from "lucide-react";
import CustomTextField from "./CustomTextField";
import { demoAsyncOperation } from "@/utils/cmmon";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaignByStatus,
  updateCampaign,
} from "@/redux/reducers/campaign/campaignThunk";
import { UserData } from "@/configs/UseApi";
import {
  submitSuccessMethod,
  updateSuccess,
} from "@/redux/reducers/campaign/campaignSlice";
import Loader from "@/utils/reusable-functions/Loader";

const CampaignCreateModal = ({ open, setShowModal }) => {
  const dispatch = useDispatch();
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

  const [isActive, setIsActive] = useState(true);
  const { submitSuccess, updatedSuccess, loading, editDetails } = useSelector(
    (state) => state.campaignSlice
  );

  // const formatDateTimeOffset = (value) => {
  //   if (!value) return "";

  //   const date = new Date(value);
  //   const offset = -date.getTimezoneOffset();
  //   const sign = offset >= 0 ? "+" : "-";
  //   const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  //   const minutes = String(Math.abs(offset) % 60).padStart(2, "0");

  //   return `${date.toISOString().split(".")[0]}${sign}${hours}:${minutes}`;
  // };

  const formatDateTimeOffset = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const offset = date.getTimezoneOffset();
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const minutes = String(absOffset % 60).padStart(2, "0");

    // Convert date to YYYY-MM-DDTHH:mm:ss±HH:MM (ISO 8601 with offset)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}${sign}${hours}:${minutes}`;
  };

  const formik = useFormik({
    initialValues: {
      campaignName: "",
      startDate: null,
      endDate: null,
      description: "",
    },
    validationSchema: YuppValSchema(),
    onSubmit: (values) => {
      const params = {
        campaignName: values?.campaignName,

        startDateTime: formatDateTimeOffset(values?.startDate),
        endDateTime: formatDateTimeOffset(values?.endDate),

        description: values?.description,
        entityId: UserData?.EntityId,
        createdBy: UserData?.Id,
        status: isActive ? 1 : 2,
      };

      if (editDetails !== null) {
        dispatch(
          updateCampaign({
            ...params,
            id: editDetails?.id,
            updatedBy: UserData?.Id,
          })
        ).then(() => {
          handleCloseModal();
        });
      } else {
        dispatch(createCampaign(params)).then(() => {
          handleCloseModal();
        });
      }
    },
  });

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(updateSuccess());
  };

  const formatToDateTimeLocal = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const localISOTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16); // YYYY-MM-DDTHH:MM

    return localISOTime;
  };

  // Update formik values when `editDetails` changes
  useEffect(() => {
    if (editDetails) {
      console.log("editDetails", editDetails);

      formik.setValues({
        campaignName: editDetails?.campaignName || "",

        startDate: formatToDateTimeLocal(editDetails?.startDateTime),
        endDate: formatToDateTimeLocal(editDetails?.endDateTime),

        description: editDetails?.description || "",
      });
      setIsActive(editDetails?.status === 1 ? true : false);
    }
  }, [editDetails]);

  return (
    <Modal open={open}>
      <Box component="div" sx={{ ...modalStyle }}>
        <Card
          sx={{
            minWidth: "800px",
            py: 3,
            px: 3,
            borderRadius: 2,
          }}
        >
          <DialogHeading text="Create Campaign" />
          <CaptionText
            text=" Fill out the following form to add a new campaign."
            required={false}
            color={custom.muted}
          />

          <CardContent sx={{ py: 6, px: 0 }}>
            <Box
              component="form"
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
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CaptionText text="Campaign Name" />
                    <Box sx={{ width: "60%" }}>
                      <CustomTextField
                        name="campaignName"
                        value={formik.values.campaignName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="e.g winter"
                        bgColor="#FCFCFC"
                      />
                    </Box>
                  </Box>
                  <Box sx={{ alignSelf: "end", mt: 1 }}>
                    {formik.touched.campaignName &&
                      formik.errors.campaignName && (
                        <Typography color="error" variant="body2">
                          {formik.errors.campaignName}
                        </Typography>
                      )}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CaptionText text="Start Datetime" />
                    <Box sx={{ width: "60%" }}>
                      <CustomDateField
                        height={38}
                        sx={{ bgcolor: "#FCFCFC" }}
                        name="startDate"
                        value={formik.values.startDate || ""}
                        onChange={(e) =>
                          formik.setFieldValue("startDate", e?.target?.value)
                        }
                        onBlur={formik.handleBlur}
                        isDateTime={true}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ alignSelf: "end", mt: 1 }}>
                    {formik.touched.startDate && formik.errors.startDate && (
                      <Typography color="error" variant="body2">
                        {formik.errors.startDate}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CaptionText text="End Datetime" />
                    <Box sx={{ width: "60%" }}>
                      <CustomDateField
                        placeholder="Date"
                        height={38}
                        sx={{ bgcolor: "#FCFCFC" }}
                        name="endDate"
                        value={formik.values.endDate || ""}
                        onChange={(e) =>
                          formik.setFieldValue("endDate", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        isDateTime={true}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ alignSelf: "end", mt: 1 }}>
                    {formik.touched.endDate && formik.errors.endDate && (
                      <Typography color="error" variant="body2">
                        {formik.errors.endDate}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CaptionText text="Description" />

                    <TextareaAutosize
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Type here..."
                      minRows={4}
                      maxRows={4}
                      sx={{ height: "90px" }}
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
                    {formik.touched.description &&
                      formik.errors.description && (
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DescriptiveText
                    text="Campaign Status:"
                    fontSize={16}
                    fontWeight={500}
                    color={custom.primaryText}
                  />
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ ml: 2 }}
                        // defaultChecked
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                        // onChange={(e) => setIsActive(e.target.checked)}
                      />
                    }
                  />
                  <Typography>{` ${
                    isActive ? "Active" : "Inactive"
                  }`}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <CustomButton
                    variant="outlined"
                    bgColor="danger"
                    onClick={handleCloseModal}
                    sx={{ px: 3, py: 0.4 }}
                    startIcon={<CircleX size={15} />}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={!loading && <Check size={15} />}
                    sx={{ px: 3, py: 0.5 }}
                    disabled={loading} // Disable button during loading
                  >
                    {loading ? (
                      <>
                        Save <Loader size="small" />
                      </>
                    ) : (
                      "Save"
                    )}
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default CampaignCreateModal;
